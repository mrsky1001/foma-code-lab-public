// scripts/verify-all-theory-lessons.mjs
import fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';
import vm from 'vm';

const lessonsDir = path.resolve('content/lessons');
const dirs = fs.readdirSync(lessonsDir).filter(d => fs.statSync(path.join(lessonsDir, d)).isDirectory()).sort();

let totalTheory = 0;
const errors = [];
const warnings = [];

for (const dir of dirs) {
  const dirPath = path.join(lessonsDir, dir);
  const metaPath = path.join(dirPath, '_lesson.yml');
  let lessonMeta = {};
  if (fs.existsSync(metaPath)) {
    lessonMeta = yaml.load(fs.readFileSync(metaPath, 'utf-8')) || {};
  }
  const lessonId = Number(lessonMeta.id) || 0;
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md')).sort();

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
    const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!fmMatch) continue;
    const meta = yaml.load(fmMatch[1]) || {};
    const body = fmMatch[2];

    const isTheory = meta.type === 'theory' || (lessonId === 1 && meta.type !== 'practice');
    if (!isTheory) continue;

    totalTheory++;
    const stepLabel = `${dir}/${file}`;

    const codeBlocks = {};
    const blockRe = /^```(\w+):(start|solution)\r?\n([\s\S]*?)^```/gm;
    let m;
    while ((m = blockRe.exec(body)) !== null) {
      codeBlocks[m[1] + ':' + m[2]] = m[3].trim();
    }

    const hl = meta.highlight;

    // Rule 1: If highlight is CSS, html:start MUST be non-empty and have valid HTML
    if (hl === 'css') {
      if (!codeBlocks['html:start'] || codeBlocks['html:start'].trim().length < 20) {
        errors.push(`${stepLabel}: [hl: css] missing html:start context!`);
      }
      if (!codeBlocks['css:start'] || codeBlocks['css:start'].trim().length < 20) {
        errors.push(`${stepLabel}: [hl: css] missing or trivial css:start!`);
      }
      if (!codeBlocks['css:solution'] || codeBlocks['css:solution'].trim().length < 20) {
        errors.push(`${stepLabel}: [hl: css] missing css:solution!`);
      }
    }

    // Rule 2: If highlight is JS, check JS syntax and check for DOM interaction
    if (hl === 'js') {
      if (!codeBlocks['js:start'] || codeBlocks['js:start'].trim().length < 10) {
        errors.push(`${stepLabel}: [hl: js] missing js:start!`);
      } else {
        try {
          new vm.Script(codeBlocks['js:start']);
        } catch (e) {
          // Some lessons intentionally have syntax errors for student to fix (e.g. troubleshooting 03)
          if (!dir.includes('10-troubleshooting') || !file.includes('syntax')) {
            errors.push(`${stepLabel}: SyntaxError in js:start -> ${e.message}`);
          }
        }
      }

      // If JS accesses DOM (document.querySelector, etc.), html:start MUST be present
      const jsCode = (codeBlocks['js:start'] || '') + (codeBlocks['js:solution'] || '');
      const usesDom = jsCode.includes('document.') || jsCode.includes('querySelector') || jsCode.includes('addEventListener');
      if (usesDom && (!codeBlocks['html:start'] || codeBlocks['html:start'].trim().length < 20)) {
        errors.push(`${stepLabel}: [hl: js] accesses DOM but missing html:start context!`);
      }
    }

    // Rule 3: For non-Module-1 steps, check that solutions exist
    if (hl && ['html', 'css', 'js'].includes(hl)) {
      if (!codeBlocks[`${hl}:solution`]) {
        warnings.push(`${stepLabel}: missing ${hl}:solution block`);
      }
    }
  }
}

console.log(`\n========================================`);
console.log(`AUDIT RESULTS: ${totalTheory} theoretical steps checked`);
console.log(`ERRORS:   ${errors.length}`);
console.log(`WARNINGS: ${warnings.length}`);
console.log(`========================================\n`);

if (errors.length > 0) {
  console.log('❌ ERRORS:');
  errors.forEach(e => console.log('  - ' + e));
} else {
  console.log('✅ All required context rules passed with 0 errors!');
}

if (warnings.length > 0) {
  console.log('\n⚠️  WARNINGS:');
  warnings.forEach(w => console.log('  - ' + w));
}
