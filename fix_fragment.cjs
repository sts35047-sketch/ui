const fs = require('fs');
let txt = fs.readFileSync('src/App.tsx', 'utf8');

txt = txt.replace('return (\n    <div className="hidden', 'return (\n    <>\n    <div className="hidden');
fs.writeFileSync('src/App.tsx', txt);
console.log('Fixed fragment');
