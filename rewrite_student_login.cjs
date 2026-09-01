const fs = require('fs');

let txt = fs.readFileSync('src/App.tsx', 'utf8');

const startStr = 'function StudentLoginFlow({ setActive }: { setActive: (val: number) => void }) {';
const endStr = '\nfunction Flow4({';

const startIdx = txt.indexOf(startStr);
const endIdx = txt.indexOf(endStr, startIdx);

if (startIdx === -1 || endIdx === -1) {
    console.log("Could not find StudentLoginFlow or Flow4", startIdx, endIdx);
    process.exit(1);
}

const replacement = `function StudentLoginFlow({ setActive }: { setActive: (val: number) => void }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full min-h-[calc(100dvh-64px)] grid grid-cols-1 md:grid-cols-2 font-sans overflow-hidden bg-white dark:bg-[#09090b]">
      
      {/* LEFT PANEL */}
      <div className="bg-[#E9F5ED] dark:bg-[#064E3B] p-8 md:p-12 lg:p-16 flex flex-col relative m-4 md:m-6 rounded-[24px] md:rounded-[32px] overflow-hidden">
        <div className="relative z-10 w-full max-w-[420px] mx-auto flex flex-col h-full">
          
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-black/20 text-[#059669] dark:text-[#A7F3D0] shadow-sm mb-6">
              <span className="w-3.5 h-3.5 rounded-full bg-[#10B981] flex items-center justify-center text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-2.5 h-2.5"><path d="M20 6L9 17l-5-5"/></svg>
              </span>
              <span className="text-[12px] font-bold tracking-wide">Student</span>
            </div>

            <h1 className="serif text-[36px] md:text-[44px] leading-[1.1] text-[#064E3B] dark:text-[#A7F3D0] mb-4">
              Student access,<br/>without chaos.
            </h1>
            <p className="text-[14px] md:text-[15px] text-[#064E3B]/80 dark:text-[#A7F3D0]/80 leading-relaxed mb-10">
              Access attendance, marks, and give anonymous feedback. Your USN is your identity.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-[12px] bg-white flex items-center justify-center shrink-0 shadow-sm text-[#10B981]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-[#064E3B] dark:text-[#A7F3D0]">Track your attendance</h3>
                  <p className="text-[13px] text-[#064E3B]/70 dark:text-[#A7F3D0]/70 mt-0.5">Real-time updates and eligibility alerts</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-[12px] bg-white flex items-center justify-center shrink-0 shadow-sm text-[#F59E0B]">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-[#064E3B] dark:text-[#A7F3D0]">View CIE & marks</h3>
                  <p className="text-[13px] text-[#064E3B]/70 dark:text-[#A7F3D0]/70 mt-0.5">Internal assessments in one place</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-[12px] bg-white flex items-center justify-center shrink-0 shadow-sm text-[#EC4899]">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-[#064E3B] dark:text-[#A7F3D0]">Give anonymous feedback</h3>
                  <p className="text-[13px] text-[#064E3B]/70 dark:text-[#A7F3D0]/70 mt-0.5">Help improve teaching quality</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-[12px] bg-white flex items-center justify-center shrink-0 shadow-sm text-[#3B82F6]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-[#064E3B] dark:text-[#A7F3D0]">Focus on learning</h3>
                  <p className="text-[13px] text-[#064E3B]/70 dark:text-[#A7F3D0]/70 mt-0.5">Everything you need, nothing extra</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex gap-4 relative">
             <div className="absolute -top-12 left-10 w-24 h-16 opacity-30 text-[#064E3B]">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10,50 L50,20 L90,50 L50,80 Z" /><path d="M20,58 L20,80 L50,95 L80,80 L80,58" /></svg>
             </div>
             
             <div className="bg-white rounded-[16px] p-5 shadow-sm flex-1 z-10">
               <div className="text-[10px] text-[#A8A29E] font-bold tracking-widest uppercase mb-1">ATTENDANCE</div>
               <div className="text-[24px] font-bold text-[#1C1917]">78%</div>
               <div className="text-[12px] text-[#57534E] mb-3">eligible</div>
               <div className="text-[11px] text-[#10B981] font-semibold flex items-center gap-1">↑ 5% this month</div>
             </div>
             <div className="bg-white rounded-[16px] p-5 shadow-sm flex-1 z-10">
               <div className="text-[10px] text-[#A8A29E] font-bold tracking-widest uppercase mb-1">CIE AVERAGE</div>
               <div className="text-[24px] font-bold text-[#1C1917]">42.5<span className="text-[14px] text-[#A8A29E]">/50</span></div>
               <div className="text-[12px] text-[#57534E] mb-3">good performance</div>
               <div className="text-[11px] text-[#10B981] font-semibold flex items-center gap-1">↑ 3.2 this month</div>
             </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - FORM */}
      <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 py-12 relative">
        <div className="w-full max-w-[440px] mx-auto">
          
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] text-[10px] font-bold tracking-widest uppercase mb-6">
            STUDENT
          </div>
          
          <h2 className="serif text-[32px] md:text-[36px] text-[#1C1917] dark:text-[#F5F5F0] mb-3">
            Student Access
          </h2>
          <p className="text-[14px] text-[#78716C] mb-8 leading-relaxed">
            Access attendance, marks, and give anonymous feedback.<br/>Your USN is your identity.
          </p>

          <div className="space-y-5">
            <div>
              <label className="block text-[12px] font-bold text-[#1C1917] dark:text-[#F5F5F0] mb-2">University / USN</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E]">
                  <Users className="w-4 h-4" />
                </div>
                <input 
                  type="text" 
                  placeholder="Enter your USN"
                  className="w-full bg-white dark:bg-[#18181b] border border-[#E7E5E4] dark:border-[#27272a] rounded-[12px] py-3 pl-10 pr-24 text-[14px] focus:outline-none focus:border-[#D97706] transition-colors placeholder:text-[#A8A29E]"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[#A8A29E]">
                  e.g. 1EP24CS001
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#1C1917] dark:text-[#F5F5F0] mb-2">Student Email <span className="font-normal text-[#A8A29E]">(optional)</span></label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E]">
                  <Mail className="w-4 h-4" />
                </div>
                <input 
                  type="email" 
                  placeholder="Enter your college email"
                  className="w-full bg-white dark:bg-[#18181b] border border-[#E7E5E4] dark:border-[#27272a] rounded-[12px] py-3 pl-10 pr-24 text-[14px] focus:outline-none focus:border-[#D97706] transition-colors placeholder:text-[#A8A29E]"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[#A8A29E]">
                  @epcet.edu.in
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#1C1917] dark:text-[#F5F5F0] mb-2">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E]">
                  <Lock className="w-4 h-4" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full bg-white dark:bg-[#18181b] border border-[#E7E5E4] dark:border-[#27272a] rounded-[12px] py-3 pl-10 pr-16 text-[14px] focus:outline-none focus:border-[#D97706] transition-colors placeholder:text-[#A8A29E]"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-medium text-[#78716C] hover:text-[#1C1917] dark:hover:text-white"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="bg-[#FEF3C7]/50 border border-[#FDE68A] rounded-[12px] p-4 flex items-start gap-3">
              <div className="text-[#D97706] shrink-0 mt-0.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              </div>
              <div className="flex-1">
                <div className="text-[12px] font-bold text-[#92400E]">Use your college email</div>
                <div className="text-[12px] text-[#B45309] mt-0.5">OTP will be sent if password fails.</div>
              </div>
              <button className="text-[12px] font-medium text-[#D97706] hover:underline underline-offset-2 shrink-0">
                Forgot password?
              </button>
            </div>

            <button 
              onClick={() => setActive(5)} 
              className="w-full py-3.5 bg-[#09090B] hover:bg-[#27272A] dark:bg-[#FAFAFA] dark:hover:bg-[#E4E4E7] text-white dark:text-[#09090B] rounded-[12px] text-[14px] font-bold transition-all flex items-center justify-center gap-2 mt-2 shadow-md hover:shadow-lg"
            >
              Continue to Student Dashboard
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            
            <div className="flex items-center gap-4 py-2">
              <div className="h-px bg-[#E7E5E4] dark:bg-[#27272a] flex-1"></div>
              <span className="text-[12px] text-[#A8A29E]">or</span>
              <div className="h-px bg-[#E7E5E4] dark:bg-[#27272a] flex-1"></div>
            </div>

            <button className="w-full py-3.5 bg-white dark:bg-[#18181b] border border-[#E7E5E4] dark:border-[#27272a] hover:bg-[#F5F5F0] dark:hover:bg-[#27272a] text-[#1C1917] dark:text-[#F5F5F0] rounded-[12px] text-[14px] font-bold transition-all flex items-center justify-center gap-2">
              Register as new student
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
            </button>

          </div>
          
          <div className="mt-8 text-center">
            <span className="text-[12px] text-[#A8A29E]">Having trouble? </span>
            <button className="text-[12px] text-[#78716C] font-medium hover:text-[#1C1917] dark:hover:text-white underline underline-offset-2">Contact your college admin</button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

`;

txt = txt.substring(0, startIdx) + replacement + txt.substring(endIdx);
fs.writeFileSync('src/App.tsx', txt);
console.log('StudentLoginFlow successfully rewritten!');
