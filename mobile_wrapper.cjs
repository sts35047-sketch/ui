const fs = require('fs');
let txt = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Convert Top Navigation bar to horizontal scroll
const navRegex = /<div className="flex items-center gap-2">\s*<div className="inline-flex p-1 rounded-full bg-\[#F5F5F0\] border border-\[#E7E5E4\] dark:border-\[#27272a\] shadow-\[0_1px_0_0_white_inset\]">/;
const newNav = `<div className="flex-1 md:flex-none overflow-x-auto no-scrollbar flex items-center mx-2 md:mx-4 px-1 py-2">
            <div className="inline-flex p-1 rounded-full bg-[#F5F5F0] dark:bg-[#18181b] border border-[#E7E5E4] dark:border-[#27272a] shadow-[0_1px_0_0_white_inset] whitespace-nowrap">`;
txt = txt.replace(navRegex, newNav);

const headerRegex = /<div className="max-w-\[1200px\] mx-auto px-4 sm:px-6 h-\[64px\] flex items-center justify-between">/;
txt = txt.replace(headerRegex, `<div className="max-w-[1200px] mx-auto px-2 sm:px-6 h-[64px] flex items-center justify-between">`);

// 2. Wrap Flow4. We'll use regex to precisely find the start and end of Flow4's return statement.
const flow4Start = txt.indexOf('function Flow4({');
if (flow4Start !== -1) {
    const returnStart = txt.indexOf('return (', flow4Start);
    const divStart = txt.indexOf('<div className="min-h-screen bg-[#F5F1E8]', returnStart);
    
    if (divStart !== -1) {
        // Replace the opening div with fragments
        txt = txt.substring(0, divStart) + '<>\n    <div className="hidden md:flex min-h-screen bg-[#F5F1E8] font-sans selection:bg-[#D97706]/20 flex-col pb-4">' + txt.substring(divStart + '<div className="min-h-screen bg-[#F5F1E8] font-sans selection:bg-[#D97706]/20 flex flex-col pb-4">'.length);
        
        // Find the matching end of Flow4
        // Flow4 is followed by Flow5
        const flow5Start = txt.indexOf('function Flow5({', flow4Start);
        if (flow5Start !== -1) {
            // Find the last "}" before function Flow5
            const lastBraceBeforeFlow5 = txt.lastIndexOf('}', flow5Start);
            // Find the "return (" closing ");"
            const endReturn = txt.lastIndexOf(');', lastBraceBeforeFlow5);
            
            if (endReturn !== -1) {
                // We want to insert the mobile wrapper right before ");"
                const insertStr = `
    </div>
    <div className="block md:hidden">
      <StudentMobileApp setActive={setActive} />
    </div>
    </>`;
                txt = txt.substring(0, endReturn) + insertStr + '\n  ' + txt.substring(endReturn);
            }
        }
    }
}

// 3. Add import
if (!txt.includes('import StudentMobileApp')) {
  txt = txt.replace("import logoUrl from './logo.png';", "import logoUrl from './logo.png';\nimport StudentMobileApp from './StudentMobileApp';");
}

fs.writeFileSync('src/App.tsx', txt);
console.log('Mobile layout applied safely.');
