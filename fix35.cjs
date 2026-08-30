const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = content.indexOf('function StudentLoginFlow');
const endIdx = content.indexOf('function Flow4', startIdx);

const svgCode = fs.readFileSync('scratch/svg.txt', 'utf8');

const newFlow = `function StudentLoginFlow({ setActive }: { setActive: (val: number) => void }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full h-[calc(100dvh-64px)] grid grid-cols-1 md:grid-cols-2 font-sans overflow-hidden">
      
      {/* LEFT PANEL */}
      <div className="bg-[#D1FAE5] relative flex flex-col justify-center px-6 lg:px-16 py-10 h-full overflow-hidden">
        {/* We can use a subtle noise texture if we want, but let's stick to clean bg for now */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
        
        <div className="relative z-10 w-full max-w-[500px] mx-auto flex flex-col h-full justify-between">
          
          <div className="mt-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 border border-white/50 shadow-sm mb-6">
              <span className="w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center text-white text-[10px]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </span>
              <span className="text-[13px] font-semibold text-[#064E3B]">Student</span>
            </div>

            <h1 className="serif text-[40px] lg:text-[48px] leading-[1.1] text-[#064E3B] mb-4">
              Student access, without chaos.
            </h1>
            <p className="text-[15px] text-[#064E3B]/80 leading-relaxed max-w-[400px]">
              Access attendance, marks, and give anonymous feedback. Your USN is your identity.
            </p>
          </div>

          <div className="flex-1 flex items-center justify-center py-8">
            ${svgCode}
          </div>

          <div className="grid grid-cols-3 gap-3 pb-8">
            <div className="bg-white rounded-[16px] p-4 shadow-sm">
              <div className="mono text-[10px] text-[#A8A29E] tracking-wider mb-1">USN</div>
              <div className="text-[16px] font-bold text-[#1C1917] mb-1">1EP24CS001</div>
              <div className="text-[11px] font-medium text-[#10B981] flex items-center gap-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3"><path d="M20 6L9 17l-5-5"/></svg>
                Verified
              </div>
            </div>
            <div className="bg-white rounded-[16px] p-4 shadow-sm">
              <div className="mono text-[10px] text-[#A8A29E] tracking-wider mb-1">ATTENDANCE</div>
              <div className="text-[16px] font-bold text-[#1C1917] mb-1">78%</div>
              <div className="text-[11px] font-medium text-[#10B981] flex items-center gap-1">
                &uarr; 3.5% this month
              </div>
            </div>
            <div className="bg-white rounded-[16px] p-4 shadow-sm">
              <div className="mono text-[10px] text-[#A8A29E] tracking-wider mb-1">MARKS</div>
              <div className="text-[16px] font-bold text-[#1C1917] mb-1">8.2 CGPA</div>
              <div className="text-[11px] font-medium text-[#78716C]">
                3 subjects updated
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-col bg-white h-full relative overflow-y-auto">
        <div style={{ zoom: 0.95 }} className="flex flex-col px-8 lg:px-20 py-16 w-full max-w-[640px] mx-auto h-full">
          <div className="flex justify-end mb-8">
            <button type="button" onClick={() => setActive(0)} className="inline-flex items-center gap-2 bg-[#F5F5F0] text-[#1C1917] font-medium text-[13px] px-3 py-1.5 rounded-full hover:bg-[#E7E5E4] transition-colors border border-[#E7E5E4]">
              &lt; Back to Roles
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h1 className="serif text-[42px] sm:text-[50px] text-[#1C1917] leading-tight mb-3">Student Access</h1>
            <p className="text-[15px] sm:text-[16px] text-[#78716C] mb-10 max-w-[480px] leading-relaxed">
              Access attendance, marks, and give anonymous feedback. Your USN is your identity.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); setActive(5); }} className="space-y-5" noValidate>
              <div>
                <label className="block text-[13px] font-semibold text-[#1C1917] mb-2">University / USN</label>
                <div className="flex items-center gap-3 rounded-[12px] border border-[#E7E5E4] bg-[#F5F5F0] px-4 py-3.5 focus-within:border-[#1C1917] focus-within:ring-1 focus-within:ring-[#1C1917] transition-all">
                  <div className="w-5 h-5 rounded-full bg-[#1C1917] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                    S
                  </div>
                  <input id="usn" name="usn" type="text" defaultValue="1EP24CS001" required className="flex-1 min-w-0 outline-none bg-transparent text-[#1C1917] text-[15px] font-medium" />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#1C1917] mb-2">Student Email <span className="font-normal text-[#A8A29E]">(optional)</span></label>
                <div className="flex items-center gap-3 rounded-[12px] border border-[#E7E5E4] bg-[#F5F5F0] px-4 py-3.5 focus-within:border-[#1C1917] focus-within:ring-1 focus-within:ring-[#1C1917] transition-all">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-[#A8A29E] shrink-0"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  <input type="email" placeholder="student.email@epcet.edu.in" className="flex-1 min-w-0 outline-none bg-transparent text-[#1C1917] text-[15px] placeholder:text-[#A8A29E]" />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#1C1917] mb-2">Password</label>
                <div className="flex items-center gap-3 rounded-[12px] border border-[#E7E5E4] bg-[#F5F5F0] px-4 py-3.5 focus-within:border-[#1C1917] focus-within:ring-1 focus-within:ring-[#1C1917] transition-all relative">
                  <input type={showPassword ? 'text' : 'password'} defaultValue="1234" required className="flex-1 min-w-0 outline-none bg-transparent text-[#1C1917] text-[15px] tracking-[0.2em]" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[11px] font-bold tracking-wider text-[#78716C] hover:text-[#1C1917]">
                    {showPassword ? 'HIDE' : 'SHOW'}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#FEF3C7] rounded-[12px] p-3 border border-[#FDE68A] mt-2 mb-6">
                <span className="mt-0.5 text-[#D97706]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
                </span>
                <div className="flex-1 flex items-center justify-between">
                  <div className="text-[12px] font-medium text-[#92400E] flex flex-col">
                    <span>Use your college email</span>
                    <span className="opacity-80">OTP if password fails</span>
                  </div>
                  <a href="#" className="text-[12px] font-semibold text-[#92400E] underline">Forgot password?</a>
                </div>
              </div>

              <button
                onClick={() => setActive(5)}
                className="w-full bg-[#1C1917] hover:bg-black text-white font-bold py-4 rounded-xl text-[15px] shadow-[0_4px_14px_0_rgba(28,25,23,0.39)] transition-all mb-4"
              >
                Continue to Student Dashboard &rarr;
              </button>

              <div className="flex flex-col items-center gap-1.5 pt-4 text-[11px] font-medium text-[#A8A29E]">
                <div className="flex items-center gap-2">
                  <span>Need help?</span> &middot; <a href="#" className="text-[#78716C] hover:text-[#1C1917] underline">Contact HOD</a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Secured with 2FA</span> &middot; <a href="#" className="hover:text-[#1C1917]">Privacy</a> &middot; <a href="#" className="hover:text-[#1C1917]">Terms</a>
                </div>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

`;

content = content.substring(0, startIdx) + newFlow + content.substring(endIdx);
fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Rewritten StudentLoginFlow to match the image precisely!");
