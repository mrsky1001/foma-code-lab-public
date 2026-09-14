// verify-all-lessons.mjs
// Audits all 9 webinars for:
//   - Valid JS syntax in js:start and js:solution blocks
//   - Presence of html:start (non-empty) in steps that have html or css or js
//   - No placeholder comments (// ...)
// Run: node scripts/verify-all-lessons.mjs

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const CONTENT_DIR = 'content/lessons';

// Parse code blocks from markdown body
function parseCodeBlocks(body) {
  const blocks = {};
  const blockRe = /^```(\w+):(start|solution)\r?\n([\s\S]*?)^```/gm;
  let m;
  while ((m = blockRe.exec(body)) !== null) {
    blocks[`${m[1]}:${m[2]}`] = m[3].trimEnd();
  }
  return blocks;
}

function validateJS(code, label) {
  const issues = [];
  if (!code.trim()) return issues;
  try {
    new Function(code);
  } catch (e) {
    issues.push(`JS syntax error in ${label}: ${e.message}`);
  }
  // Check for placeholder stubs
  if (/\/\/\s*\.\.\.\s*(тут|здесь|тут идет|далее)/.test(code)) {
    issues.push(`Placeholder comment found in ${label}`);
  }
  return issues;
}

const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

function validateCSS(code, label) {
  const issues = [];
  if (!code.trim()) return issues;
  let depth = 0;
  for (let i = 0; i < code.length; i++) {
    if (code[i] === '{') depth++;
    else if (code[i] === '}') {
      depth--;
      if (depth < 0) {
        issues.push(`CSS syntax error: unexpected closing '}' in ${label}`);
        break;
      }
    }
  }
  if (depth > 0) {
    issues.push(`CSS syntax error: ${depth} unclosed '{' in ${label}`);
  }
  return issues;
}

function validateHTML(code, label) {
  const issues = [];
  if (!code.trim() || code.includes('Наш редактор пока пуст')) return issues;

  // Remove comments
  const clean = code.replace(/<!--[\s\S]*?-->/g, '');

  const tagRe = /<\/?([a-zA-Z0-9\-]+)(?:\s+[^>]*)?\/?>/g;
  const stack = [];
  let m;
  while ((m = tagRe.exec(clean)) !== null) {
    const raw = m[0];
    const tag = m[1].toLowerCase();
    if (tag.startsWith('!')) continue; // doctype
    const isClosing = raw.startsWith('</');
    const isSelfClosing = raw.endsWith('/>') || VOID_ELEMENTS.has(tag);

    if (isClosing) {
      if (stack.length === 0) {
        issues.push(`HTML error: unexpected closing tag </${tag}> with empty stack in ${label}`);
        break;
      }
      const top = stack.pop();
      if (top !== tag) {
        issues.push(`HTML error: mismatched tag </${tag}>, expected </${top}> in ${label}`);
        break;
      }
    } else if (!isSelfClosing) {
      stack.push(tag);
    }
  }

  if (stack.length > 0) {
    issues.push(`HTML error: unclosed tags <${stack.join('>, <')}> in ${label}`);
  }
  return issues;
}

let totalSteps = 0;
let passedSteps = 0;
let totalIssues = 0;
const issueLog = [];

const lessonDirs = readdirSync(CONTENT_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .sort((a, b) => a.name.localeCompare(b.name));

for (const dir of lessonDirs) {
  const lessonPath = join(CONTENT_DIR, dir.name);
  const stepFiles = readdirSync(lessonPath)
    .filter(f => f.endsWith('.md'))
    .sort();

  for (const stepFile of stepFiles) {
    const filePath = join(lessonPath, stepFile);
    const content = readFileSync(filePath, 'utf-8');
    const fmMatch = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/);
    if (!fmMatch) continue;

    const body = fmMatch[1];
    const blocks = parseCodeBlocks(body);
    const stepLabel = `${dir.name}/${stepFile}`;
    totalSteps++;

    const stepIssues = [];

    // Validate JS blocks
    for (const variant of ['start', 'solution']) {
      const js = blocks[`js:${variant}`];
      if (js !== undefined) {
        stepIssues.push(...validateJS(js, `${stepLabel} [js:${variant}]`));
      }
    }

    // Validate CSS blocks
    for (const variant of ['start', 'solution']) {
      const css = blocks[`css:${variant}`];
      if (css !== undefined) {
        stepIssues.push(...validateCSS(css, `${stepLabel} [css:${variant}]`));
      }
    }

    // Validate HTML blocks
    for (const variant of ['start', 'solution']) {
      const html = blocks[`html:${variant}`];
      if (html !== undefined) {
        stepIssues.push(...validateHTML(html, `${stepLabel} [html:${variant}]`));
      }
    }

    // If the step has css or js content, check html:start is non-trivially present
    const hasCssOrJs = blocks['css:start'] || blocks['css:solution'] || blocks['js:start'] || blocks['js:solution'];
    const htmlStart = blocks['html:start'] ?? '';
    if (hasCssOrJs && !htmlStart.includes('<html') && !htmlStart.includes('<!DOCTYPE')) {
      // Only warn for webinars 2+ (webinar 1 doesn't need full html)
      if (!dir.name.startsWith('01-')) {
        stepIssues.push(`Missing full html:start context in ${stepLabel}`);
      }
    }

    if (stepIssues.length === 0) {
      passedSteps++;
    } else {
      totalIssues += stepIssues.length;
      issueLog.push(...stepIssues);
    }
  }
}

console.log(`\n--- Auditing all webinars (1-9) ---\n`);

if (issueLog.length > 0) {
  console.log('Issues found:');
  issueLog.forEach(i => console.log('  ❌ ' + i));
} else {
  console.log('No issues found!');
}

console.log(`\nAudit Results:`);
console.log(`Total steps checked: ${totalSteps}`);
console.log(`Passed steps: ${passedSteps}`);
console.log(`Issues found: ${totalIssues}`);

if (totalIssues === 0) {
  console.log('\n✅ ALL STEPS PASSED AUDIT WITH ZERO ERRORS!');
} else {
  console.log(`\n❌ ${totalIssues} issue(s) need fixing.`);
  process.exit(1);
}
