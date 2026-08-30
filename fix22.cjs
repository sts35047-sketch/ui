const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Header wrapper has `justify-between`
// Left section
content = content.replace(
  '<div className="flex items-center gap-3">\n            <img src={logoUrl}',
  '<div className="flex items-center gap-3 flex-1">\n            <img src={logoUrl}'
);

// Center section (tabs)
content = content.replace(
  '<div className="flex items-center gap-2">\n            <div className="inline-flex p-1 rounded-full',
  '<div className="flex items-center justify-center">\n            <div className="inline-flex p-1 rounded-full'
);

// Right section
content = content.replace(
  '<div className="hidden md:flex items-center gap-4 text-[13px]">\n            <span className="text-[#78716C]',
  '<div className="hidden md:flex items-center justify-end gap-4 text-[13px] flex-1">\n            <span className="text-[#78716C]'
);

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Header navigation perfectly centered");
