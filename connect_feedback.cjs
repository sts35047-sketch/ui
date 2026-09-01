const fs = require('fs');
let txt = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Connect the dashboard button
const btnSearch = `<button className="h-10 px-5 rounded-[12px] bg-[#1C1917] text-white text-[13px] font-medium shrink-0">Submit feedback  </button>`;
const btnReplace = `<button onClick={() => setStudentTab('Subject Feedback')} className="h-10 px-5 rounded-[12px] bg-[#1C1917] text-white text-[13px] font-medium shrink-0 hover:bg-[#333] transition-colors">Submit feedback</button>`;
txt = txt.replace(btnSearch, btnReplace);

// 2. Replace Step 3 inside SubjectFeedbackFlow
const step3Search = `{/* Step 3: Evaluation Criteria */}
        {step === 3 && (
          <div className="w-full flex flex-col items-center justify-center animate-[fadeIn_0.3s_ease] h-48">
            <p className="text-[#44403C] font-medium text-lg">No evaluation criteria configured for this session.</p>
          </div>
        )}`;

const step3Replace = `{/* Step 3: Evaluation Criteria */}
        {step === 3 && (
          <div className="w-full flex flex-col animate-[fadeIn_0.3s_ease]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-[#E7E5E4] dark:border-[#27272a] pb-4 w-full">
               <div>
                 <h2 className="text-[20px] font-bold text-[#1C1917] dark:text-[#F5F5F0]">Evaluate: {subject}</h2>
                 <p className="text-[13px] text-[#78716C] mt-1">Please provide honest and anonymous feedback.</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8">
              {['Teaching Quality', 'Concept Clarity', 'Communication', 'Material & Resources', 'Overall Satisfaction'].map((label, idx) => (
                <div key={idx} className="bg-[#F5F5F0] dark:bg-[#27272a]/30 p-4 rounded-[16px] border border-[#E7E5E4] dark:border-[#27272a]">
                  <div className="text-[13px] font-bold text-[#1C1917] dark:text-[#F5F5F0] mb-3">{label}</div>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(star => (
                      <button key={star} className="text-2xl hover:scale-110 transition-transform focus:outline-none">
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full mb-8">
              <label className="block text-[13px] font-bold text-[#1C1917] dark:text-[#F5F5F0] mb-2">Additional Comments (Optional)</label>
              <textarea 
                className="w-full h-32 rounded-[16px] bg-white dark:bg-[#18181b] border border-[#E7E5E4] dark:border-[#27272a] p-4 text-[14px] focus:outline-none focus:border-[#4F46E5] resize-none"
                placeholder="What did you like about this subject? What can be improved?"
              ></textarea>
            </div>

            <div className="w-full flex justify-end">
               <button onClick={() => { alert('Feedback submitted anonymously!'); setStep(1); }} className="px-8 py-3 bg-[#10B981] hover:bg-[#059669] text-white font-bold rounded-[12px] shadow-sm transition-colors text-[14px]">
                 Submit Feedback
               </button>
            </div>
          </div>
        )}`;

if (txt.indexOf(btnSearch) === -1) {
    console.log("Could not find button search string.");
}
if (txt.indexOf(step3Search) === -1) {
    console.log("Could not find step3 search string.");
}

txt = txt.replace(step3Search, step3Replace);
fs.writeFileSync('src/App.tsx', txt);
console.log("Feedback logic connected.");
