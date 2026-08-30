const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = content.indexOf('function StudentLoginFlow({ setActive }');
const nextFnIdx = content.indexOf('function Flow4', startIdx);
let f = content.substring(startIdx, nextFnIdx);

f = f.replace('</main>', '</div>');

content = content.substring(0, startIdx) + f + content.substring(nextFnIdx);
fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Fixed main tag");
