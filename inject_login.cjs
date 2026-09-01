const fs = require('fs');

let appTsx = fs.readFileSync('src/App.tsx', 'utf8');

const studentLoginFlowStr = `
function StudentLoginFlow({ setActive }) {
  const [usn, setUsn] = React.useState('1EP24CS001');
  const [dob, setDob] = React.useState('15-08-2005');
  const [showDob, setShowDob] = React.useState(false);

  return (
    <div className="w-full flex h-[calc(100vh-140px)] min-h-[600px] bg-[#F5F5F0] rounded-[24px] overflow-hidden border border-[#E7E5E4] dark:border-[#27272a] shadow-sm animate-[fadeIn_0.4s_ease]">
      
      {/* Left Column - Content */}
      <div className="w-1/2 p-12 flex flex-col justify-between bg-white dark:bg-[#18181b] relative overflow-hidden">
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1C1917 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FEF3C7] text-[#92400E] text-[12px] font-bold mb-8">
            <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse"></span>
            Student Portal
          </div>
          
          <h1 className="text-[42px] font-bold text-[#1C1917] leading-[1.1] tracking-tight mb-6">
            Your academic journey, <br />
            <span className="text-[#A8A29E]">simplified.</span>
          </h1>
          
          <p className="text-[15px] text-[#78716C] leading-relaxed max-w-[400px]">
            Access your attendance, CIE marks, feedback forms, and official university notifications all in one place.
          </p>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 text-[13px] font-medium text-[#57534E]">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#1C1917]"><FileText size={12} /></span>
              VTU Guidelines
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#1C1917]"><Lock size={12} /></span>
              End-to-End Secure
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-1/2 p-12 flex flex-col justify-center items-center bg-[#FAFAFA] dark:bg-[#18181b]/50">
        <div className="w-full max-w-[380px]">
          
          <div className="text-center mb-10">
            <h2 className="text-[24px] font-bold text-[#1C1917] mb-2">Student Login</h2>
            <p className="text-[14px] text-[#78716C]">Enter your USN and Date of Birth to continue.</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-[12px] font-bold text-[#1C1917] mb-2 uppercase tracking-wide">University Serial Number (USN)</label>
              <input 
                type="text" 
                value={usn}
                onChange={(e) => setUsn(e.target.value)}
                className="w-full h-12 bg-white dark:bg-[#18181b] border border-[#E7E5E4] dark:border-[#27272a] rounded-[12px] px-4 text-[14px] font-medium text-[#1C1917] focus:outline-none focus:border-[#1C1917] transition-colors uppercase placeholder:normal-case"
                placeholder="e.g. 1EP24CS001"
              />
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#1C1917] mb-2 uppercase tracking-wide">Date of Birth</label>
              <div className="relative">
                <input 
                  type={showDob ? "text" : "password"} 
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full h-12 bg-white dark:bg-[#18181b] border border-[#E7E5E4] dark:border-[#27272a] rounded-[12px] pl-4 pr-12 text-[14px] font-medium text-[#1C1917] focus:outline-none focus:border-[#1C1917] transition-colors"
                  placeholder="DD-MM-YYYY"
                />
                <button 
                  onClick={() => setShowDob(!showDob)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A8A29E] hover:text-[#1C1917] transition-colors"
                >
                  <Search size={16} /> 
                  {/* Note: I just used Search as an eye placeholder since we don't have Eye imported, but let's just use text for simplicity */}
                </button>
              </div>
            </div>

            <button 
              onClick={() => setActive(5)}
              className="w-full h-12 bg-[#1C1917] hover:bg-[#292524] text-white rounded-[12px] text-[14px] font-bold transition-all mt-4 flex items-center justify-center gap-2"
            >
              Sign In <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-10 flex items-center justify-center gap-2 text-[12px] text-[#A8A29E]">
            <Lock size={12} />
            Data is securely encrypted
          </div>

        </div>
      </div>

    </div>
  );
}
`;

if (!appTsx.includes('function StudentLoginFlow')) {
    const splitIndex = appTsx.indexOf('export default function App() {');
    appTsx = appTsx.substring(0, splitIndex) + studentLoginFlowStr + "\n" + appTsx.substring(splitIndex);
    fs.writeFileSync('src/App.tsx', appTsx);
    console.log('Injected StudentLoginFlow');
} else {
    console.log('StudentLoginFlow already exists');
}
