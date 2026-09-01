const fs = require('fs');

let txt = fs.readFileSync('src/App.tsx', 'utf8');

// The original step 1 block
const step1Start = txt.indexOf('{/* Step 1: Semester */}');
const step2Start = txt.indexOf('{/* Step 2: Subject */}');

if (step1Start !== -1 && step2Start !== -1) {
    const newStep1 = `{/* Step 1: Semester */}
        {step === 1 && (
          <div className="w-full flex flex-col items-center animate-[fadeIn_0.3s_ease]">
            
            <div className="w-full max-w-4xl flex justify-between items-center mb-6">
              <h3 className="font-bold text-[15px] text-[#1C1917]">Choose semester</h3>
              <span className="text-[12px] text-[#A8A29E]">Sem 1-8</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mb-12">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(s => {
                const isSelected = sem === 'Sem ' + s;
                return (
                  <div 
                    key={s} 
                    onClick={() => setSem('Sem ' + s)}
                    className={"relative h-24 rounded-[12px] flex flex-col justify-between p-4 cursor-pointer transition-all border " + (isSelected ? 'bg-[#1C1917] border-[#1C1917] text-white' : 'bg-white border-[#E7E5E4] text-[#1C1917] hover:border-[#1C1917]/30')}
                  >
                    <div className={"text-[12px] font-medium " + (isSelected ? "text-[#E7E5E4]" : "text-[#78716C]")}>Semester</div>
                    <div className="flex justify-between items-end">
                      <div className="text-[20px] font-bold">{s}</div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-white text-[#1C1917] flex items-center justify-center text-[10px] font-bold">✓</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="w-full max-w-4xl flex justify-end">
              <button 
                onClick={() => sem ? setStep(2) : null}
                disabled={!sem}
                className={"px-8 py-2.5 rounded-[8px] text-[14px] font-bold transition-all " + (sem ? 'bg-[#1C1917] text-white hover:bg-[#292524]' : 'bg-[#E7E5E4] text-[#A8A29E] cursor-not-allowed opacity-50')}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        `;
        
    txt = txt.substring(0, step1Start) + newStep1 + txt.substring(step2Start);
}

// We also need to update the progress bar to match the new design:
// `(1) Select Semester --------- 2 Select Subject --------- 3 Provide Feedback`
const progressStart = txt.indexOf('<div className="w-full max-w-2xl flex items-center justify-between mb-12 relative">');
const progressEnd = txt.indexOf('{/* Step 1: Semester */}');

if (progressStart !== -1 && progressEnd !== -1) {
    const newProgress = `<div className="w-full max-w-4xl flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className={\`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold \${step >= 1 ? 'bg-[#1C1917] text-white' : 'bg-[#F5F5F0] text-[#A8A29E]'}\`}>
              1
            </div>
            <span className={\`text-[13px] font-medium \${step >= 1 ? 'text-[#1C1917]' : 'text-[#A8A29E]'}\`}>Select Semester</span>
          </div>
          <div className="flex-1 h-px bg-[#E7E5E4] mx-4" />
          <div className="flex items-center gap-3">
            <div className={\`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold \${step >= 2 ? 'bg-[#1C1917] text-white' : 'bg-[#F5F5F0] text-[#A8A29E]'}\`}>
              2
            </div>
            <span className={\`text-[13px] font-medium \${step >= 2 ? 'text-[#1C1917]' : 'text-[#A8A29E]'}\`}>Select Subject</span>
          </div>
          <div className="flex-1 h-px bg-[#E7E5E4] mx-4" />
          <div className="flex items-center gap-3">
            <div className={\`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold \${step === 3 ? 'bg-[#1C1917] text-white' : 'bg-[#F5F5F0] text-[#A8A29E]'}\`}>
              3
            </div>
            <span className={\`text-[13px] font-medium \${step === 3 ? 'text-[#1C1917]' : 'text-[#A8A29E]'}\`}>Provide Feedback</span>
          </div>
        </div>

        `;
    txt = txt.substring(0, progressStart) + newProgress + txt.substring(progressEnd);
}

// We should also add the Header: "Feedback" and "Step X of 3"
// Wait, the header is above the progress bar?
// Currently, `SubjectFeedbackFlow` has no header, it just renders the progress bar.
// Let's add the header inside `SubjectFeedbackFlow`.
const funcStart = txt.indexOf('function SubjectFeedbackFlow() {');
const retStart = txt.indexOf('return (', funcStart);
const wrapperStart = txt.indexOf('<div className="bg-white dark:bg-[#18181b] rounded-[24px]', retStart);
if (wrapperStart !== -1) {
    // we want to put the header inside this wrapper
    const wrapperInner = txt.indexOf('>', wrapperStart) + 1;
    const headerCode = `
        <div className="w-full flex justify-between items-start mb-10 border-b border-[#E7E5E4] pb-6">
          <div>
            <h2 className="text-[20px] font-bold text-[#1C1917]">Feedback</h2>
            <div className="text-[12px] text-[#78716C] mt-1">Step {step} of 3</div>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-[#059669]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#059669]"></div>
            System operational
          </div>
        </div>
`;
    // Add header to `SubjectFeedbackFlow`
    txt = txt.substring(0, wrapperInner) + headerCode + txt.substring(wrapperInner);
    
    // Also change `bg-white dark:bg-[#18181b] rounded-[24px] border border-[#E7E5E4] dark:border-[#27272a] p-8 md:p-12 shadow-sm flex flex-col items-center min-h-[600px]`
    // The design is very clean, maybe `p-8` is fine.
}

fs.writeFileSync('src/App.tsx', txt);
console.log('Feedback Step 1 rewritten!');
