import fs from 'fs';
import path from 'path';

const rulesPath = 'scripts/audit_fix_rules.json';
const allRules = JSON.parse(fs.readFileSync(rulesPath, 'utf8'));
const m2Rules = allRules.filter(r => r.id >= 35 && r.id <= 58);

function parseBlocks(content) {
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  const fm = fmMatch ? fmMatch[1] : '';
  const body = fmMatch ? fmMatch[2] : content;

  const blocks = {};
  const blockRe = /^```(\w+):(\w+)\r?\n([\s\S]*?)^```/gm;
  let m;
  while ((m = blockRe.exec(body)) !== null) {
    blocks[`${m[1]}:${m[2]}`] = m[3];
  }

  const taskMatch = body.match(/## 🛠 Задание\r?\n([\s\S]*?)(?=(?:```|\n## |\Z))/);
  const taskText = taskMatch ? taskMatch[1] : '';
  blocks['task'] = taskText;

  return { fm, body, blocks };
}

console.log(`Evaluating ${m2Rules.length} rules (M2: 35..58) against current disk...\n`);

const results = [];

for (const rule of m2Rules) {
  const filePath = rule.file_path;
  const exists = fs.existsSync(filePath);
  if (!exists) {
    results.push({ id: rule.id, status: 'FILE_NOT_FOUND', details: [filePath] });
    continue;
  }

  const rawContent = fs.readFileSync(filePath, 'utf8');
  const { fm, body, blocks } = parseBlocks(rawContent);

  const checkResults = [];
  let allPassed = true;

  for (const check of rule.checks) {
    let passed = false;
    let actualSnippet = '';

    if (check.type === 'presence_file') {
      passed = rawContent.includes(check.pattern);
      actualSnippet = passed ? 'FOUND in file' : 'NOT FOUND in file';
    } else if (check.type === 'absence_file') {
      // In audit_fix_rules, check represents target condition (fixed state)
      // absence_file means fixed state should NOT have pattern.
      // So if pattern is absent, the check passes (i.e. fix is already present or was never needed).
      const found = rawContent.includes(check.pattern);
      passed = !found;
      actualSnippet = found ? 'FOUND in file (flaw present)' : 'ABSENT from file';
    } else if (check.type === 'presence_block') {
      const targetBlock = blocks[check.block] || '';
      passed = targetBlock.includes(check.pattern);
      actualSnippet = passed ? `FOUND in [${check.block}]` : `NOT FOUND in [${check.block}]`;
    } else if (check.type === 'absence_block') {
      const targetBlock = blocks[check.block] || '';
      const found = targetBlock.includes(check.pattern);
      passed = !found;
      actualSnippet = found ? `FOUND in [${check.block}] (flaw present)` : `ABSENT from [${check.block}]`;
    } else if (check.type === 'frontmatter') {
      // Check frontmatter
      passed = fm.includes(check.pattern);
      actualSnippet = passed ? 'FOUND in frontmatter' : 'NOT FOUND in frontmatter';
    }

    checkResults.push({
      type: check.type,
      block: check.block,
      pattern: check.pattern,
      passed,
      actualSnippet
    });

    if (!passed) allPassed = false;
  }

  results.push({
    id: rule.id,
    file_path: rule.file_path,
    title: rule.title,
    allPassed,
    checkResults
  });
}

for (const res of results) {
  const mark = res.allPassed ? '✅ ALREADY PASSES (PREMATURE/FIXED)' : '❌ FAILS (FLAW PRESENT / UNFIXED)';
  console.log(`[Rule ${res.id}] ${mark} - ${res.title}`);
  for (const c of res.checkResults) {
    console.log(`   - ${c.passed ? 'PASS' : 'FAIL'}: [${c.type}] ${c.block ? '(' + c.block + ') ' : ''}${JSON.stringify(c.pattern)} => ${c.actualSnippet}`);
  }
}

const passedCount = results.filter(r => r.allPassed).length;
const failedCount = results.filter(r => !r.allPassed).length;
console.log(`\nSummary: ${passedCount} passing on disk, ${failedCount} failing on disk out of ${results.length} total.`);
