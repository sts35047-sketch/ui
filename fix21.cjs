const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace font-serif with serif and remove the style attribute
content = content.replace(/font-serif/g, 'serif');
content = content.replace(/style=\{\{ fontFamily: '"Playfair Display", Georgia, serif' \}\}/g, '');

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Font replaced");
