import fs from 'fs';
import path from 'path';

const report = fs.readFileSync('content/AUDIT_REPORT.md', 'utf8');
const rules = JSON.parse(fs.readFileSync('scripts/audit_fix_rules.json', 'utf8'));

const m2Rules = rules.filter(r => r.id >= 35 && r.id <= 58);

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

// Find report section for each issue
function getReportSection(id) {
  const lines = report.split('\n');
  // Match lines where issue is mentioned
  // Usually "### `<filename>`" or "#### Проблема <N>"
  const r = rules.find(x => x.id === id);
  const fileName = path.basename(r.file_path);
  
  let startIdx = -1;
  let endIdx = -1;

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l.includes(fileName)) {
      if (id === 35) {
        if (l.includes('Проблема 1: Отсутствие объяснения условных')) {
          startIdx = i;
          break;
        }
      } else if (id === 36) {
        if (l.includes('Проблема 2: Лишний вывод в консоль')) {
          startIdx = i;
          break;
        }
      } else if (id === 39) {
        if (l.includes('Проблема 1: Ошибка в ASCII-схеме')) {
          startIdx = i;
          break;
        }
      } else if (id === 40) {
        if (l.includes('Проблема 2: Использование addEventListener')) {
          startIdx = i;
          break;
        }
      } else {
        if (l.startsWith('### `') && !l.includes('без замечаний')) {
          startIdx = i;
          break;
        }
      }
    }
  }

  if (startIdx !== -1) {
    for (let j = startIdx + 1; j < lines.length; j++) {
      if (lines[j].startsWith('### ') || lines[j].startsWith('## ') || (lines[j].startsWith('#### Проблема') && j > startIdx + 2)) {
        endIdx = j;
        break;
      }
    }
    if (endIdx === -1) endIdx = startIdx + 30;
    return lines.slice(startIdx, endIdx).join('\n');
  }

  return 'Not found in report';
}

const analysis = [];

for (const rule of m2Rules) {
  const filePath = rule.file_path;
  const rawContent = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
  const { fm, body, blocks } = parseBlocks(rawContent);

  const reportSnippet = getReportSection(rule.id);

  const checkEvaluations = rule.checks.map(c => {
    let passed = false;
    let actual = '';
    if (c.type === 'presence_file') {
      passed = rawContent.includes(c.pattern);
      actual = passed ? 'Present in file' : 'Missing in file';
    } else if (c.type === 'absence_file') {
      passed = !rawContent.includes(c.pattern);
      actual = passed ? 'Absent in file' : 'Found in file';
    } else if (c.type === 'presence_block') {
      const blk = blocks[c.block] || '';
      passed = blk.includes(c.pattern);
      actual = passed ? `Present in [${c.block}]` : `Missing in [${c.block}]`;
    } else if (c.type === 'absence_block') {
      const blk = blocks[c.block] || '';
      passed = !blk.includes(c.pattern);
      actual = passed ? `Absent in [${c.block}]` : `Found in [${c.block}]`;
    }
    return {
      type: c.type,
      block: c.block,
      pattern: c.pattern,
      passed,
      actual
    };
  });

  analysis.push({
    id: rule.id,
    lesson: rule.lesson,
    file_path: rule.file_path,
    title: rule.title,
    priority: rule.priority,
    defect_type: rule.defect_type,
    lines: rule.lines,
    checks: checkEvaluations,
    allChecksPassOnDisk: checkEvaluations.every(c => c.passed),
    reportSnippet
  });
}

console.log(JSON.stringify(analysis, null, 2));
