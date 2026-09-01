const fs = require('fs');

let txt = fs.readFileSync('src/App.tsx', 'utf8');

const profileStart = txt.indexOf("{studentTab === 'My Profile' && (");
const profileEnd = txt.indexOf("{studentTab === 'Subject Feedback'", profileStart);

if (profileStart === -1 || profileEnd === -1) {
    console.log("Could not find My Profile block! Start:", profileStart, "End:", profileEnd);
    process.exit(1);
}

// Rewind profileEnd to include the spaces and `          )}\n\n`
const actualEnd = txt.lastIndexOf("          )}\n\n", profileEnd);

const replacement = `{studentTab === 'My Profile' && (
            <div className="bg-[#fdf8f0] min-h-[70vh] p-4 md:p-8 rounded-[32px] border border-[#e8ddd0] mb-8 shadow-sm flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#e8ddd0]/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="w-full max-w-[340px] bg-[#fffcf6] border-2 border-[#111] rounded-[24px] p-6 shadow-[6px_6px_0px_#111] rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="font-serif text-[20px] font-bold text-[#111]">Student ID</div>
                  <div className="w-10 h-10 rounded-full bg-[#fff7eb] border border-[#c45a3c] text-[#c45a3c] flex items-center justify-center text-[9px] font-mono font-bold uppercase rotate-12">
                    Valid
                  </div>
                </div>

                <div className="mb-6 text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#111] mb-4 border-4 border-[#fffcf6] shadow-[0_0_0_2px_#111] overflow-hidden relative">
                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Karunya&backgroundColor=fdf8f0" alt="Avatar" className="w-full h-full object-cover mix-blend-screen opacity-80" />
                  </div>
                  <h2 className="font-serif text-[24px] text-[#111] leading-tight mb-1">Karunya KP</h2>
                  <p className="text-[12px] font-mono text-[#78716C]">Computer Science & Engineering</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-[#111]/10">
                    <span className="text-[10px] uppercase tracking-widest text-[#A8A29E] font-bold">USN</span>
                    <span className="font-mono text-[12px] text-[#111] font-bold">1EP24CS001</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#111]/10">
                    <span className="text-[10px] uppercase tracking-widest text-[#A8A29E] font-bold">Term</span>
                    <span className="font-mono text-[12px] text-[#111] font-bold">5th Semester, 2024-25</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#A8A29E] font-bold">Status</span>
                    <span className="font-mono text-[12px] text-[#059669] font-bold">● Active</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t-2 border-[#111] border-dashed text-center">
                  <div className="font-serif text-[11px] italic text-[#78716C] mb-2">"Attendance is a ledger, not a percentage."</div>
                  <img src="https://api.dicebear.com/7.x/initials/svg?seed=EP&backgroundColor=111111&textColor=ffffff" className="w-8 h-8 rounded-md mx-auto grayscale" alt="Barcode mock" />
                </div>
              </div>
            </div>
          )}

`;

txt = txt.substring(0, profileStart) + replacement + txt.substring(profileEnd);
fs.writeFileSync('src/App.tsx', txt);
console.log("Successfully resized ID card.");
