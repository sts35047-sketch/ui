const fs = require('fs');
let txt = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Fix the main navigation bar to be responsive
const navRegex = /<div className="flex items-center gap-2">\s*<div className="inline-flex p-1 rounded-full bg-\[#F5F5F0\] border border-\[#E7E5E4\] dark:border-\[#27272a\] shadow-\[0_1px_0_0_white_inset\]">/;
const newNav = `<div className="flex-1 md:flex-none overflow-x-auto no-scrollbar flex items-center mx-2 md:mx-4 px-1 py-2">
            <div className="inline-flex p-1 rounded-full bg-[#F5F5F0] dark:bg-[#18181b] border border-[#E7E5E4] dark:border-[#27272a] shadow-[0_1px_0_0_white_inset] whitespace-nowrap">`;
txt = txt.replace(navRegex, newNav);

// Hide dark mode and help on very small screens to make room for tabs?
const headerRegex = /<div className="max-w-\[1200px\] mx-auto px-4 sm:px-6 h-\[64px\] flex items-center justify-between">/;
txt = txt.replace(headerRegex, `<div className="max-w-[1200px] mx-auto px-2 sm:px-6 h-[64px] flex items-center justify-between">`);

// 2. Add StudentMobileApp import
if (txt.indexOf("import StudentMobileApp") === -1) {
    txt = txt.replace("import logoUrl from './logo.png';", "import logoUrl from './logo.png';\nimport StudentMobileApp from './StudentMobileApp';");
}

// 3. Fix Flow4 wrapping for mobile dashboard
const flow4StartRegex = /return \(\s*<div className="min-h-screen bg-\[#F5F1E8\] font-sans selection:bg-\[#D97706\]\/20 flex flex-col pb-4">/;
const flow4StartReplacement = `return (
    <>
    <div className="hidden md:flex min-h-screen bg-[#F5F1E8] font-sans selection:bg-[#D97706]/20 flex-col pb-4">`;
txt = txt.replace(flow4StartRegex, flow4StartReplacement);

const flow4EndStr = `        </div>
      </div>
    </div>
  );
}`;
const flow4EndReplacement = `        </div>
      </div>
    </div>
    <div className="block md:hidden">
      <StudentMobileApp setActive={setActive} />
    </div>
    </>
  );
}`;
const flow4EndIdx = txt.lastIndexOf(flow4EndStr, txt.indexOf('function CollegeAdminDashboard'));
if (flow4EndIdx !== -1) {
    txt = txt.substring(0, flow4EndIdx) + flow4EndReplacement + txt.substring(flow4EndIdx + flow4EndStr.length);
} else {
    console.log("Could not find end of Flow4");
}

fs.writeFileSync('src/App.tsx', txt);
console.log("Navbar and mobile dashboard layout fixed.");
