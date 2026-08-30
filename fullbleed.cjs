const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = content.indexOf('function StudentLoginFlow({ setActive }');
const nextFnIdx = content.indexOf('function Flow4', startIdx);
let f = content.substring(startIdx, nextFnIdx);

f = f.replace(
  '<div className="bg-[#E9E2D3] h-[calc(100dvh-64px)] w-full flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-6 font-sans selection:bg-[#EE930D]/20">\r\n      <main className="w-full max-w-[1400px] h-full bg-white rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_40px_100px_-30px_rgba(28,23,22,0.35)] flex flex-col-reverse md:grid md:grid-cols-2">',
  '<div className="bg-white h-[calc(100dvh-64px)] w-full flex flex-col-reverse md:grid md:grid-cols-2 font-sans selection:bg-[#EE930D]/20 overflow-hidden">\r\n      <div className="hidden">' // I am just replacing main with a hidden div to keep the ending tags valid!
);
// fallback for \n
f = f.replace(
  '<div className="bg-[#E9E2D3] h-[calc(100dvh-64px)] w-full flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-6 font-sans selection:bg-[#EE930D]/20">\n      <main className="w-full max-w-[1400px] h-full bg-white rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_40px_100px_-30px_rgba(28,23,22,0.35)] flex flex-col-reverse md:grid md:grid-cols-2">',
  '<div className="bg-white h-[calc(100dvh-64px)] w-full flex flex-col-reverse md:grid md:grid-cols-2 font-sans selection:bg-[#EE930D]/20 overflow-hidden">\n      <div className="hidden">'
);


f = f.replace(
  '<span className="text-3xl leading-none" aria-hidden="true">??</span>',
  '<img src={logoUrl} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />'
);

content = content.substring(0, startIdx) + f + content.substring(nextFnIdx);
fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Full bleed applied");
