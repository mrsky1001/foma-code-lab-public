const fs = require('fs');
const path = require('path');

const files = [
  '04-refactor-render.md',
  '05-displayed-rooms-state.md',
  '06-empty-search-result.md',
  '07-apply-filter-func.md',
  '08-array-filter.md',
  '09-search-event.md',
  '10-array-sort.md'
];

files.forEach(f => {
  const filePath = path.join('content/lessons/08-search', f);
  let content = fs.readFileSync(filePath, 'utf8');
  const tagStr = "```js:start";
  const startIdx = content.indexOf(tagStr);
  if (startIdx !== -1) {
    const nextLineIdx = content.indexOf("\n", startIdx);
    const endIdx = content.indexOf("```", nextLineIdx);
    if (endIdx !== -1) {
      const before = content.substring(0, nextLineIdx + 1);
      let inner = content.substring(nextLineIdx + 1, endIdx);
      const after = content.substring(endIdx);
      
      inner = inner.replace(/function renderCatalog\(\) \{[\s\S]*?\n\}\r?\n?/, '');
      fs.writeFileSync(filePath, before + inner + after);
      console.log(`Removed renderCatalog from ${f}`);
    }
  }
});

