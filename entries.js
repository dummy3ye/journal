const fs = require('fs');
const path = require('path');

const entriesDir = path.join(__dirname, 'entries');
const outputFile = path.join(__dirname, 'entries.json');

try {
  const files = fs.readdirSync(entriesDir)
    .filter(file => file.endsWith('.md'))
    .sort((a, b) => {
      // Keep README at the top
      if (a === 'README.md') return -1;
      if (b === 'README.md') return 1;
      return a.localeCompare(b);
    });

  fs.writeFileSync(outputFile, JSON.stringify(files, null, 3));
  console.log(`Successfully generated entries.json with ${files.length} entries.`);
} catch (err) {
  console.error('Error generating entries.json:', err);
  process.exit(1);
}
