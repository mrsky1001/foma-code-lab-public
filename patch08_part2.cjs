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

function updateBlock(file, blockName, newContent) {
  let content = fs.readFileSync(file, 'utf8');
  const tagStr = "```" + blockName;
  const startIdx = content.indexOf(tagStr);
  if (startIdx !== -1) {
    const nextLineIdx = content.indexOf("\n", startIdx);
    const endIdx = content.indexOf("```", nextLineIdx);
    if (endIdx !== -1) {
      const before = content.substring(0, nextLineIdx + 1);
      const after = content.substring(endIdx);
      fs.writeFileSync(file, before + newContent + after);
      console.log(`Updated ${blockName} in ${file}`);
    }
  }
}

// 92
const file92 = 'content/lessons/08-search/16-init-booking-skeleton.md';
let c92 = extractBlock(file92, 'js:start');
if (c92) {
  c92 = c92.replace(/function initBookingCalc\(\) \{[\s\S]*?\n\}/, 'function initBookingCalc() {\n  \n}');
  updateBlock(file92, 'js:start', c92);
}

const file93 = 'content/lessons/08-search/17-booking-auth-guard.md';
updateBlock(file93, 'js:start', extractBlock(file92, 'js:solution'));

const file94 = 'content/lessons/08-search/18-populate-select.md';
updateBlock(file94, 'js:start', extractBlock(file93, 'js:solution'));

const file95 = 'content/lessons/08-search/19-auto-select-room.md';
updateBlock(file95, 'js:start', extractBlock(file94, 'js:solution'));

const file96 = 'content/lessons/08-search/20-update-price-func.md';
updateBlock(file96, 'js:start', extractBlock(file95, 'js:solution'));

const file97 = 'content/lessons/08-search/25-booking-redirect.md';
let c97 = extractBlock(file97, 'js:start');
if (c97) {
  c97 = c97.replace(/initBookingCalc\(\);\r?\n?/, '');
  updateBlock(file97, 'js:start', c97);
}

