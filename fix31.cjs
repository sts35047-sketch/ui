const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = content.indexOf('function StudentLoginFlow');
const endIdx = content.indexOf('function Flow4', startIdx);
console.log(startIdx, endIdx);

// Let's get the SVG part exactly.
const svgStart = content.indexOf('<svg viewBox="0 0 790 590"', startIdx);
const svgEnd = content.indexOf('</svg>', svgStart) + 6;
console.log("SVG Length:", svgEnd - svgStart);

fs.writeFileSync('scratch/svg.txt', content.substring(svgStart, svgEnd));

