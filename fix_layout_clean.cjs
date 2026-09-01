const fs = require('fs');
let txt = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Fix the main navigation bar to be responsive (top tabs)
const navRegex = /<div className="flex items-center gap-2">\s*<div className="inline-flex p-1 rounded-full bg-\[#F5F5F0\] border border-\[#E7E5E4\] dark:border-\[#27272a\] shadow-\[0_1px_0_0_white_inset\]">/;
const newNav = `<div className="flex-1 md:flex-none overflow-x-auto no-scrollbar flex items-center mx-2 md:mx-4 px-1 py-2">
            <div className="inline-flex p-1 rounded-full bg-[#F5F5F0] dark:bg-[#18181b] border border-[#E7E5E4] dark:border-[#27272a] shadow-[0_1px_0_0_white_inset] whitespace-nowrap">`;
txt = txt.replace(navRegex, newNav);

// 2. Hide Dark Mode & Help on very small screens to make room for tabs
const headerRegex = /<div className="max-w-\[1200px\] mx-auto px-4 sm:px-6 h-\[64px\] flex items-center justify-between">/;
txt = txt.replace(headerRegex, `<div className="max-w-[1200px] mx-auto px-2 sm:px-6 h-[64px] flex items-center justify-between">`);

// 3. Make the main wrapper for Flow4 conditional
txt = txt.replace(
  'return (\r\n    <div className="min-h-screen bg-[#F5F1E8] font-sans selection:bg-[#D97706]/20 flex flex-col pb-4">',
  `return (
    <>
    <div className="hidden md:flex min-h-screen bg-[#F5F1E8] font-sans selection:bg-[#D97706]/20 flex-col pb-4">`
);

txt = txt.replace(
  'return (\n    <div className="min-h-screen bg-[#F5F1E8] font-sans selection:bg-[#D97706]/20 flex flex-col pb-4">',
  `return (
    <>
    <div className="hidden md:flex min-h-screen bg-[#F5F1E8] font-sans selection:bg-[#D97706]/20 flex-col pb-4">`
);

// 4. Close the main wrapper for Flow4 and add StudentMobileApp
const endFlow4Str = `        </div>
      </div>
    </div>
  );
}`;
const endFlow4Replace = `        </div>
      </div>
    </div>
    <div className="block md:hidden">
      <StudentMobileApp setActive={setActive} />
    </div>
    </>
  );
}`;

let endIdx = txt.indexOf('function CollegeAdminDashboard');
let sub = txt.substring(endIdx - 100, endIdx);
if (sub.includes(endFlow4Str)) {
  txt = txt.substring(0, endIdx - 100) + sub.replace(endFlow4Str, endFlow4Replace) + txt.substring(endIdx);
} else {
  // Try CRLF
  const endFlow4StrCRLF = `        </div>\r\n      </div>\r\n    </div>\r\n  );\r\n}`;
  const endFlow4ReplaceCRLF = `        </div>\r\n      </div>\r\n    </div>\r\n    <div className="block md:hidden">\r\n      <StudentMobileApp setActive={setActive} />\r\n    </div>\r\n    </>\r\n  );\r\n}`;
  sub = txt.substring(endIdx - 150, endIdx);
  if (sub.includes(endFlow4StrCRLF)) {
    txt = txt.substring(0, endIdx - 150) + sub.replace(endFlow4StrCRLF, endFlow4ReplaceCRLF) + txt.substring(endIdx);
  } else {
    console.log("Could not find end of Flow4");
  }
}

// Add import
if (!txt.includes('import StudentMobileApp')) {
  txt = txt.replace("import logoUrl from './logo.png';", "import logoUrl from './logo.png';\nimport StudentMobileApp from './StudentMobileApp';");
}

fs.writeFileSync('src/App.tsx', txt);
console.log("Script executed!");
