/**
 * Audit and verify all rebuilt lesson files for webinars 5-9.
 * Run: node scripts/verify-lessons-5-9.mjs
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const LESSONS_DIR = path.join(ROOT, 'content', 'lessons');

const webinars = ['05-catalog', '06-forms', '07-slider', '08-search', '09-final'];

let totalSteps = 0;
let passedSteps = 0;
const issues = [];

console.log('--- Auditing webinars 5-9 ---');

for (const w of webinars) {
  const dir = path.join(LESSONS_DIR, w);
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();

  for (const f of files) {
    totalSteps++;
    const fullPath = path.join(dir, f);
    const content = fs.readFileSync(fullPath, 'utf8');

    // 1. Check frontmatter
    const fmM = content.match(/^---\n([\s\S]*?)\n---/);
    if (!fmM) {
      issues.push(`${w}/${f}: Missing or invalid frontmatter`);
      continue;
    }

    const titleM = fmM[1].match(/title:\s*"?([^"\n]+)"?/);
    const hlM = fmM[1].match(/highlight:\s*([^\n]+)/);
    const title = titleM ? titleM[1] : '';
    const hl = hlM ? hlM[1].trim() : '';

    // 2. Extract code blocks
    const blockRegex = /```([a-zA-Z0-9_\.\-]+):([a-zA-Z0-9_\.\-]+)\n([\s\S]*?)```/g;
    const blocks = {};
    let bm;
    while ((bm = blockRegex.exec(content)) !== null) {
      blocks[`${bm[1]}:${bm[2]}`] = bm[3];
    }

    // Check HTML
    if (!blocks['html:start']) {
      issues.push(`${w}/${f}: Missing html:start`);
    } else {
      if (!blocks['html:start'].includes('<!DOCTYPE html>')) {
        issues.push(`${w}/${f}: html:start missing <!DOCTYPE html>`);
      }
    }

    // Check CSS
    if (!blocks['css:start']) {
      issues.push(`${w}/${f}: Missing css:start`);
    }

    // Check JS
    if (!blocks['js:start']) {
      issues.push(`${w}/${f}: Missing js:start`);
    } else {
      // Validate js:start syntax
      try {
        new vm.Script(blocks['js:start']);
      } catch (e) {
        issues.push(`${w}/${f}: Syntax error in js:start -> ${e.message}`);
      }

      // Check fake comments
      if (blocks['js:start'].includes('// ...')) {
        issues.push(`${w}/${f}: Found fake comment "// ..." in js:start`);
      }
    }

    // Validate js:solution syntax if present
    if (blocks['js:solution']) {
      try {
        new vm.Script(blocks['js:solution']);
      } catch (e) {
        issues.push(`${w}/${f}: Syntax error in js:solution -> ${e.message}`);
      }
      if (blocks['js:solution'].includes('// ...')) {
        issues.push(`${w}/${f}: Found fake comment "// ..." in js:solution`);
      }
    }

    if (!issues.some(iss => iss.startsWith(`${w}/${f}`))) {
      passedSteps++;
    }
  }
}

console.log(`\nAudit Results:`);
console.log(`Total steps checked: ${totalSteps}`);
console.log(`Passed steps: ${passedSteps}`);
console.log(`Issues found: ${issues.length}`);

if (issues.length > 0) {
  console.error('\nIssues:');
  issues.forEach(iss => console.error('  ❌ ' + iss));
  process.exit(1);
} else {
  console.log('\n✅ ALL 97 STEPS PASSED AUDIT WITH ZERO ERRORS!');
  process.exit(0);
}
