const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replaceAll('React.useState', 'useState');
fs.writeFileSync('src/App.tsx', content, 'utf8');
