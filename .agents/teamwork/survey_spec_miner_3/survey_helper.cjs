const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const lessons = ['07-slider', '08-search', '09-final', '10-troubleshooting'];
const results = {};

lessons.forEach(lessonName => {
  const dir = path.join('content', 'lessons', lessonName);
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();
  results[lessonName] = files.map((file, idx) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    let meta = {};
    if (fmMatch) {
      try { meta = yaml.load(fmMatch[1]) || {}; } catch (e) { meta = { error: e.message }; }
    }
    const isTheory = file.startsWith('00-theory-') || meta.type === 'theory';
    const type = meta.type || (isTheory ? 'theory' : 'practice');
    
    // Check code blocks
    const hasHtmlStart = /```html:start/.test(raw);
    const hasHtmlSol = /```html:solution/.test(raw);
    const hasCssStart = /```css:start/.test(raw);
    const hasCssSol = /```css:solution/.test(raw);
    const hasJsStart = /```js:start/.test(raw);
    const hasJsSol = /```js:solution/.test(raw);

    return {
      stepNumber: idx + 1,
      filename: file,
      title: meta.title || '',
      type,
      highlight: meta.highlight || '',
      blocks: {
        htmlStart: hasHtmlStart,
        htmlSol: hasHtmlSol,
        cssStart: hasCssStart,
        cssSol: hasCssSol,
        jsStart: hasJsStart,
        jsSol: hasJsSol
      },
      rawLength: raw.length,
      linesCount: raw.split('\n').length
    };
  });
});

console.log(JSON.stringify(results, null, 2));
