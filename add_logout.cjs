const fs = require('fs');
let txt = fs.readFileSync('public/atelier.html', 'utf8');

const oldDiv = `h("div",{className:"font-mono text-[14px] md:text-[16px] tracking-wide",children:["Student 1", c("span", {className:"ml-3 opacity-50"}, "1EP24CS0001")]})`;
const newDiv = `h("div",{className:"flex items-center gap-3",children:[ h("div",{className:"font-mono text-[14px] md:text-[16px] tracking-wide",children:["Student 1", c("span", {className:"ml-3 opacity-50"}, "1EP24CS0001")]}), c("button",{onClick:()=>window.parent.postMessage("LOGOUT","*"), className:"ml-2 px-2 py-0.5 rounded-full border border-[#c45a3c] text-[#c45a3c] hover:bg-[#fff7eb] font-mono text-[9px] tracking-widest uppercase transition-colors"},"Logout") ]})`;

if (txt.includes(oldDiv)) {
  txt = txt.replace(oldDiv, newDiv);
  fs.writeFileSync('public/atelier.html', txt);
  console.log('Added Logout inside atelier.html');
} else {
  console.log('Could not find oldDiv to replace.');
}
