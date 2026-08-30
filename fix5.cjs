const fs = require('fs');
let lines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');

// Find function Flow5
let idx = lines.findIndex(l => l.includes('function Flow5'));
// Add a </div> above the );
if (idx !== -1) {
  let insertIdx = idx - 2;
  lines.splice(insertIdx, 0, '    </div>\r');
  console.log("Added to Flow4");
}

fs.writeFileSync('src/App.tsx', lines.join('\n'), 'utf8');
