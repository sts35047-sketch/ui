const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = content.indexOf('function StudentLoginFlow({ setActive }');
const nextFnIdx = content.indexOf('function Flow4', startIdx);
let f = content.substring(startIdx, nextFnIdx);

f = f.replace(/<div className="bg-\[#E9E2D3\][\s\S]*?<main[\s\S]*?>/, '<div className="bg-white h-[calc(100dvh-64px)] w-full flex flex-col-reverse md:grid md:grid-cols-2 font-sans selection:bg-[#EE930D]/20 overflow-hidden">');

// I also need to replace logo.
f = f.replace(
  '<span className="text-3xl leading-none" aria-hidden="true">??</span>',
  '<img src="/logo.png" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />'
);

content = content.substring(0, startIdx) + f + content.substring(nextFnIdx);
fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Regex replace 2 done");
