const fs = require('fs');

function updateBlock(file, blockName, newContent) {
  let content = fs.readFileSync(file, 'utf8');
  const tagStr = "```" + blockName;
  const startIdx = content.indexOf(tagStr);
  if (startIdx !== -1) {
    const endIdx = content.indexOf("```", startIdx + tagStr.length);
    if (endIdx !== -1) {
      const before = content.substring(0, startIdx + tagStr.length + 1);
      const after = content.substring(endIdx);
      fs.writeFileSync(file, before + newContent + after);
      console.log(`Updated ${blockName} in ${file}`);
    }
  } else {
    console.log(`Block ${blockName} not found in ${file}`);
  }
}

// 99
let cssSol99 = `.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
`;
updateBlock('content/lessons/09-final/01-bookings-list-css.md', 'css:solution', cssSol99);

// 100
let cssStart100 = `.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
`;
updateBlock('content/lessons/09-final/02-booking-item-css.md', 'css:start', cssStart100);

// 101
let cssStart101 = `.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.booking-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
`;
updateBlock('content/lessons/09-final/03-empty-message-css.md', 'css:start', cssStart101);

