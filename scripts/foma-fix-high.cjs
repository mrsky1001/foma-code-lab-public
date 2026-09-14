#!/usr/bin/env node
/**
 * foma-fix-high.cjs — Исправление оставшихся HIGH ошибок связности
 * Использует CJS require() для надёжного парсинга блоков кода.
 *
 * Запуск: node scripts/foma-fix-high.cjs [--dry-run]
 */

const fs   = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const DRY_RUN     = process.argv.includes('--dry-run');
const CONTENT_DIR = 'content/lessons';

const C = {
  green:  s => `\x1b[32m${s}\x1b[0m`,
  yellow: s => `\x1b[33m${s}\x1b[0m`,
  gray:   s => `\x1b[90m${s}\x1b[0m`,
  bold:   s => `\x1b[1m${s}\x1b[0m`,
  red:    s => `\x1b[31m${s}\x1b[0m`,
  cyan:   s => `\x1b[36m${s}\x1b[0m`,
};

// ─── Надёжный CJS-парсер ─────────────────────────────────────────────────────

function parseStep(content) {
  const fmRaw = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmRaw) return null;
  let meta = {};
  try { meta = yaml.load(fmRaw[1]); } catch { return null; }

  const bodyMatch = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/);
  if (!bodyMatch) return null;
  const body = bodyMatch[1];

  const blocks = {};
  const re = /^```(\w+):(start|solution)\r?\n([\s\S]*?)^```/gm;
  let m;
  while ((m = re.exec(body)) !== null) {
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
    highlight: meta?.highlight ?? null,
    start,
    solution,
    blocks,
    hasSol,
  };
}

// ─── Нормализация для сравнения ──────────────────────────────────────────────

function norm(s) { return (s || '').replace(/\s+/g, ' ').trim(); }

function hasKeyContent(target, source) {
  if (!source.trim() || !target.trim()) return true;
  if (norm(source) === norm(target)) return true;
  const mid = Math.floor(source.length / 2);
  const key = norm(source).slice(Math.max(0, mid - 150), Math.min(norm(source).length, mid + 150));
  return key.length <= 20 || norm(target).includes(key);
}

// ─── Замена блока :start в файле ─────────────────────────────────────────────

function replaceStartBlock(fileContent, lang, newCode) {
  const le = fileContent.includes('\r\n') ? '\r\n' : '\n';
  const re = new RegExp('(```' + lang + ':start\\r?\\n)([\\s\\S]*?)(```)', 'gm');
  let replaced = false;
  const result = fileContent.replace(re, (full, open, _old, close) => {
    if (replaced) return full;
    replaced = true;
    const norm = newCode.replace(/\r\n/g, '\n').replace(/\n/g, le);
    return `${open}${norm}${le}${close}`;
  });
  return { result, replaced };
}

// ─── Главный цикл ────────────────────────────────────────────────────────────

let fixed = 0;
let skipped = 0;

const lessonDirs = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .sort((a, b) => a.name.localeCompare(b.name));

console.log(C.bold(DRY_RUN
  ? `\n⚠️  DRY-RUN — файлы НЕ будут изменены\n`
  : `\n🔧 Исправление HIGH ошибок связности...\n`));

let prevSolution  = null;
let prevHighlight = null;
let prevLabel     = null;

for (const dir of lessonDirs) {
  const lessonPath = path.join(CONTENT_DIR, dir.name);
  const stepFiles  = fs.readdirSync(lessonPath).filter(f => f.endsWith('.md')).sort();

  for (let si = 0; si < stepFiles.length; si++) {
    const stepFile = stepFiles[si];
    const label    = `${dir.name}/${stepFile}`;
    const content  = fs.readFileSync(path.join(lessonPath, stepFile), 'utf-8');
    const step     = parseStep(content);

    if (!step) { prevSolution = null; prevHighlight = null; continue; }

    if (prevSolution && si > 0) {
      const filesToCheck = prevHighlight ? [prevHighlight] : ['html', 'css', 'js'];

      for (const file of filesToCheck) {
        const prevSol  = prevSolution[file].trim();
        const curStart = step.start[file].trim();

        if (!prevSol || !curStart) continue;
        if (hasKeyContent(curStart, prevSol)) continue;

        // HIGH разрыв обнаружен — исправляем
        console.log(C.red(`  🔴 HIGH  ${label}`));
        console.log(C.gray(`         ${file}:start ← ${file}:solution из ${prevLabel}`));
        console.log(C.gray(`         ${curStart.length} → ${prevSol.length} байт`));

        const { result, replaced } = replaceStartBlock(content, file, prevSol);
        if (!replaced) {
          console.log(C.yellow(`         ⚠️  не смог заменить ${file}:start`));
          skipped++;
        } else {
          if (!DRY_RUN) fs.writeFileSync(path.join(lessonPath, stepFile), result, 'utf-8');
          // Обновим content для следующей итерации по файлам в шаге
          fixed++;
        }
      }
    }

    prevSolution  = step.solution;
    prevHighlight = step.highlight || null;
    prevLabel     = label;
  }
}

// ─── Итог ────────────────────────────────────────────────────────────────────

console.log(C.bold(`\n${'═'.repeat(55)}`));
console.log(C.bold(`  Исправление HIGH ошибок`));
console.log(C.bold(`${'═'.repeat(55)}`));
console.log(C.green(`  Исправлено : ${fixed}`));
console.log(       `  Пропущено  : ${skipped}`);

if (DRY_RUN && fixed > 0) console.log(C.yellow(`\n  Запустите без --dry-run чтобы применить`));
if (!DRY_RUN && fixed > 0) {
  console.log(C.green(C.bold(`\n✅ Готово! Запустите аудит:`)));
  console.log(`   node scripts/foma-audit.mjs`);
}
if (fixed === 0) {
  console.log(C.green(`\n✅ Нет HIGH ошибок для исправления!`));
}
