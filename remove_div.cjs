const fs = require('fs');
let txt = fs.readFileSync('src/App.tsx', 'utf8');

const endReturn = txt.lastIndexOf(');', txt.indexOf('function Flow5'));
const strToReplace = `</div>
    <div className="block md:hidden">`;
const replacement = `  <div className="block md:hidden">`;

txt = txt.substring(0, endReturn - 150) + txt.substring(endReturn - 150, endReturn).replace(strToReplace, replacement) + txt.substring(endReturn);

fs.writeFileSync('src/App.tsx', txt);
console.log('Removed extra div');
