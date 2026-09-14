/**
 * foma-audit.mjs — Полный аудит контента Foma Code Lab
 * Запуск: node scripts/foma-audit.mjs
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';

// ─── Константы ───────────────────────────────────────────────────────────────

const CONTENT_DIR = 'content/lessons';

const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

const BAD_NAMES = [
  '.room_card', '.roomCard', '.card-wrapper', '.card_img',
  '.navLink', '.nav_link', '.rooms_grid',
];

const VALID_HIGHLIGHTS = new Set(['html', 'css', 'js']);

const C = {
  red:    s => `\x1b[31m${s}\x1b[0m`,
  yellow: s => `\x1b[33m${s}\x1b[0m`,
  green:  s => `\x1b[32m${s}\x1b[0m`,
  cyan:   s => `\x1b[36m${s}\x1b[0m`,
  bold:   s => `\x1b[1m${s}\x1b[0m`,
  gray:   s => `\x1b[90m${s}\x1b[0m`,
};

// ─── Парсинг ─────────────────────────────────────────────────────────────────

function parseMdStep(content) {
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!fmMatch) return null;

  let meta;
  try { meta = yaml.load(fmMatch[1]); }
  catch (e) { return { yamlError: e.message }; }

  const body = fmMatch[2];
  const codeBlocks = {};
  const blockRe = /^```(\w+):(start|solution)\r?\n([\s\S]*?)^```/gm;
  let match;
  while ((match = blockRe.exec(body)) !== null) {
    codeBlocks[`${match[1]}:${match[2]}`] = match[3].trimEnd();
  }

  const firstBlock = body.search(/^```\w+:(start|solution)/m);
  const explanation = (firstBlock === -1 ? body : body.slice(0, firstBlock)).trim();

  const startCode = {
    html: codeBlocks['html:start'] ?? '',
    css:  codeBlocks['css:start']  ?? '',
    js:   codeBlocks['js:start']   ?? '',
  };

  const hasSolutionBlock =
    codeBlocks['html:solution'] !== undefined ||
    codeBlocks['css:solution']  !== undefined ||
    codeBlocks['js:solution']   !== undefined;

  const solutionCode = hasSolutionBlock ? {
    html: (codeBlocks['html:solution'] || '').trim() ? codeBlocks['html:solution'] : startCode.html,
    css:  (codeBlocks['css:solution']  || '').trim() ? codeBlocks['css:solution']  : startCode.css,
    js:   (codeBlocks['js:solution']   || '').trim() ? codeBlocks['js:solution']   : startCode.js,
  } : { ...startCode };

  return {
    title: String(meta?.title ?? ''),
    highlight: meta?.highlight ?? null,
    explanation,
    startCode,
    solutionCode,
    hasSolutionBlock,
  };
}

// ─── Валидаторы ──────────────────────────────────────────────────────────────

function validateHTML(code, label) {
  const issues = [];
  if (!code.trim()) return issues;
  if (['Наш редактор пока пуст', 'Редактор пока пуст'].some(p => code.includes(p))) return issues;

  const clean = code.replace(/<!--[\s\S]*?-->/g, '');
  const tagRe = /<\/?([a-zA-Z][a-zA-Z0-9\-]*)(?:\s+[^>]*)?\/?>/g;
  const stack = [];
  let m;
  while ((m = tagRe.exec(clean)) !== null) {
    const raw = m[0];
    const tag = m[1].toLowerCase();
    if (tag.startsWith('!')) continue;
    const isClosing = raw.startsWith('</');
    const isSelfClosing = raw.endsWith('/>') || VOID_ELEMENTS.has(tag);

    if (isClosing) {
      if (stack.length === 0) {
        issues.push({ priority: 'CRITICAL', msg: `HTML: лишний </${tag}> (пустой стек) в ${label}` });
        break;
      }
      const top = stack.pop();
      if (top !== tag) {
        issues.push({ priority: 'CRITICAL', msg: `HTML: </${tag}> несовпадает, ожидался </${top}> в ${label}` });
        break;
      }
    } else if (!isSelfClosing) {
      stack.push(tag);
    }
  }
  if (stack.length > 0) {
    issues.push({ priority: 'CRITICAL', msg: `HTML: незакрытые теги <${stack.join('>, <')}> в ${label}` });
  }
  if (/<!--\s*(TODO|FIXME|здесь|тут будет)/i.test(code)) {
    issues.push({ priority: 'LOW', msg: `HTML: комментарий-заглушка в ${label}` });
  }
  if (code.includes('<!DOCTYPE') && !code.includes('<body')) {
    issues.push({ priority: 'HIGH', msg: `HTML: полный документ но нет <body> в ${label}` });
  }
  return issues;
}

function validateCSS(code, label) {
  const issues = [];
  if (!code.trim()) return issues;

  let depth = 0;
  for (const ch of code) {
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth < 0) {
        issues.push({ priority: 'CRITICAL', msg: `CSS: лишняя } в ${label}` });
        break;
      }
    }
  }
  if (depth > 0) {
    issues.push({ priority: 'CRITICAL', msg: `CSS: ${depth} незакрытых { в ${label}` });
  }
  if (/:\s*;/.test(code)) {
    issues.push({ priority: 'MEDIUM', msg: `CSS: пустое значение свойства в ${label}` });
  }
  for (const bad of BAD_NAMES) {
    if (code.includes(bad)) {
      issues.push({ priority: 'HIGH', msg: `CSS: неканоничное имя ${bad} в ${label}` });
    }
  }
  return issues;
}

function validateJS(code, label) {
  const issues = [];
  if (!code.trim()) return issues;
  try { new Function(code); }
  catch (e) {
    issues.push({ priority: 'CRITICAL', msg: `JS: SyntaxError в ${label}: ${e.message}` });
  }
  if (/\/\/\s*(\.\.\.|тут|здесь|TODO|FIXME)/i.test(code)) {
    issues.push({ priority: 'MEDIUM', msg: `JS: комментарий-заглушка в ${label}` });
  }
  for (const bad of BAD_NAMES) {
    if (code.includes(`'${bad}'`) || code.includes(`"${bad}"`)) {
      issues.push({ priority: 'HIGH', msg: `JS: неканоничное имя ${bad} в ${label}` });
    }
  }
  return issues;
}

// ─── Утилиты ─────────────────────────────────────────────────────────────────

function diffLines(a, b) {
  const aSet = new Set((a || '').split('\n').map(l => l.trim()).filter(Boolean));
  return (b || '').split('\n').map(l => l.trim()).filter(l => l && !aSet.has(l)).length;
}

function isFullHtml(s) {
  return s.includes('<!DOCTYPE') || s.includes('<html');
}

function hasTaskSection(exp) {
  return /##\s*(🛠\s*)?Задание/i.test(exp);
}

function normalizeCode(s) {
  return (s || '').replace(/\s+/g, ' ').trim();
}

// ─── Статистика ──────────────────────────────────────────────────────────────

const stats = {
  totalSteps: 0,
  passed: 0,
  failed: 0,
  issues: { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 },
  stepIssues: [],
};

let prevSolution  = null;  // { html, css, js }
let prevHighlight = null;  // 'html' | 'css' | 'js' | null
let prevLabel     = null;

// ─── Главный цикл ────────────────────────────────────────────────────────────

const lessonDirs = readdirSync(CONTENT_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .sort((a, b) => a.name.localeCompare(b.name));

for (const dir of lessonDirs) {
  const lessonPath = join(CONTENT_DIR, dir.name);
  const metaPath   = join(lessonPath, '_lesson.yml');
  let lessonTitle  = dir.name;
  if (existsSync(metaPath)) {
    try { lessonTitle = (yaml.load(readFileSync(metaPath, 'utf-8'))).title || dir.name; } catch { /**/ }
  }

  console.log(C.bold(C.cyan(`\n╔══════════════════════════════════════════════════════╗`)));
  console.log(C.bold(C.cyan(`  Вебинар: ${dir.name} (${lessonTitle})`)));
  console.log(C.bold(C.cyan(`╚══════════════════════════════════════════════════════╝`)));

  const isWebinar1 = dir.name.startsWith('01-');
  const isWebinar2 = dir.name.startsWith('02-');

  const stepFiles = readdirSync(lessonPath).filter(f => f.endsWith('.md')).sort();
  let wPass = 0, wFail = 0;

  for (let si = 0; si < stepFiles.length; si++) {
    const stepFile = stepFiles[si];
    const label    = `${dir.name}/${stepFile}`;
    const content  = readFileSync(join(lessonPath, stepFile), 'utf-8');
    const step     = parseMdStep(content);
    stats.totalSteps++;

    const issues = [];

    // ── Парсинг ─────────────────────────────────────────────────────────────
    if (!step) {
      addIssue(issues, 'CRITICAL', 'Нет YAML фронтматтера');
      flush(label, issues, si + 1, stepFiles.length);
      wFail++; stats.failed++;
      continue;
    }
    if (step.yamlError) {
      addIssue(issues, 'CRITICAL', `YAML ошибка: ${step.yamlError}`);
      flush(label, issues, si + 1, stepFiles.length);
      wFail++; stats.failed++;
      continue;
    }

    const hasCode = step.startCode.html.trim() || step.startCode.css.trim() || step.startCode.js.trim();

    // ── Фронтматтер ─────────────────────────────────────────────────────────
    if (!step.title.trim()) addIssue(issues, 'HIGH', 'Пустой title');
    if (step.highlight && !VALID_HIGHLIGHTS.has(step.highlight)) {
      addIssue(issues, 'MEDIUM', `Недопустимое значение highlight: "${step.highlight}"`);
    }

    // ── html:start должен быть полным документом (вебинары 2+) ──────────────
    const hasCssOrJs = step.startCode.css.trim() || step.startCode.js.trim();
    // Вебинар 02, шаги 0–4 — строят HTML инкрементально, <body> может не быть
    const isEarlyBuild = isWebinar2 && si < 5;
    if (!isWebinar1 && !isEarlyBuild && hasCssOrJs && !isFullHtml(step.startCode.html)) {
      addIssue(issues, 'HIGH', 'html:start не содержит <!DOCTYPE/<html> при наличии css/js');
    }

    // ── Solution не стирает файлы ────────────────────────────────────────────
    if (step.startCode.html.trim() && !step.solutionCode.html.trim()) {
      addIssue(issues, 'CRITICAL', 'solutionCode.html ПУСТОЙ → белый экран');
    }
    if (step.startCode.css.trim() && !step.solutionCode.css.trim()) {
      addIssue(issues, 'CRITICAL', 'solutionCode.css ПУСТОЙ при непустом startCode.css');
    }
    if (step.startCode.js.trim() && !step.solutionCode.js.trim()) {
      addIssue(issues, 'CRITICAL', 'solutionCode.js ПУСТОЙ при непустом startCode.js');
    }


    // ── Синтаксическая валидация ─────────────────────────────────────────────
    issues.push(...validateHTML(step.startCode.html,    'html:start'));
    issues.push(...validateHTML(step.solutionCode.html, 'html:solution'));
    issues.push(...validateCSS(step.startCode.css,      'css:start'));
    issues.push(...validateCSS(step.solutionCode.css,   'css:solution'));
    issues.push(...validateJS(step.startCode.js,        'js:start'));
    issues.push(...validateJS(step.solutionCode.js,     'js:solution'));

    // ── Diff ─────────────────────────────────────────────────────────────────
    if (step.hasSolutionBlock) {
      const hd = diffLines(step.startCode.html, step.solutionCode.html);
      const cd = diffLines(step.startCode.css,  step.solutionCode.css);
      const jd = diffLines(step.startCode.js,   step.solutionCode.js);
      const td = hd + cd + jd;

      if (td === 0)   addIssue(issues, 'MEDIUM', ':solution есть, но diff=0 (start === solution)');
      if (td > 60)    addIssue(issues, 'MEDIUM', `Большой diff: +${td} строк (шаг перегружен)`);

      if (step.highlight === 'css'  && cd === 0 && (hd > 0 || jd > 0)) addIssue(issues, 'MEDIUM', 'highlight=css, но CSS не изменился');
      if (step.highlight === 'html' && hd === 0 && (cd > 0 || jd > 0)) addIssue(issues, 'MEDIUM', 'highlight=html, но HTML не изменился');
      if (step.highlight === 'js'   && jd === 0 && (hd > 0 || cd > 0)) addIssue(issues, 'MEDIUM', 'highlight=js, но JS не изменился');
    }

    // ── Связность с предыдущим шагом ────────────────────────────────────────
    // Паттерн курса: start[N] = полное состояние файла, solution[N-1] = промежуточный шаг.
    // Правило: solution[N-1] должен быть ПОДСТРОКОЙ start[N].
    // Если у шага нет блока {file}:start — он не работает с этим файлом, пропуск.
    if (prevSolution && si > 0) {
      const filesToCheck = prevHighlight ? [prevHighlight] : ['html', 'css', 'js'];
      for (const file of filesToCheck) {
        const prevSol  = prevSolution[file].trim();
        const curStart = step.startCode[file].trim();
        if (!prevSol || !curStart) continue;  // пустой start = файл не используется в шаге
        if (prevSol === curStart) continue;   // идеальное совпадение — OK

        // solution[N-1] должен присутствовать в start[N]
        // Берём ключевой срез из середины solution для надёжного поиска
        const midPoint = Math.floor(prevSol.length / 2);
        const keySlice = normalizeCode(prevSol).slice(
          Math.max(0, midPoint - 150),
          Math.min(normalizeCode(prevSol).length, midPoint + 150)
        );
        if (keySlice.length > 20 && !normalizeCode(curStart).includes(keySlice)) {
          addIssue(issues, 'HIGH', `${file}:start не содержит код из ${file}:solution предыдущего шага (${prevLabel})`);
        }
      }
    }

    // ── Объяснение ───────────────────────────────────────────────────────────
    if (step.explanation.length < 80) addIssue(issues, 'LOW', 'Объяснение слишком короткое (<80 символов)');
    if (hasCode && !hasTaskSection(step.explanation)) {
      addIssue(issues, 'LOW', 'Нет секции "## Задание" в объяснении');
    }

    // ── Неканоничные имена в HTML ────────────────────────────────────────────
    for (const bad of BAD_NAMES) {
      const attr = bad.startsWith('.') ? `class="${bad.slice(1)}"` : `id="${bad.slice(1)}"`;
      if (step.startCode.html.includes(attr) || step.solutionCode.html.includes(attr)) {
        addIssue(issues, 'HIGH', `HTML: неканоничное имя ${bad}`);
      }
    }

    // ── Вывод ────────────────────────────────────────────────────────────────
    const hasCrit = issues.some(i => i.priority === 'CRITICAL');
    const hasHigh = issues.some(i => i.priority === 'HIGH');
    const pass    = issues.length === 0;

    if (pass) {
      console.log(C.green(`  ✅ [${pad(si+1)}/${stepFiles.length}] ${stepFile} — PASS`));
      wPass++; stats.passed++;
    } else {
      const badge = hasCrit ? C.red('CRITICAL') : hasHigh ? C.yellow('HIGH') : C.gray('WARN');
      console.log(`  ${C.red('❌')} [${pad(si+1)}/${stepFiles.length}] ${stepFile} — FAIL [${badge}]`);
      for (const iss of issues) {
        const icon = iss.priority === 'CRITICAL' ? '🔴' : iss.priority === 'HIGH' ? '🟠' : iss.priority === 'MEDIUM' ? '🟡' : '🟢';
        console.log(`       ${icon} [${iss.priority}] ${iss.msg}`);
        stats.issues[iss.priority]++;
      }
      wFail++; stats.failed++;
      stats.stepIssues.push({ label, issues });
    }

    prevSolution  = step.solutionCode;
    prevHighlight = step.highlight || null;
    prevLabel     = label;
  }

  console.log(C.gray(`  ── Вебинар итого: ${wPass} PASS, ${wFail} FAIL ──`));
}

// ─── Итоговый отчёт ──────────────────────────────────────────────────────────

console.log(C.bold(`\n${'═'.repeat(60)}`));
console.log(C.bold(`  ИТОГОВЫЙ ОТЧЁТ АУДИТА`));
console.log(C.bold(`${'═'.repeat(60)}`));
console.log(`  Всего шагов проверено : ${stats.totalSteps}`);
console.log(C.green(`  PASS                  : ${stats.passed}`));
console.log(stats.failed > 0 ? C.red(`  FAIL                  : ${stats.failed}`) : C.green(`  FAIL                  : 0`));
console.log(`\n  Ошибки по приоритетам:`);
console.log(stats.issues.CRITICAL > 0 ? C.red(`    🔴 CRITICAL : ${stats.issues.CRITICAL}`)    : `    🔴 CRITICAL : 0`);
console.log(stats.issues.HIGH     > 0 ? C.yellow(`    🟠 HIGH     : ${stats.issues.HIGH}`)      : `    🟠 HIGH     : 0`);
console.log(stats.issues.MEDIUM   > 0 ? `    🟡 MEDIUM   : ${stats.issues.MEDIUM}`              : `    🟡 MEDIUM   : 0`);
console.log(stats.issues.LOW      > 0 ? `    🟢 LOW      : ${stats.issues.LOW}`                 : `    🟢 LOW      : 0`);

if (stats.failed === 0) {
  console.log(C.green(C.bold(`\n✅ ВСЕ ШАГИ ПРОШЛИ АУДИТ!`)));
} else {
  console.log(C.red(C.bold(`\n❌ ${stats.failed} шагов с ошибками.`)));

  const crits = stats.stepIssues.filter(s => s.issues.some(i => i.priority === 'CRITICAL'));
  if (crits.length > 0) {
    console.log(C.red(`\n  ── КРИТИЧЕСКИЕ (исправить немедленно) ──`));
    for (const s of crits) {
      console.log(`  📌 ${s.label}`);
      s.issues.filter(i => i.priority === 'CRITICAL').forEach(i => console.log(`     ${i.msg}`));
    }
  }

  const highs = stats.stepIssues.filter(s => !s.issues.some(i => i.priority === 'CRITICAL') && s.issues.some(i => i.priority === 'HIGH'));
  if (highs.length > 0) {
    console.log(C.yellow(`\n  ── HIGH (связность между шагами) ──`));
    for (const s of highs) {
      console.log(`  📌 ${s.label}`);
      s.issues.filter(i => i.priority === 'HIGH').forEach(i => console.log(`     ${i.msg}`));
    }
  }

  process.exit(1);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function addIssue(arr, priority, msg) {
  arr.push({ priority, msg });
}

function flush(label, issues, num, total) {
  console.log(`  ${C.red('❌')} [${pad(num)}/${total}] ${label} — FAIL [${C.red('CRITICAL')}]`);
  for (const i of issues) {
    console.log(`     🔴 [CRITICAL] ${i.msg}`);
    stats.issues.CRITICAL++;
  }
  stats.stepIssues.push({ label, issues });
}

function pad(n) { return String(n).padStart(2, '0'); }
