const fs = require('fs');

let txt = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Fix mobile layout for top nav
const navRegex = /<div className="flex items-center gap-2">\s*<div className="inline-flex p-1 rounded-full bg-\[#F5F5F0\] border border-\[#E7E5E4\] dark:border-\[#27272a\] shadow-\[0_1px_0_0_white_inset\]">/;
const newNav = `<div className="flex-1 md:flex-none overflow-x-auto no-scrollbar flex items-center mx-2 md:mx-4 px-1 py-2">
            <div className="inline-flex p-1 rounded-full bg-[#F5F5F0] dark:bg-[#18181b] border border-[#E7E5E4] dark:border-[#27272a] shadow-[0_1px_0_0_white_inset] whitespace-nowrap">`;
txt = txt.replace(navRegex, newNav);

const headerRegex = /<div className="max-w-\[1200px\] mx-auto px-4 sm:px-6 h-\[64px\] flex items-center justify-between">/;
txt = txt.replace(headerRegex, `<div className="max-w-[1200px] mx-auto px-2 sm:px-6 h-[64px] flex items-center justify-between">`);

// 2. Wrap Flow4 for mobile
const flow4StartIdx = txt.indexOf('function Flow4({');
const returnIdx = txt.indexOf('return (', flow4StartIdx);
const divIdx = txt.indexOf('<div className="min-h-screen bg-[#F5F1E8]', returnIdx);
if(divIdx !== -1) {
  txt = txt.substring(0, divIdx) + '<>\n    <div className="hidden md:flex min-h-screen bg-[#F5F1E8] font-sans selection:bg-[#D97706]/20 flex-col pb-4">' + txt.substring(divIdx + '<div className="min-h-screen bg-[#F5F1E8] font-sans selection:bg-[#D97706]/20 flex flex-col pb-4">'.length);
}

const flow4EndStr = `        </div>
      </div>
    </div>
  );
}

function CollegeAdminDashboard`;
const flow4EndStrCRLF = `        </div>\r\n      </div>\r\n    </div>\r\n  );\r\n}\r\n\r\nfunction CollegeAdminDashboard`;
const newEndStr = `        </div>
      </div>
    </div>
    <div className="block md:hidden">
      <StudentMobileApp setActive={setActive} />
    </div>
    </>
  );
}

function CollegeAdminDashboard`;

if (txt.includes(flow4EndStr)) {
  txt = txt.replace(flow4EndStr, newEndStr);
} else if (txt.includes(flow4EndStrCRLF)) {
  txt = txt.replace(flow4EndStrCRLF, newEndStr.replace(/\n/g, '\r\n'));
} else {
  // Let's try Flow5
  const flow5StrCRLF = `        </div>\r\n      </div>\r\n    </div>\r\n  );\r\n}\r\n\r\nfunction Flow5`;
  const flow5StrLF = `        </div>\n      </div>\n    </div>\n  );\n}\n\nfunction Flow5`;
  if (txt.includes(flow5StrCRLF)) {
    txt = txt.replace(flow5StrCRLF, newEndStr.replace('CollegeAdminDashboard', 'Flow5').replace(/\n/g, '\r\n'));
  } else if (txt.includes(flow5StrLF)) {
    txt = txt.replace(flow5StrLF, newEndStr.replace('CollegeAdminDashboard', 'Flow5'));
  } else {
    console.log("Failed to find end of flow 4");
  }
}

// 3. Add imports
if (!txt.includes('import StudentMobileApp')) {
  txt = txt.replace("import logoUrl from './logo.png';", "import logoUrl from './logo.png';\nimport StudentMobileApp from './StudentMobileApp';");
}

fs.writeFileSync('src/App.tsx', txt);
console.log('App restored and Flow4 fixed!');
