// deep-audit-logic.mjs
// Performs a comprehensive logical, continuity, DOM-alignment, and syntax audit
// of all lessons (practice & theory) across all 10 modules.

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const CONTENT_DIR = 'content/lessons';

// Parse code blocks
function parseCodeBlocks(body) {
  const blocks = {};
  const blockRe = /^```(\w+):(start|solution)\r?\n([\s\S]*?)^```/gm;
  let m;
  while ((m = blockRe.exec(body)) !== null) {
    blocks[`${m[1]}:${m[2]}`] = m[3].trimEnd();
  }
  return blocks;
}

// Extract frontmatter
function parseFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { fm: {}, body: content };
  const lines = m[1].split('\n');
  const fm = {};
  for (const line of lines) {
    const p = line.indexOf(':');
    if (p !== -1) {
      const k = line.slice(0, p).trim();
      const v = line.slice(p + 1).trim().replace(/^["']|["']$/g, '');
      fm[k] = v;
    }
  }
  return { fm, body: m[2] };
}

// Extract DOM IDs from HTML
function extractHtmlIds(html) {
  const ids = new Set();
  const re = /id=["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    ids.add(m[1]);
  }
  return ids;
}

// Extract DOM classes from HTML
function extractHtmlClasses(html) {
  const classes = new Set();
  const re = /class=["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    m[1].split(/\s+/).forEach(c => c && classes.add(c));
  }
  return classes;
}

// Extract getElementById calls
function extractGetElementById(js) {
  const ids = [];
  const re = /(?:document|parent|container)\.getElementById\(\s*['"`]([^'"`]+)['"`]\s*\)/g;
  let m;
  while ((m = re.exec(js)) !== null) {
    ids.push(m[1]);
  }
  return ids;
}

// Extract querySelector / querySelectorAll calls
function extractQuerySelectors(js) {
  const selectors = [];
  const re = /(?:document|container)\.querySelector(?:All)?\(\s*['"`]([^'"`]+)['"`]\s*\)/g;
  let m;
  while ((m = re.exec(js)) !== null) {
    selectors.push(m[1]);
  }
  return selectors;
}

// Extract declared functions in JS
function extractDeclaredFunctions(js) {
  const funcs = new Set();
  const re1 = /function\s+([a-zA-Z0-9_$]+)\s*\(/g;
  let m;
  while ((m = re1.exec(js)) !== null) {
    funcs.add(m[1]);
  }
  const re2 = /(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*(?:function|\([^)]*\)\s*=>)/g;
  while ((m = re2.exec(js)) !== null) {
    funcs.add(m[1]);
  }
  return funcs;
}

// Extract calls inside DOMContentLoaded
function extractDOMContentLoadedCalls(js) {
  const calls = [];
  const m = js.match(/DOMContentLoaded['"]\s*,\s*\(\s*\)\s*=>\s*\{([\s\S]*?)\}\s*\)/);
  if (m) {
    const body = m[1];
    const callRe = /([a-zA-Z0-9_$]+)\s*\(\s*\);/g;
    let cm;
    while ((cm = callRe.exec(body)) !== null) {
      calls.push(cm[1]);
    }
  }
  return calls;
}

// Check JS syntax safely
function checkJsSyntax(code) {
  if (!code.trim()) return null;
  // If it contains import or export, replace with dummy declarations for syntax checking
  const cleaned = code
    .replace(/(?:^|\n)\s*export\s+default\s+/g, '\nconst __default_export__ = ')
    .replace(/(?:^|\n)\s*export\s+(?:const|let|var|function|class)\s+/g, '\nvar ')
    .replace(/(?:^|\n)\s*export\s*\{[^}]*\}\s*;?/g, '\n')
    .replace(/(?:^|\n)\s*import\s+[^;\n]+;?/g, '\n');

  try {
    new Function(cleaned);
    return null;
  } catch (e) {
    return e.message;
  }
}

// Read all modules
const lessonDirs = readdirSync(CONTENT_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .sort((a, b) => a.name.localeCompare(b.name));

const allIssues = [];

for (const dir of lessonDirs) {
  const lessonPath = join(CONTENT_DIR, dir.name);
  const stepFiles = readdirSync(lessonPath)
    .filter(f => f.endsWith('.md'))
    .sort();

  console.log(`\nScanning ${dir.name}... (${stepFiles.length} files)`);

  let prevPracticeCode = { html: '', css: '', js: '' };
  let hasPracticePrev = false;

  for (const stepFile of stepFiles) {
    const filePath = join(lessonPath, stepFile);
    const content = readFileSync(filePath, 'utf-8');
    const { fm, body } = parseFrontmatter(content);
    const blocks = parseCodeBlocks(body);
    const label = `${dir.name}/${stepFile}`;
    const isTheory = fm.type === 'theory' || dir.name.startsWith('01-') && !fm.type;

    if (isTheory) {
      // ─── THEORY CHECKS ───
      const jsSol = blocks['js:solution'] || '';
      const htmlSol = blocks['html:solution'] || blocks['html:start'] || '';
      const cssSol = blocks['css:solution'] || blocks['css:start'] || '';

      // Check JS syntax
      if (jsSol) {
        const err = checkJsSyntax(jsSol);
        if (err) allIssues.push({ level: 'ERROR', step: label, msg: `Theory JS syntax error: ${err}` });
      }

      // Check DOM element references
      if (jsSol && htmlSol) {
        const ids = extractHtmlIds(htmlSol);
        const getIds = extractGetElementById(jsSol);
        for (const id of getIds) {
          // ignore dynamically created elements or templates
          if (!ids.has(id) && !htmlSol.includes(id)) {
            allIssues.push({ level: 'WARN', step: label, msg: `Theory JS references getElementById('${id}') not found in HTML` });
          }
        }
      }

      // Check for empty body with styled tags
      if (htmlSol.includes('<head>') && !htmlSol.includes('<body') && (cssSol.includes('header') || cssSol.includes('.logo'))) {
        allIssues.push({ level: 'WARN', step: label, msg: `Theory lesson has <head> and header/logo CSS but no <body>` });
      }
    } else {
      // ─── PRACTICE CHECKS ───
      const highlight = fm.highlight || 'html';
      const jsSol = blocks['js:solution'] || '';
      const htmlSol = blocks['html:solution'] || '';
      const cssSol = blocks['css:solution'] || '';
      const jsStart = blocks['js:start'] || '';

      // Check JS syntax
      if (jsSol) {
        const err = checkJsSyntax(jsSol);
        if (err) allIssues.push({ level: 'ERROR', step: label, msg: `Practice JS syntax error: ${err}` });
      }

      // Check DOMContentLoaded calls against declared functions
      if (jsSol) {
        const declared = extractDeclaredFunctions(jsSol);
        const dclCalls = extractDOMContentLoadedCalls(jsSol);
        for (const call of dclCalls) {
          if (!declared.has(call)) {
            allIssues.push({ level: 'ERROR', step: label, msg: `DOMContentLoaded calls undeclared function '${call}()'` });
          }
        }
      }

      // Check for premature functions or mismatched calls
      if (dir.name === '05-catalog' || dir.name === '06-forms' || dir.name === '07-slider') {
        if (jsSol.includes('initCatalogFilters(')) {
          allIssues.push({ level: 'ERROR', step: label, msg: `Premature initCatalogFilters found before module 08` });
        }
        if (jsStart.includes('initCatalogFilters(')) {
          allIssues.push({ level: 'ERROR', step: label, msg: `Premature initCatalogFilters in js:start before module 08` });
        }
      }

      // Check if step 21 of 08-search or others are missing functions
      if (stepFile === '21-calc-total.md') {
        if (!jsStart.includes('initBookingCalc')) {
          allIssues.push({ level: 'ERROR', step: label, msg: `08-search/21-calc-total.md js:start is missing initBookingCalc` });
        }
      }

      // Check continuity in practice
      if (hasPracticePrev) {
        // If step has js:start, compare with prevPracticeCode.js
        if (jsStart && highlight === 'js') {
          // Check if jsStart is missing functions that were in prevPractice
          const prevFuncs = extractDeclaredFunctions(prevPracticeCode.js);
          const currStartFuncs = extractDeclaredFunctions(jsStart);
          for (const f of prevFuncs) {
            // function might have been replaced (e.g. renderCatalog -> initCatalogFilters)
            if (!currStartFuncs.has(f) && !(f === 'renderCatalog' && dir.name === '08-search')) {
              allIssues.push({ level: 'WARN', step: label, msg: `js:start dropped previously declared function '${f}()'` });
            }
          }
        }
      }

      // Accumulate for next step
      prevPracticeCode = {
        html: htmlSol.trim() ? htmlSol : prevPracticeCode.html,
        css:  cssSol.trim()  ? cssSol  : prevPracticeCode.css,
        js:   jsSol.trim()   ? jsSol   : prevPracticeCode.js,
      };
      if (highlight) {
        const otherLangs = ['html', 'css', 'js'].filter(l => l !== highlight);
        for (const l of otherLangs) {
          // retain
        }
      }
      hasPracticePrev = true;
    }
  }
}

console.log('\n========================================');
console.log(`AUDIT COMPLETE. Total issues: ${allIssues.length}`);
console.log('========================================');

const errors = allIssues.filter(i => i.level === 'ERROR');
const warns = allIssues.filter(i => i.level === 'WARN');

console.log(`\nERRORS (${errors.length}):`);
errors.forEach(e => console.log(`  ❌ [${e.step}] ${e.msg}`));

console.log(`\nWARNINGS (${warns.length}):`);
warns.forEach(w => console.log(`  ⚠️  [${w.step}] ${w.msg}`));

if (errors.length > 0) {
  process.exit(1);
} else {
  console.log('\n✅ ZERO ERRORS FOUND!');
}
