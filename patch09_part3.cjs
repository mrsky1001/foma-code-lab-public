const fs = require('fs');

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

const file107 = 'content/lessons/09-final/09-call-init-mybookings.md';
updateBlock(file107, 'js:start', (inner) => {
  return inner.replace(/initMyBookings\(\);\r?\n?/, '');
});

const file108 = 'content/lessons/09-final/10-final-congratulations.md';
let c108 = fs.readFileSync(file108, 'utf8');
c108 = c108.replace('type: practice', 'type: theory');
c108 = c108.replace('style="display: block;"', 'style="display: none;"');
fs.writeFileSync(file108, c108);
console.log(`Updated ${file108}`);

