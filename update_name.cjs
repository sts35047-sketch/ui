const fs = require('fs');
let txt = fs.readFileSync('public/atelier.html', 'utf8');
txt = txt.replace(
  'children:["Student 1.",c("span",{className:"absolute -right-8 -top-2 font-mono text-[10px] tracking-widest opacity-40 rotate-3",children:"*you"})]',
  'children:["Karunya A.",c("span",{className:"absolute -right-16 -top-3 font-mono text-[11px] tracking-widest opacity-40 rotate-3",children:"1EP24CS001"})]'
);
fs.writeFileSync('public/atelier.html', txt);
console.log('Updated name and USN.');
