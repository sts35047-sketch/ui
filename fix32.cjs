const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = content.indexOf('function StudentLoginFlow');
const endIdx = content.indexOf('function Flow4', startIdx);
let flowText = content.substring(startIdx, endIdx);

// Extract the SVG block
const svgStart = flowText.indexOf('<svg viewBox="0 0 790 590"');
const svgEnd = flowText.indexOf('</svg>', svgStart) + 6;
const svgCode = flowText.substring(svgStart, svgEnd);

const newFlow = `function StudentLoginFlow({ setActive }: { setActive: (val: number) => void }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] border-x border-b border-[#E7E5E4] bg-white dark:bg-[#18181b] rounded-b-[16px] overflow-hidden mx-4 sm:mx-6 font-sans selection:bg-[#EE930D]/20">
      
      {/* ================= LEFT PANEL ================= */}
      <div className="hidden md:flex flex-col items-center justify-center bg-[#F2E8DB] relative p-8">
        <div style={{ zoom: 0.95 }} className="flex flex-col items-center justify-center w-full h-full">
          <div className="flex items-center gap-2.5 mb-12">
            <img src={logoUrl} alt="Logo" className="w-10 h-10 object-contain" />
            <span className="serif font-semibold text-2xl text-[#1C1716] tracking-tight">EduFeedback Pro</span>
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            ${svgCode}
          </div>
          
          <p className="text-[13px] text-[#1C1716]/50 mt-12 font-medium">Secure College SSO &middot; VTU &middot; Karnataka</p>
        </div>
      </div>

      {/* ================= RIGHT PANEL ================= */}
      <div className="flex flex-col px-6 lg:px-16 py-12 justify-center h-full relative overflow-y-auto">
        <div style={{ zoom: 0.95 }} className="flex flex-col px-6 lg:px-16 py-12 w-full max-w-[600px] mx-auto">
          <div className="flex justify-end mb-6">
            <button type="button" onClick={() => setActive(0)} className="inline-flex items-center gap-2 bg-[#F5F5F0] text-[#1C1917] font-medium text-[13px] px-3 py-1.5 rounded-full hover:bg-[#E7E5E4] transition-colors border border-[#E7E5E4]">
              &lt; Back to Roles
            </button>
          </div>

          <h1 className="serif text-[40px] sm:text-[48px] text-[#1C1917] leading-tight mb-3">Student Access</h1>
          <p className="text-[15px] sm:text-[16px] text-[#78716C] mb-8 lg:mb-12">Access attendance, marks, and give anonymous feedback. Your USN is your identity.</p>

          <form onSubmit={(e) => { e.preventDefault(); setActive(5); }} className="space-y-5" noValidate>
            <div>
              <label className="block text-[13px] font-semibold text-[#1C1917] mb-2">University / USN</label>
              <div className="flex items-center gap-3 rounded-[12px] border border-[#E7E5E4] bg-[#F5F5F0] px-4 py-3.5 focus-within:border-[#1C1917] focus-within:ring-1 focus-within:ring-[#1C1917] transition-all">
                <input id="usn" name="usn" type="text" defaultValue="1EP24CS001" required className="flex-1 min-w-0 outline-none bg-transparent text-[#1C1917] text-[15px] placeholder:text-[#A8A29E]" />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#1C1917] mb-2">Student Email <span className="font-normal text-[#A8A29E]">(optional)</span></label>
              <div className="flex items-center gap-3 rounded-[12px] border border-[#E7E5E4] bg-[#F5F5F0] px-4 py-3.5 focus-within:border-[#1C1917] focus-within:ring-1 focus-within:ring-[#1C1917] transition-all">
                <input type="email" placeholder="student.email@epcet.edu.in" className="flex-1 min-w-0 outline-none bg-transparent text-[#1C1917] text-[15px] placeholder:text-[#A8A29E]" />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#1C1917] mb-2">Password</label>
              <div className="flex items-center gap-3 rounded-[12px] border border-[#E7E5E4] bg-[#F5F5F0] px-4 py-3.5 focus-within:border-[#1C1917] focus-within:ring-1 focus-within:ring-[#1C1917] transition-all">
                <input type={showPassword ? 'text' : 'password'} defaultValue="1234" required className="flex-1 min-w-0 outline-none bg-transparent text-[#1C1917] text-[15px] tracking-[0.2em]" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[12px] font-medium text-[#78716C] hover:text-[#1C1917]">
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2 mb-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-[#E7E5E4] text-[#1C1917] focus:ring-[#1C1917]" />
                <span className="text-[13px] text-[#78716C]">Remember me</span>
              </label>
              <a href="#" className="text-[13px] font-medium text-[#1C1917] hover:underline">Forgot password?</a>
            </div>

            <button
              onClick={() => setActive(5)}
              className="w-full bg-[#1C1917] hover:bg-black text-white font-bold py-4 rounded-xl text-[15px] shadow-[0_4px_14px_0_rgba(28,25,23,0.39)] transition-all mb-6"
            >
              Sign In to Portal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

`;

content = content.substring(0, startIdx) + newFlow + content.substring(endIdx);
fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Replaced StudentLoginFlow with HOD/CollegeAdmin layout");
