const fs = require('fs');

let txt = fs.readFileSync('src/App.tsx', 'utf8');

const startStr = '{/* Merged Welcome & University Reg Card */}';
const endStr = '              {/* Student ID Card */}';

const startIdx = txt.indexOf(startStr);
const endIdx = txt.indexOf(endStr);

if (startIdx === -1 || endIdx === -1) {
    console.log("Could not find start or end index.");
    process.exit(1);
}

const replacement = `{/* Merged Welcome & University Reg Card */}
              <div className="lg:col-span-2 bg-white dark:bg-[#18181b] rounded-[20px] border border-[#E7E5E4] dark:border-[#27272a] p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row gap-6 justify-between relative overflow-hidden group cursor-pointer">
                {/* Accent bar */}
                <div className="absolute left-0 top-6 bottom-6 w-1.5 bg-[#D97706] rounded-r-full" />
                
                {/* Left side: Welcome Message */}
                <div className="flex flex-col justify-center max-w-[400px] pl-3">
                  <h2 className="serif text-[24px] tracking-tight mb-1.5 text-[#1C1917] font-semibold group-hover:text-[#D97706] transition-colors">Welcome back, Karunya! 👋</h2>
                  <p className="text-[13px] text-[#78716C] leading-relaxed mb-4">Select any module to view analytics, submit feedback, or manage your profile. Your data is entirely anonymous and secure.</p>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F5F0] border border-[#E7E5E4] dark:border-[#27272a] text-[11px] text-[#57534E] font-medium shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span> 3 of 5 tasks complete
                    </span>
                  </div>
                </div>
                
                {/* Right side: University Reg */}
                <div className="flex flex-col justify-center shrink-0 border-t md:border-t-0 md:border-l border-[#E7E5E4] dark:border-[#27272a] pt-4 md:pt-0 md:pl-8 relative">
                  <div className="mono text-[10px] text-[#DB2777] font-bold tracking-widest flex items-center gap-1.5 mb-2 uppercase">
                    <span className="text-[14px]">🎓</span> University Reg
                  </div>
                  <div className="text-[20px] font-bold text-[#1C1917] mb-0.5">1EP24CS001</div>
                  <div className="text-[12px] text-[#78716C] font-medium mb-4">CSE • Sem 1 • Sec A</div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DCFCE7] border border-[#BBF7D0] text-[#059669] text-[11px] font-bold shadow-sm group-hover:bg-[#D1FAE5] group-hover:scale-105 transition-all">
                      ✓ Eligible • 78% attendance
                    </span>
                  </div>
                </div>
              </div>

`;

txt = txt.substring(0, startIdx) + replacement + txt.substring(endIdx);
fs.writeFileSync('src/App.tsx', txt);
console.log("Successfully resized and added hover effects to the merged card!");
