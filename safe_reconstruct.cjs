const fs = require('fs');

let txt = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add mobile layout for top nav
const navRegex = /<div className="flex items-center gap-2">\s*<div className="inline-flex p-1 rounded-full bg-\[#F5F5F0\] border border-\[#E7E5E4\] dark:border-\[#27272a\] shadow-\[0_1px_0_0_white_inset\]">/;
const newNav = `<div className="flex-1 md:flex-none overflow-x-auto no-scrollbar flex items-center mx-2 md:mx-4 px-1 py-2">
            <div className="inline-flex p-1 rounded-full bg-[#F5F5F0] dark:bg-[#18181b] border border-[#E7E5E4] dark:border-[#27272a] shadow-[0_1px_0_0_white_inset] whitespace-nowrap">`;
txt = txt.replace(navRegex, newNav);

const headerRegex = /<div className="max-w-\[1200px\] mx-auto px-4 sm:px-6 h-\[64px\] flex items-center justify-between">/;
txt = txt.replace(headerRegex, `<div className="max-w-[1200px] mx-auto px-2 sm:px-6 h-[64px] flex items-center justify-between">`);

// 2. Add StudentMobileApp import
if (!txt.includes('import StudentMobileApp')) {
  txt = txt.replace("import logoUrl from './logo.png';", "import logoUrl from './logo.png';\nimport StudentMobileApp from './StudentMobileApp';");
}

// 3. Find Flow4 cleanly and add the mobile app
const flow4StartIdx = txt.indexOf('function Flow4({');
if (flow4StartIdx !== -1) {
    const returnIdx = txt.indexOf('return (', flow4StartIdx);
    const divIdx = txt.indexOf('<div className="min-h-screen bg-[#F5F1E8]', returnIdx);
    
    // add `<>` wrapper
    txt = txt.substring(0, divIdx) + '<>\n    <div className="hidden md:flex min-h-screen bg-[#F5F1E8] font-sans selection:bg-[#D97706]/20 flex-col pb-4">' + txt.substring(divIdx + '<div className="min-h-screen bg-[#F5F1E8] font-sans selection:bg-[#D97706]/20 flex flex-col pb-4">'.length);
    
    // finding the end of Flow4 properly. Flow4 ends right before Flow5.
    const flow5StartIdx = txt.indexOf('function Flow5({');
    if (flow5StartIdx !== -1) {
        let lastBrace = txt.lastIndexOf('}', flow5StartIdx);
        let lastSemi = txt.lastIndexOf(');', lastBrace);
        
        let endReplacement = `  </div>
    <div className="block md:hidden">
      <StudentMobileApp setActive={setActive} />
    </div>
    </>
  );`;
        
        let lastDivStr = txt.lastIndexOf('</div>', lastSemi);
        if (lastDivStr !== -1) {
             txt = txt.substring(0, lastDivStr) + endReplacement + txt.substring(lastSemi + 2);
        }
    }
}

fs.writeFileSync('src/App.tsx', txt);
console.log('App completely processed into App.tsx successfully');
