const fs = require('fs');
let txt = fs.readFileSync('src/App.tsx', 'utf8');

txt = txt.replace(/>loki</g, '>Karunya KP<');
txt = txt.replace(/loki/g, 'Karunya KP');
txt = txt.replace(/>L</g, '>K<'); // Also replacing any L in the avatar circles

fs.writeFileSync('src/App.tsx', txt);
console.log('Fixed names');
