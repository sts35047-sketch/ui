const fs = require('fs');
let txt = fs.readFileSync('src/App.tsx', 'utf8');

// Inject CIEMarksFlow component before SubjectFeedbackFlow
const subjectFeedbackFlowIdx = txt.indexOf('function SubjectFeedbackFlow');

const cieMarksComponent = `function CIEMarksFlow() {
  const [view, setView] = useState('Single Curve');
  const [sem, setSem] = useState('Sem 5');
  const [assessment, setAssessment] = useState('All');

  return (
    <div className="bg-white dark:bg-[#18181b] rounded-[16px] border border-[#E7E5E4] dark:border-[#27272a] p-8 min-h-[600px] flex flex-col">
      {/* Header */}
      <div className="w-full flex justify-between items-start mb-8 border-b border-[#E7E5E4] pb-6">
        <div>
          <h2 className="text-[20px] font-bold text-[#1C1917]">CIE Marks</h2>
          <div className="text-[12px] text-[#78716C] mt-1">Continuous Internal Evaluation</div>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-[#059669]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#059669]"></div>
          System operational
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex items-center bg-white border border-[#E7E5E4] rounded-full p-1 w-fit shadow-sm">
          <button 
            onClick={() => setView('Single Curve')}
            className={"px-5 py-1.5 rounded-full text-[13px] font-medium transition-all " + (view === 'Single Curve' ? 'bg-[#1C1917] text-white' : 'text-[#57534E] hover:bg-[#F5F5F0]')}
          >
            Single Curve
          </button>
          <button 
            onClick={() => setView('Overlay')}
            className={"px-5 py-1.5 rounded-full text-[13px] font-medium transition-all " + (view === 'Overlay' ? 'bg-[#1C1917] text-white' : 'text-[#57534E] hover:bg-[#F5F5F0]')}
          >
            Overlay
          </button>
        </div>

        <div className="flex items-center gap-3">
          <select 
            value={sem} 
            onChange={(e) => setSem(e.target.value)}
            className="appearance-none bg-white border border-[#E7E5E4] rounded-[8px] px-4 py-2 text-[13px] font-medium text-[#1C1917] cursor-pointer focus:outline-none focus:border-[#1C1917]"
          >
            {[1,2,3,4,5,6,7,8].map(s => <option key={s}>Sem {s}</option>)}
          </select>
          <select 
            value={assessment} 
            onChange={(e) => setAssessment(e.target.value)}
            className="appearance-none bg-white border border-[#E7E5E4] rounded-[8px] px-4 py-2 text-[13px] font-medium text-[#1C1917] cursor-pointer focus:outline-none focus:border-[#1C1917]"
          >
            <option value="All">Assessment — All</option>
            <option value="IA1">Assessment — IA1</option>
            <option value="IA2">Assessment — IA2</option>
            <option value="IA3">Assessment — IA3</option>
          </select>
        </div>
      </div>

      {/* Empty State Card */}
      <div className="flex-1 border border-[#E7E5E4] rounded-[16px] flex flex-col items-center justify-center p-8 mb-6">
        <div className="w-10 h-10 rounded-full border border-[#E7E5E4] flex items-center justify-center text-[#78716C] mb-4 bg-[#FAFAFA]">
          <GraduationCap size={18} />
        </div>
        <div className="text-[14px] font-bold text-[#1C1917] mb-1">No Published Marks Available</div>
        <div className="text-[13px] text-[#78716C] max-w-[300px] text-center leading-relaxed">
          Marks for the selected semester have not been published yet. Check back after faculty upload.
        </div>
      </div>

      {/* Info Footer */}
      <div className="w-full bg-[#FAFAFA] border border-[#E7E5E4] rounded-[8px] p-4 flex items-center gap-3 text-[12px] text-[#78716C]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        CIE evaluation follows VTU guidelines. Only published marks appear here. Contact department for discrepancies.
      </div>
    </div>
  );
}

`;

if (!txt.includes('function CIEMarksFlow')) {
    txt = txt.substring(0, subjectFeedbackFlowIdx) + cieMarksComponent + txt.substring(subjectFeedbackFlowIdx);
}

// Now replace the {studentTab === 'CIE Marks' && <div...} (if it exists) or insert it.
// We checked earlier, there is no `studentTab === 'CIE Marks'` rendering block at all.
// Let's insert it inside the desktop main view.
const attendanceIdx = txt.indexOf("{(studentTab === 'Attendance' || studentTab === 'Academic Attendance') && (");
if (attendanceIdx !== -1) {
    if (!txt.includes("{studentTab === 'CIE Marks' && <CIEMarksFlow />}")) {
        txt = txt.substring(0, attendanceIdx) + "{studentTab === 'CIE Marks' && <CIEMarksFlow />}\n                  " + txt.substring(attendanceIdx);
    }
}

fs.writeFileSync('src/App.tsx', txt);
console.log('CIE Marks feature injected!');
