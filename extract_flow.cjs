const fs = require('fs');
const html = fs.readFileSync('src/App.tsx', 'utf8');
const start = html.indexOf('function StudentLoginFlow');
const end = html.indexOf('function Flow4', start);
console.log(html.substring(start, end));
