/**
 * foma-generate-solutions.mjs — Генерация отсутствующих :solution блоков
 *
 * Принцип: solution[N] = start[N+1] следующего шага который РЕАЛЬНО меняет этот файл
 * (ищем первый шаг N+k где js:start[N+k] != js:start[N])
 *
 * Запуск: node scripts/foma-generate-solutions.mjs [--dry-run]
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join }  from 'path';
import { load }  from 'js-yaml';

const DRY_RUN     = process.argv.includes('--dry-run');
const CONTENT_DIR = 'content/lessons';

const C = {
  green:  s => `\x1b[32m${s}\x1b[0m`,
  yellow: s => `\x1b[33m${s}\x1b[0m`,
  gray:   s => `\x1b[90m${s}\x1b[0m`,
  bold:   s => `\x1b[1m${s}\x1b[0m`,
};

// ─── Парсинг ─────────────────────────────────────────────────────────────────

function parseStep(content) {
  const fmRaw = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmRaw) return null;
  let meta = {};
  try { meta = load(fmRaw[1]); } catch { return null; }

  const bodyMatch = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/);
  if (!bodyMatch) return null;

  const blocks = {};
  const blockRe = /^```(\w+):(start|solution)\r?\n([\s\S]*?)^```/gm;
  let m;
  let matchCount = 0;
  while ((m = blockRe.exec(bodyMatch[1])) !== null) {
    blocks[`${m[1]}:${m[2]}`] = m[3].trimEnd();
    matchCount++;
  }
  // DEBUG: покажем первый раз что нашли
  if (matchCount === 0 && bodyMatch[1].length > 100) {
    // Проверим есть ли бэктики в тексте
    const hasBt = bodyMatch[1].includes('\x60\x60\x60');
    process.stderr.write(`DBG parseStep: body.len=${bodyMatch[1].length}, hasBt=${hasBt}, matchCount=0\n`);
  }

  return {
    highlight:   meta?.highlight ?? null,
    blocks,
    hasSolution: ('html:solution' in blocks) || ('css:solution' in blocks) || ('js:solution' in blocks),
  };
}

// ─── Вставить :solution в конец ──────────────────────────────────────────────

function appendSolution(fileContent, lang, code) {
  const le = fileContent.includes('\r\n') ? '\r\n' : '\n';
  const norm = code.replace(/\r\n/g, '\n').replace(/\n/g, le);
  return fileContent.trimEnd() + le + le + `\`\`\`${lang}:solution` + le + norm + le + '```' + le;
}

// ─── Главный цикл ────────────────────────────────────────────────────────────

let generated = 0;
let skipped   = 0;

const lessonDirs = readdirSync(CONTENT_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .sort((a, b) => a.name.localeCompare(b.name));

console.log(C.bold(DRY_RUN
  ? `\n⚠️  DRY-RUN — файлы НЕ будут изменены\n`
  : `\n🔧 Генерация отсутствующих :solution блоков...\n`));

for (const dir of lessonDirs) {
  console.log('LOOP:', dir.name);
  const lessonPath = join(CONTENT_DIR, dir.name);
  const stepFiles  = readdirSync(lessonPath).filter(f => f.endsWith('.md')).sort();
  console.log(`  ${dir.name}: ${stepFiles.length} stepFiles`);

  // Предварительно парсим все шаги вебинара
  const parsed = stepFiles.map(sf => {
    try {
      return parseStep(readFileSync(join(lessonPath, sf), 'utf-8'));
    } catch { return null; }
  });

  // DEBUG
  const noSolCount = parsed.filter((s,i) => s && !s.hasSolution && s.highlight && ['js','css','html'].includes(s.highlight) && (s.blocks[`${s.highlight}:start`]||'').trim()).length;
  if (noSolCount > 0) process.stderr.write(`  DBG ${dir.name}: ${stepFiles.length} steps, ${noSolCount} need solution\n`);

  for (let si = 0; si < stepFiles.length; si++) {
    const label = `${dir.name}/${stepFiles[si]}`;
    const step  = parsed[si];
    if (!step) { skipped++; continue; }

    // DEBUG for 04-js-dom
    if (dir.name === '04-js-dom' && si < 3) {
      process.stderr.write(`  STEP ${si} ${stepFiles[si]}: blocks=[${Object.keys(step.blocks).join(',')}] hl=${step.highlight}\n`);
    }

    // Только шаги С highlight и БЕЗ КОНКРЕТНОГО lang:solution
    const lang = step.highlight;
    if (!lang || !['js', 'css', 'html'].includes(lang)) continue;
    if (`${lang}:solution` in step.blocks) continue;  // уже есть решение для этого языка

    const curStart = (step.blocks[`${lang}:start`] ?? '').trim();
    if (!curStart) { skipped++; continue; }

    // Ищем следующий шаг где {lang}:start РЕАЛЬНО другой
    let solutionCode = null;
    let sourceIdx    = -1;

    for (let ni = si + 1; ni < stepFiles.length; ni++) {
      const nextStep = parsed[ni];
      if (!nextStep) continue;
      const nextStart = (nextStep.blocks[`${lang}:start`] ?? '').trim();
      if (!nextStart) continue;
      if (nextStart === curStart) continue;
      solutionCode = nextStart;
      sourceIdx    = ni;
      break;
    }

    if (!solutionCode) { skipped++; continue; }

    // Пишем :solution
    const filePath = join(lessonPath, stepFiles[si]);
    const content  = readFileSync(filePath, 'utf-8');
    const updated  = appendSolution(content, lang, solutionCode);

    console.log(C.green(`  ✅ GEN   ${label}`));
    console.log(C.gray(`         ${lang}:solution ← ${lang}:start из ${dir.name}/${stepFiles[sourceIdx]}`));

    if (!DRY_RUN) writeFileSync(filePath, updated, 'utf-8');
    generated++;
  }
}

// ─── Итог ────────────────────────────────────────────────────────────────────

console.log(C.bold(`\n${'═'.repeat(55)}`));
console.log(C.bold(`  Генерация :solution блоков`));
console.log(C.bold(`${'═'.repeat(55)}`));
console.log(C.green(`  Сгенерировано : ${generated} блоков`));
console.log(       `  Пропущено     : ${skipped}`);
if (DRY_RUN && generated > 0) console.log(C.yellow(`\n  Запустите без --dry-run чтобы применить`));
if (!DRY_RUN && generated > 0) {
  console.log(C.green(C.bold(`\n✅ Готово! Запустите аудит:`)));
  console.log(`   node scripts/foma-audit.mjs`);
}
