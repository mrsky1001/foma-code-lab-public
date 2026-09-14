/**
 * foma-fix-continuity.mjs — Автоматическое исправление разрывов связности
 *
 * Принцип: start[N] должен = solution[N-1].
 * Если js:start шага N не содержит код из js:solution шага N-1 —
 * заменяем весь блок js:start в файле шага N на js:solution шага N-1.
 *
 * Запуск: node scripts/foma-fix-continuity.mjs [--dry-run]
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';

const DRY_RUN = process.argv.includes('--dry-run');
const CONTENT_DIR = 'content/lessons';

const C = {
  red:    s => `\x1b[31m${s}\x1b[0m`,
  yellow: s => `\x1b[33m${s}\x1b[0m`,
  green:  s => `\x1b[32m${s}\x1b[0m`,
  cyan:   s => `\x1b[36m${s}\x1b[0m`,
  bold:   s => `\x1b[1m${s}\x1b[0m`,
  gray:   s => `\x1b[90m${s}\x1b[0m`,
};

// ─── Парсинг ─────────────────────────────────────────────────────────────────

function parseStep(content) {
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!fmMatch) return null;

  let meta;
  try { meta = yaml.load(fmMatch[1]); } catch { return null; }

  const body = fmMatch[2];
  const blocks = {};
  const blockRe = /^```(\w+):(start|solution)\r?\n([\s\S]*?)^```/gm;
  let m;
  while ((m = blockRe.exec(body)) !== null) {
    blocks[`${m[1]}:${m[2]}`] = m[3].trimEnd();
  }

  const start = {
    html: blocks['html:start'] ?? '',
    css:  blocks['css:start']  ?? '',
    js:   blocks['js:start']   ?? '',
  };

  const hasSol = 'html:solution' in blocks || 'css:solution' in blocks || 'js:solution' in blocks;
  const solution = hasSol ? {
    html: (blocks['html:solution'] || '').trim() ? blocks['html:solution'] : start.html,
    css:  (blocks['css:solution']  || '').trim() ? blocks['css:solution']  : start.css,
    js:   (blocks['js:solution']   || '').trim() ? blocks['js:solution']   : start.js,
  } : { ...start };

  return {
    title: String(meta?.title ?? ''),
    highlight: meta?.highlight ?? null,
    start,
    solution,
    hasSol,
  };
}

// ─── Замена блока в тексте ───────────────────────────────────────────────────

/**
 * Заменяет блок ```lang:variant\n...\n``` в тексте файла на новое содержимое.
 * Сохраняет оригинальный line ending (\r\n или \n).
 */
function replaceBlock(fileContent, lang, variant, newCode) {
  // Определяем line ending
  const le = fileContent.includes('\r\n') ? '\r\n' : '\n';

  const re = new RegExp(
    `(\`\`\`${lang}:${variant}\\r?\\n)([\\s\\S]*?)(\`\`\`)`,
    'gm'
  );

  let replaced = false;
  const result = fileContent.replace(re, (full, open, _old, close) => {
    if (replaced) return full; // заменяем только первое вхождение
    replaced = true;
    const normalizedCode = newCode.replace(/\r\n/g, '\n').replace(/\n/g, le);
    return `${open}${normalizedCode}${le}${close}`;
  });

  return { result, replaced };
}

// ─── Нормализация для сравнения ──────────────────────────────────────────────

function norm(s) { return (s || '').replace(/\s+/g, ' ').trim(); }

function getMidSlice(s) {
  const n = norm(s);
  const mid = Math.floor(n.length / 2);
  return n.slice(Math.max(0, mid - 150), Math.min(n.length, mid + 150));
}

function hasKeyContent(target, source) {
  if (!source.trim()) return true;   // нечего проверять
  if (!target.trim()) return false;  // target пуст, source нет
  if (norm(source) === norm(target)) return true;

  const key = getMidSlice(source);
  return key.length <= 20 || norm(target).includes(key);
}

// ─── Главный цикл ────────────────────────────────────────────────────────────

const lessonDirs = readdirSync(CONTENT_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .sort((a, b) => a.name.localeCompare(b.name));

let totalFixed   = 0;
let totalSkipped = 0;
let totalOk      = 0;
const fixLog     = [];

let prevSolution  = null;
let prevHighlight = null;
let prevLabel     = null;

console.log(C.bold(DRY_RUN
  ? `\n⚠️  DRY-RUN режим — файлы НЕ будут изменены\n`
  : `\n🔧 Исправление разрывов связности...\n`));

for (const dir of lessonDirs) {
  const lessonPath = join(CONTENT_DIR, dir.name);
  const stepFiles  = readdirSync(lessonPath).filter(f => f.endsWith('.md')).sort();
  const isWebinar1 = dir.name.startsWith('01-');

  for (let si = 0; si < stepFiles.length; si++) {
    const stepFile = stepFiles[si];
    const filePath = join(lessonPath, stepFile);
    const label    = `${dir.name}/${stepFile}`;
    const original = readFileSync(filePath, 'utf-8');
    const step     = parseStep(original);

    if (!step) { totalSkipped++; continue; }

    let content = original;
    let fileChanged = false;

    // Проверяем только тот файл который менялся на предыдущем шаге
    if (prevSolution && si > 0) {
      const filesToCheck = prevHighlight ? [prevHighlight] : ['html', 'css', 'js'];

      for (const file of filesToCheck) {
        const prevSol  = prevSolution[file];
        const curStart = step.start[file];

        if (!prevSol.trim()) continue;
        if (hasKeyContent(curStart, prevSol)) continue;

        // ── Разрыв обнаружен — исправляем ──────────────────────────────────
        const blockExists = content.includes(`\`\`\`${file}:start`);
        if (!blockExists) {
          console.log(C.yellow(`  ⚠️  ${label}: нет блока ${file}:start — пропуск`));
          continue;
        }

        const { result, replaced } = replaceBlock(content, file, 'start', prevSol);

        if (!replaced) {
          console.log(C.yellow(`  ⚠️  ${label}: не смог заменить ${file}:start (regex не сработал)`));
          continue;
        }

        console.log(C.green(`  ✅ FIXED  ${label}`));
        console.log(C.gray(`         ${file}:start заменён на ${file}:solution из ${prevLabel}`));
        console.log(C.gray(`         было: ${curStart.length} байт → стало: ${prevSol.length} байт`));

        content = result;
        fileChanged = true;
        totalFixed++;
        fixLog.push({ label, file, prevLabel });
      }
    }

    if (fileChanged) {
      if (!DRY_RUN) {
        writeFileSync(filePath, content, 'utf-8');
      }
    } else if (prevSolution && si > 0) {
      totalOk++;
    }

    // Обновляем tracking
    prevSolution  = step.solution;
    prevHighlight = step.highlight || null;
    prevLabel     = label;
  }
}

// ─── Итог ────────────────────────────────────────────────────────────────────

console.log(C.bold(`\n${'═'.repeat(55)}`));
console.log(C.bold(`  Результат исправления`));
console.log(C.bold(`${'═'.repeat(55)}`));
console.log(C.green(`  Исправлено   : ${totalFixed} шагов`));
console.log(       `  Без изменений: ${totalOk} шагов`);
console.log(       `  Пропущено    : ${totalSkipped} шагов`);

if (DRY_RUN && totalFixed > 0) {
  console.log(C.yellow(`\n  ⚠️  DRY-RUN — запустите без --dry-run чтобы применить`));
}

if (!DRY_RUN && totalFixed > 0) {
  console.log(C.green(C.bold(`\n✅ Готово! Запустите аудит для проверки:`)));
  console.log(       `   node scripts/foma-audit.mjs`);
}
