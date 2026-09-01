const fs = require('fs');
let appTsx = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Replace Empty State Card with Actual High Marks
const emptyStateStart = appTsx.indexOf('{/* Empty State Card */}');
const emptyStateEnd = appTsx.indexOf('{/* Info Footer */}');

if (emptyStateStart !== -1 && emptyStateEnd !== -1) {
  const marksHtml = `{/* Marks List */}
      <div className="flex-1 flex flex-col gap-3 mb-6 animate-[fadeIn_0.3s_ease]">
        {[
          { code: '21CS51', name: 'Software Engineering', marks: [48, 49, 50], avg: '49' },
          { code: '21CS52', name: 'Computer Networks', marks: [49, 50, 48], avg: '49' },
          { code: '21CS53', name: 'Database Management', marks: [50, 49, 50], avg: '49.5' },
          { code: '21CS54', name: 'Automata Theory', marks: [47, 49, 50], avg: '48.5' },
          { code: '21CS55', name: 'Cloud Computing', marks: [48, 49, 50], avg: '49' },
        ].map(sub => (
          <div key={sub.code} className="bg-white border border-[#E7E5E4] rounded-[12px] p-4 flex items-center justify-between hover:border-[#1C1917]/20 transition-colors shadow-sm hover:shadow-md cursor-default">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F5F5F0] flex items-center justify-center text-[12px] font-bold text-[#1C1917]">{sub.code.slice(-2)}</div>
              <div>
                <div className="text-[14px] font-bold text-[#1C1917]">{sub.name}</div>
                <div className="text-[11px] text-[#A8A29E] mono mt-0.5">{sub.code}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="hidden sm:flex gap-6 text-[12px]">
                <div className="flex flex-col items-center"><span className="text-[#A8A29E] mb-1">IA 1</span><span className="font-medium text-[#1C1917]">{sub.marks[0]}</span></div>
                <div className="flex flex-col items-center"><span className="text-[#A8A29E] mb-1">IA 2</span><span className="font-medium text-[#1C1917]">{sub.marks[1]}</span></div>
                <div className="flex flex-col items-center"><span className="text-[#A8A29E] mb-1">IA 3</span><span className="font-medium text-[#1C1917]">{sub.marks[2]}</span></div>
              </div>
              <div className="h-8 w-px bg-[#E7E5E4] hidden sm:block"></div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-[#A8A29E] mb-1 font-bold tracking-wider">CIE</span>
                <div className="text-[16px] font-bold text-[#059669] flex items-baseline gap-1">
                  {sub.avg}<span className="text-[12px] text-[#A8A29E]">/50</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      `;
  appTsx = appTsx.substring(0, emptyStateStart) + marksHtml + appTsx.substring(emptyStateEnd);
}

// 2. Add onDoubleClick to Semester Cards
const semesterCardRegex = /<div\s+key=\{s\}\s+onClick=\{[^}]+\}\s+className=\{[^}]+\}\s+>/g;
appTsx = appTsx.replace(semesterCardRegex, (match) => {
  return match.replace(
    /onClick=\{\(\) => setSem\('Sem ' \+ s\)\}/,
    `onClick={() => setSem('Sem ' + s)}\n                    onDoubleClick={() => { setSem('Sem ' + s); setStep(2); }}`
  );
});

fs.writeFileSync('src/App.tsx', appTsx);
console.log('Done adding marks and double click');
