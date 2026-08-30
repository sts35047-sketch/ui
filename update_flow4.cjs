const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Hide global navbar for active === 5
content = content.replace('{active !== 6 && (', '{active < 5 && (');

// 2. Remove width restriction for active === 5
content = content.replace('<main className={active === 6 ? "" : "max-w-[1200px] mx-auto"}>', '<main className={active === 6 || active === 5 ? "" : "max-w-[1200px] mx-auto"}>');

// 3. Update Flow4
const flow4Start = content.indexOf('function Flow4({ setActive }: any) {');
const nextFn = content.indexOf('function Flow5', flow4Start);
let f4 = content.substring(flow4Start, nextFn);

f4 = f4.replace(
  '<div className="border-x border-b border-[#E7E5E4] rounded-b-[16px] overflow-hidden mx-4 sm:mx-6 bg-white dark:bg-[#18181b] flex flex-col h-[calc(100vh-64px-32px)] ">',
  `<div className="min-h-screen bg-[#F5F1E8] font-sans selection:bg-[#D97706]/20 flex flex-col pb-4">
      {/* Top Navbar */}
      <div className="h-[80px] flex items-center justify-between px-4 sm:px-8 shrink-0 z-50 sticky top-0 bg-[#F5F1E8]/80 backdrop-blur-xl border-b border-transparent">
        <div className="flex items-center gap-3">
          <img src={logoUrl} alt="Logo" className="w-10 h-10 object-contain" />
          <div>
            <div className="serif text-[16px] font-bold text-[#1C1917] leading-tight hidden sm:block">EduFeedback Pro</div>
            <div className="text-[9px] font-bold text-[#A8A29E] tracking-widest hidden sm:flex items-center gap-1.5 mt-0.5 uppercase">
              <span>EPCET</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="mono text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#E7E5E4] text-[#78716C] hidden sm:inline-flex items-center gap-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" /> Live
          </span>
          <button 
            onClick={() => setActive(0)} 
            className="px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#DC2626] bg-white hover:bg-[#FEF2F2] transition-colors border border-[#FECACA] shadow-sm"
          >
            Logout
          </button>
        </div>
      </div>
      
      <div className="border border-[#E7E5E4] rounded-[16px] overflow-hidden mx-4 sm:mx-8 bg-white dark:bg-[#18181b] flex flex-col flex-1 shadow-sm h-[calc(100vh-100px)]">`
);

// We need to add an extra closing div at the end of Flow4 return
f4 = f4.replace(
  '    </div>\n  );\n}',
  '    </div>\n    </div>\n  );\n}'
);

content = content.substring(0, flow4Start) + f4 + content.substring(nextFn);
fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('Done');
