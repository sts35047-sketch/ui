const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = '<span className="text-3xl leading-none" aria-hidden="true">??</span>';
const replacementStr = '<img src={logoUrl} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />';

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replacementStr);
    console.log("Logo replaced successfully.");
} else {
    console.log("Could not find target string.");
}

fs.writeFileSync('src/App.tsx', content, 'utf8');
