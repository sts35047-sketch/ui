const fs = require('fs');

// 1. Mobile CSS
let mobileCss = fs.readFileSync('src/mobile.css', 'utf8');
mobileCss = mobileCss.replace('.marks-summary { padding:18px; position:relative; }', '.marks-summary { padding:12px 14px; position:relative; }');
mobileCss = mobileCss.replace('.marks-total { font-size:29px; font-weight:800; margin-top:4px; }', '.marks-total { font-size:24px; font-weight:800; margin-top:2px; }');
mobileCss = mobileCss.replace('.score-ring { position:absolute; right:20px; top:24px; width:55px; height:55px; font-size:11px; }', '.score-ring { position:absolute; right:14px; top:16px; width:45px; height:45px; font-size:10px; }');
fs.writeFileSync('src/mobile.css', mobileCss);

// 2. Desktop App.tsx
let appTsx = fs.readFileSync('src/App.tsx', 'utf8');

// Find the Compact CIE Marks Card and reduce its padding and text size
const compactCardIdx = appTsx.indexOf('{/* Compact CIE Marks Card */}');
if (compactCardIdx !== -1) {
    const endCard = appTsx.indexOf('</div>', appTsx.indexOf('View detailed marks', compactCardIdx));
    let cardStr = appTsx.substring(compactCardIdx, endCard);
    
    // Reduce p-6 to p-4
    cardStr = cardStr.replace('p-6 shadow-sm', 'p-4 shadow-sm');
    // Reduce font size
    cardStr = cardStr.replace('text-[40px]', 'text-[32px]');
    
    appTsx = appTsx.substring(0, compactCardIdx) + cardStr + appTsx.substring(endCard);
}

fs.writeFileSync('src/App.tsx', appTsx);
console.log('Reduced size of marks ledger box card!');
