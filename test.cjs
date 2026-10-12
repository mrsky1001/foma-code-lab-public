const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scratch_filtered.json', 'utf8'));
const troubles = data.filter(d => d.lesson === '08-search');
troubles.forEach(d => {
    console.log(`=== ID: ${d.id} | ${d.file_path} ===`);
    console.log(`FIX: ${d.fix}\n`);
});
