const fs = require('fs');

function extractBlock(file, blockName) {
  const content = fs.readFileSync(file, 'utf8');
  const tagStr = "```" + blockName;
  const startIdx = content.indexOf(tagStr);
  if (startIdx !== -1) {
    const nextLineIdx = content.indexOf("\n", startIdx);
    const endIdx = content.indexOf("```", nextLineIdx);
    if (endIdx !== -1) {
      return content.substring(nextLineIdx + 1, endIdx);
    }
  }
  return null;
}

function updateBlock(file, blockName, replacer) {
  let content = fs.readFileSync(file, 'utf8');
  const tagStr = "```" + blockName;
  const startIdx = content.indexOf(tagStr);
  if (startIdx !== -1) {
    const nextLineIdx = content.indexOf("\n", startIdx);
    const endIdx = content.indexOf("```", nextLineIdx);
    if (endIdx !== -1) {
      const before = content.substring(0, nextLineIdx + 1);
      const inner = content.substring(nextLineIdx + 1, endIdx);
      const after = content.substring(endIdx);
      fs.writeFileSync(file, before + replacer(inner) + after);
      console.log(`Updated ${blockName} in ${file}`);
    }
  }
}

// 87 - 05-displayed-rooms-state.md
const file87 = 'content/lessons/08-search/05-displayed-rooms-state.md';
const file04 = 'content/lessons/08-search/04-refactor-render.md';
updateBlock(file87, 'js:start', () => extractBlock(file04, 'js:solution'));

// 88 - 09-search-event.md
const file88 = 'content/lessons/08-search/09-search-event.md';
updateBlock(file88, 'js:start', (inner) => {
  return inner.replace(/if\s*\(searchInput\)\s*searchInput\.addEventListener\('input',\s*applyFilter\);\r?\n?/, '');
});

// 89 - 11-call-init-filters.md
const file89 = 'content/lessons/08-search/11-call-init-filters.md';
updateBlock(file89, 'js:start', (inner) => {
  return inner.replace(/function renderCatalog\(\) \{[\s\S]*?\n\}\r?\n?/, '');
});

// 90 - 13-booking-form-html.md
const file90 = 'content/lessons/08-search/13-booking-form-html.md';
updateBlock(file90, 'html:start', (inner) => {
  return inner.replace(/<form id="bookingForm"[\s\S]*?<\/form>/, '<!-- Вставьте форму сюда -->');
});

