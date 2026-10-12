const fs = require('fs');

const data = JSON.parse(fs.readFileSync('scratch_filtered.json', 'utf8'));

// Only process a few files at a time to not exceed output length.
// We'll just print out a JSON object containing TargetContent and ReplacementContent
// so I can easily format it.
console.log(data.slice(0,1).map(d => {
  return "OK";
}));
