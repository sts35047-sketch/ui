const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = content.indexOf('function StudentLoginFlow');
const endIdx = content.indexOf('function Flow4', startIdx);
let flowText = content.substring(startIdx, endIdx);

const svgStart = flowText.indexOf('<svg viewBox="0 0 790 590"');
const svgEnd = flowText.indexOf('</svg>', svgStart) + 6;
const svgCode = flowText.substring(svgStart, svgEnd);

fs.mkdirSync('scratch', { recursive: true });
fs.writeFileSync('scratch/svg.txt', svgCode);
console.log("SVG saved.");
