const fs = require('fs');

let txt = fs.readFileSync('src/App.tsx', 'utf8');

const startStr = '              {/* Welcome Card */}';
const endStr = '              {/* Student ID Card */}';

const startIdx = txt.indexOf(startStr);
const endIdx = txt.indexOf(endStr);

if (startIdx === -1 || endIdx === -1) {
    console.log("Could not find start or end index.");
    process.exit(1);
}

const replacement = `{/* Merged Welcome & University Reg Card */}
              <div className="lg:col-span-2 bg-white dark:bg-[#18181b] rounded-[24px] border border-[#E7E5E4] dark:border-[#27272a] p-8 shadow-sm flex flex-col md:flex-row gap-8 justify-between relative overflow-hidden group">
                {/* Accent bar */}
                <div className="absolute left-0 top-8 bottom-8 w-1.5 bg-[#D97706] rounded-r-full" />
                
                {/* Left side: Welcome Message */}
                <div className="flex flex-col justify-center max-w-[420px] pl-4">
                  <h2 className="serif text-[28px] tracking-tight mb-2 text-[#1C1917] font-semibold">Welcome back, Karunya! 👋</h2>
                  <p className="text-[14px] text-[#78716C] leading-relaxed mb-6">Select any module to view analytics, submit feedback, or manage your profile. Your data is entirely anonymous and secure.</p>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5F5F0] border border-[#E7E5E4] dark:border-[#27272a] text-[12px] text-[#57534E] font-medium shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span> 3 of 5 tasks complete
                    </span>
                  </div>
                </div>
                
                {/* Right side: University Reg */}
                <div className="flex flex-col justify-center shrink-0 border-t md:border-t-0 md:border-l border-[#E7E5E4] dark:border-[#27272a] pt-6 md:pt-0 md:pl-10 relative">
                  <div className="mono text-[11px] text-[#DB2777] font-bold tracking-widest flex items-center gap-2 mb-3 uppercase">
                    <span className="text-[16px]">🎓</span> University Reg
                  </div>
                  <div className="text-[22px] font-bold text-[#1C1917] mb-0.5">1EP24CS001</div>
                  <div className="text-[13px] text-[#78716C] font-medium mb-6">CSE • Sem 1 • Sec A</div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#DCFCE7] border border-[#BBF7D0] text-[#059669] text-[12px] font-bold shadow-sm group-hover:scale-105 transition-transform">
                      ✓ Eligible • 78% attendance
                    </span>
                  </div>
                </div>
              </div>

`;

txt = txt.substring(0, startIdx) + replacement + txt.substring(endIdx);
fs.writeFileSync('src/App.tsx', txt);
console.log("Successfully merged the cards!");
