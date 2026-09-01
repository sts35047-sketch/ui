const fs = require('fs');

let txt = fs.readFileSync('src/App.tsx', 'utf8');

const targetBlock = `{/* Welcome Card */}
              <div className="lg:col-span-1 bg-white dark:bg-[#18181b] rounded-[20px] border border-[#E7E5E4] dark:border-[#27272a] p-6 shadow-sm relative overflow-hidden flex flex-col">
                <div className="absolute left-0 top-6 bottom-6 w-1 bg-[#D97706] rounded-r-full" />
                <h2 className="serif text-[24px] tracking-tight mb-3 pl-3 text-[#1C1917]">Welcome back, Student 1! 👋</h2>
                <p className="text-[13px] text-[#78716C] leading-relaxed mb-6 pl-3">Select any module to view analytics, submit feedback, or manage profile. Your data is anonymous and secure.</p>
                <div className="mt-auto pl-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5F5F0] border border-[#E7E5E4] dark:border-[#27272a] text-[11px] text-[#57534E] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span> 3 of 5 tasks complete
                  </span>
                </div>
              </div>

              {/* University Reg Card */}
              <div className="bg-white dark:bg-[#18181b] rounded-[20px] border border-[#E7E5E4] dark:border-[#27272a] p-6 shadow-sm flex flex-col">
                 <div className="mono text-[10px] text-[#DB2777] font-bold tracking-widest flex items-center gap-2 mb-4 uppercase">
                   <span className="text-[14px]">🎓</span> University Reg
                 </div>
                 <div className="text-[18px] font-bold text-[#1C1917]">1EP24CS001</div>
                 <div className="text-[12px] text-[#78716C] mt-1 font-medium">CSE • Sem 1 • Sec A</div>
                 <div className="mt-auto pt-8">
                   <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DCFCE7] border border-[#BBF7D0] text-[#059669] text-[11px] font-bold">
                     ✓ Eligible • 78% attendance
                   </div>
                 </div>
              </div>`;

// Fallback matching logic based on Windows CRLF vs Unix LF
let index = txt.indexOf(targetBlock);
if (index === -1) {
    const fallbackTarget = targetBlock.replace(/\r\n/g, '\n');
    index = txt.indexOf(fallbackTarget);
    if (index === -1) {
        console.log("Could not find the block to replace.");
        process.exit(1);
    }
}

const replacement = `{/* Merged Welcome & University Reg Card */}
              <div className="lg:col-span-2 bg-white dark:bg-[#18181b] rounded-[24px] border border-[#E7E5E4] dark:border-[#27272a] p-8 shadow-sm flex flex-col md:flex-row gap-8 justify-between relative overflow-hidden">
                <div className="absolute left-0 top-8 bottom-8 w-1.5 bg-[#D97706] rounded-r-full" />
                <div className="flex flex-col justify-center max-w-[420px] pl-4">
                  <h2 className="serif text-[28px] tracking-tight mb-2 text-[#1C1917] font-semibold">Welcome back, Karunya! 👋</h2>
                  <p className="text-[14px] text-[#78716C] leading-relaxed mb-6">Select any module to view analytics, submit feedback, or manage your profile. Your data is entirely anonymous and secure.</p>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5F5F0] border border-[#E7E5E4] dark:border-[#27272a] text-[12px] text-[#57534E] font-medium shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-[#10B981]"></span> 3 of 5 tasks complete
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center shrink-0 border-t md:border-t-0 md:border-l border-[#E7E5E4] dark:border-[#27272a] pt-6 md:pt-0 md:pl-10 relative">
                  <div className="mono text-[11px] text-[#DB2777] font-bold tracking-widest flex items-center gap-2 mb-3 uppercase">
                    <span className="text-[16px]">🎓</span> University Reg
                  </div>
                  <div className="text-[22px] font-bold text-[#1C1917]">1EP24CS001</div>
                  <div className="text-[13px] text-[#78716C] mt-1 font-medium mb-6">CSE • Sem 1 • Sec A</div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#DCFCE7] border border-[#BBF7D0] text-[#059669] text-[12px] font-bold shadow-sm">
                      ✓ Eligible • 98% attendance
                    </span>
                  </div>
                </div>
              </div>`;

txt = txt.replace(targetBlock, replacement).replace(targetBlock.replace(/\r\n/g, '\n'), replacement);
fs.writeFileSync('src/App.tsx', txt);
console.log('Merged cards successfully.');
