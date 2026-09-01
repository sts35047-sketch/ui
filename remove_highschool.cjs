const fs = require('fs');
let txt = fs.readFileSync('src/App.tsx', 'utf8');

const target = `<span className="hidden sm:inline-flex h-8 px-3 rounded-full text-[12px] items-center text-[#78716C]">High School</span>`;
if (txt.includes(target)) {
    txt = txt.replace(target, '');
    fs.writeFileSync('src/App.tsx', txt);
    console.log("Removed High School span.");
} else {
    console.log("Could not find the target span.");
}
