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

// 102
const file102 = 'content/lessons/09-final/04-init-mybookings-skeleton.md';
let c102 = extractBlock(file102, 'js:start');
if (c102) {
  c102 = c102.replace(/function initMyBookings\(\) \{[\s\S]*?\n\}/, 'function initMyBookings() {\n  \n}');
  updateBlock(file102, 'js:start', c102);
}

const file103 = 'content/lessons/09-final/05-mybookings-auth-guard.md';
updateBlock(file103, 'js:start', extractBlock(file102, 'js:solution'));

const file104 = 'content/lessons/09-final/06-check-empty-array.md';
updateBlock(file104, 'js:start', extractBlock(file103, 'js:solution'));

const file105 = 'content/lessons/09-final/07-render-mock-bookings.md';
updateBlock(file105, 'js:start', extractBlock(file104, 'js:solution'));

const file106 = 'content/lessons/09-final/08-booking-card-html.md';
updateBlock(file106, 'js:start', extractBlock(file105, 'js:solution'));

