const fs = require('fs');
let txt = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add 'My Profile' to sidebar tabs if not there
if (txt.includes('const dashItemsData = [')) {
  if (!txt.includes("{ name: 'My Profile'")) {
    txt = txt.replace(
      "const dashItemsData = [",
      "const dashItemsData = [\n  { name: 'My Profile', keywords: 'profile id student details usn' },"
    );
  }
}

// 2. Add CIE Marks and My Profile views before Subject Feedback
const insertionPoint = "{studentTab === 'Subject Feedback' && <SubjectFeedbackFlow />}";
const newViews = `
          {studentTab === 'CIE Marks' && (
            <div className="bg-[#fdf8f0] min-h-[80vh] p-8 md:p-12 rounded-[32px] border border-[#e8ddd0] mb-8 shadow-sm">
              <div className="mb-12 flex flex-col sm:flex-row justify-between items-start gap-6">
                <div>
                  <div className="text-[10px] text-[#A8A29E] tracking-[0.2em] uppercase font-bold mb-4">CIE Sheet — Internal Assessment</div>
                  <div className="flex items-baseline gap-4">
                    <h2 className="font-serif text-[42px] text-[#111] leading-none">Marks Ledger</h2>
                    <span className="text-[14px] text-[#78716C] font-mono">Sem 5</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#e8ddd0] bg-[#fffcf6] text-[10px] font-bold tracking-widest text-[#111] uppercase shadow-sm">
                  ★ SEM 5 • CURRENT
                </div>
              </div>

              <div className="w-full overflow-x-auto no-scrollbar">
                <div className="min-w-[600px]">
                  <div className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr] text-[10px] text-[#A8A29E] font-bold tracking-[0.15em] uppercase pb-4 border-b border-[#111]/10">
                    <div>Subject</div>
                    <div className="text-center">I1 /20</div>
                    <div className="text-center">I2 /20</div>
                    <div className="text-center">Assign</div>
                    <div className="text-right pr-4">Total /50</div>
                  </div>

                  {[
                    { id: 1, name: 'Database Systems', code: 'CS501', i1: 18, i2: 19, a: 9, t: 46 },
                    { id: 2, name: 'Operating Systems', code: 'CS502', i1: 16, i2: 17, a: 8, t: 41 },
                    { id: 3, name: 'Computer Networks', code: 'CS503', i1: 19, i2: 18, a: 10, t: 47 },
                    { id: 4, name: 'Software Engineering', code: 'CS504', i1: 15, i2: 16, a: 9, t: 40 },
                    { id: 5, name: 'AI Foundations', code: 'CS505', i1: 17, i2: 18, a: 8, t: 43 },
                  ].map((sub, idx) => (
                    <div key={sub.id} className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr] items-center py-6 border-b border-[#111]/5 hover:bg-white/40 transition-colors -mx-4 px-4 rounded-xl cursor-default">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full border border-[#e8ddd0] bg-white/50 flex items-center justify-center text-[11px] text-[#78716C] font-mono">{sub.id}</div>
                        <div>
                          <div className="font-serif text-[17px] text-[#111] mb-1">{sub.name}</div>
                          <div className="text-[11px] text-[#A8A29E] font-mono">{sub.code}</div>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className={sub.id === 1 ? "w-8 h-8 rounded-full bg-[#111] text-[#fdf8f0] flex items-center justify-center text-[13px] font-bold shadow-md" : "text-[14px] text-[#111] font-medium"}>{sub.i1}</div>
                      </div>
                      <div className="text-center text-[14px] text-[#111] font-medium">{sub.i2}</div>
                      <div className="text-center text-[14px] text-[#111] font-medium">{sub.a}</div>
                      <div className="text-right pr-4 font-bold text-[17px] text-[#111]">{sub.t} <span className="text-[#A8A29E] text-[12px] font-normal">/50</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {studentTab === 'My Profile' && (
            <div className="bg-[#fdf8f0] min-h-[80vh] p-8 md:p-12 rounded-[32px] border border-[#e8ddd0] mb-8 shadow-sm flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#e8ddd0]/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="w-full max-w-md bg-[#fffcf6] border-2 border-[#111] rounded-[24px] p-8 shadow-[8px_8px_0px_#111] rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="flex justify-between items-start mb-10">
                  <div className="font-serif text-[24px] font-bold text-[#111]">Student ID</div>
                  <div className="w-12 h-12 rounded-full bg-[#fff7eb] border border-[#c45a3c] text-[#c45a3c] flex items-center justify-center text-[10px] font-mono font-bold uppercase rotate-12">
                    Valid
                  </div>
                </div>

                <div className="mb-10 text-center">
                  <div className="w-28 h-28 mx-auto rounded-full bg-[#111] mb-6 border-4 border-[#fffcf6] shadow-[0_0_0_2px_#111] overflow-hidden relative">
                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Karunya&backgroundColor=fdf8f0" alt="Avatar" className="w-full h-full object-cover mix-blend-screen opacity-80" />
                  </div>
                  <h2 className="font-serif text-[32px] text-[#111] leading-tight mb-2">Karunya A.</h2>
                  <p className="text-[14px] font-mono text-[#78716C]">Computer Science & Engineering</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-[#111]/10">
                    <span className="text-[10px] uppercase tracking-widest text-[#A8A29E] font-bold">USN</span>
                    <span className="font-mono text-[13px] text-[#111] font-bold">1EP24CS001</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#111]/10">
                    <span className="text-[10px] uppercase tracking-widest text-[#A8A29E] font-bold">Term</span>
                    <span className="font-mono text-[13px] text-[#111] font-bold">5th Semester, 2024-25</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-[10px] uppercase tracking-widest text-[#A8A29E] font-bold">Status</span>
                    <span className="font-mono text-[13px] text-[#059669] font-bold">● Active</span>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t-2 border-[#111] border-dashed text-center">
                  <div className="font-serif text-[12px] italic text-[#78716C] mb-2">"Attendance is a ledger, not a percentage."</div>
                  <img src="https://api.dicebear.com/7.x/initials/svg?seed=EP&backgroundColor=111111&textColor=ffffff" className="w-8 h-8 rounded-md mx-auto grayscale" alt="Barcode mock" />
                </div>
              </div>
            </div>
          )}

`;

if (txt.includes(insertionPoint)) {
  txt = txt.replace(insertionPoint, newViews + insertionPoint);
  fs.writeFileSync('src/App.tsx', txt);
  console.log('Successfully injected CIE Marks and My Profile views.');
} else {
  console.log('Could not find insertion point.');
}
