const fs = require('fs');
let appTsx = fs.readFileSync('src/App.tsx', 'utf8');

// Replace StudentLoginFlow
const loginStart = appTsx.indexOf('function StudentLoginFlow');
const loginEnd = appTsx.indexOf('function Flow5', loginStart);

if (loginStart !== -1 && loginEnd !== -1) {
    const newStudentLoginFlow = `function StudentLoginFlow({ setActive }: any) {
  const [usn, setUsn] = React.useState('1EP24CS001');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('••••••••');

  return (
    <div className="w-full max-w-[1000px] mx-auto flex flex-col md:flex-row gap-6 p-6 animate-[fadeIn_0.4s_ease]">
      
      {/* Left Column */}
      <div className="w-full md:w-1/2 bg-[#F0FDF4] rounded-[24px] p-8 md:p-12 flex flex-col relative overflow-hidden">
        
        <div className="inline-flex items-center gap-2 bg-white rounded-full px-3 py-1 w-fit mb-8 shadow-sm">
          <CheckCircle2 size={14} className="text-[#059669]" />
          <span className="text-[12px] font-bold text-[#1C1917]">Student</span>
        </div>
        
        <h1 className="serif text-[36px] md:text-[42px] font-bold text-[#064E3B] leading-[1.15] mb-4">
          Student access,<br />
          without chaos.
        </h1>
        
        <p className="text-[14px] text-[#065F46] leading-relaxed mb-10">
          Access attendance, marks, and give anonymous feedback.<br />
          Your USN is your identity.
        </p>

        <div className="space-y-6 mb-12">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-[#059669]">
              <Target size={16} />
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#064E3B]">Track your attendance</div>
              <div className="text-[12px] text-[#065F46]">Real-time updates and eligibility alerts</div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-[#F59E0B]">
              <BarChart2 size={16} />
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#064E3B]">View CIE & marks</div>
              <div className="text-[12px] text-[#065F46]">Internal assessments in one place</div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-[#EC4899]">
              <MessageSquare size={16} />
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#064E3B]">Give anonymous feedback</div>
              <div className="text-[12px] text-[#065F46]">Help improve teaching quality</div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-[#3B82F6]">
              <FileText size={16} />
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#064E3B]">Focus on learning</div>
              <div className="text-[12px] text-[#065F46]">Everything you need, nothing extra</div>
            </div>
          </div>
        </div>

        {/* Floating Mini Cards */}
        <div className="mt-auto flex flex-col sm:flex-row gap-4 relative z-10">
          <div className="bg-white rounded-[16px] p-4 flex-1 shadow-sm border border-[#E7E5E4]/50">
            <div className="text-[10px] font-bold text-[#A8A29E] tracking-wider mb-2">ATTENDANCE</div>
            <div className="text-[24px] font-bold text-[#1C1917] leading-none mb-1">78%</div>
            <div className="text-[12px] text-[#57534E] mb-3">eligible</div>
            <div className="text-[10px] font-bold text-[#059669]">↑ 5% this month</div>
          </div>
          <div className="bg-white rounded-[16px] p-4 flex-1 shadow-sm border border-[#E7E5E4]/50">
            <div className="text-[10px] font-bold text-[#A8A29E] tracking-wider mb-2">CIE AVERAGE</div>
            <div className="text-[24px] font-bold text-[#1C1917] leading-none mb-1">42.5<span className="text-[14px] text-[#A8A29E]">/50</span></div>
            <div className="text-[12px] text-[#57534E] mb-3">good performance</div>
            <div className="text-[10px] font-bold text-[#059669]">↑ 3.2 this month</div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-1/2 bg-white rounded-[24px] border border-[#E7E5E4] p-8 md:p-12 shadow-sm flex flex-col justify-center">
        
        <div className="inline-flex items-center gap-2 bg-[#F0FDF4] px-3 py-1 rounded-full w-fit mb-6">
          <span className="text-[10px] font-bold text-[#059669] tracking-wider">STUDENT</span>
        </div>
        
        <h2 className="serif text-[32px] md:text-[36px] font-bold text-[#1C1917] mb-3">Student Access</h2>
        <p className="text-[13px] text-[#78716C] mb-8">
          Access attendance, marks, and give anonymous feedback.<br />
          Your USN is your identity.
        </p>

        <div className="space-y-5">
          <div>
            <label className="block text-[12px] font-bold text-[#1C1917] mb-2">University / USN</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A8A29E]"><User size={16} /></div>
              <input 
                type="text" 
                value={usn}
                onChange={(e) => setUsn(e.target.value)}
                className="w-full h-11 bg-white border border-[#E7E5E4] rounded-[8px] pl-10 pr-4 text-[13px] font-medium focus:outline-none focus:border-[#1C1917]"
                placeholder="Enter your USN"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-[#A8A29E]">e.g. 1EP24CS001</div>
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#1C1917] mb-2">Student Email <span className="text-[#A8A29E] font-normal">(optional)</span></label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A8A29E]"><Mail size={16} /></div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 bg-white border border-[#E7E5E4] rounded-[8px] pl-10 pr-4 text-[13px] font-medium focus:outline-none focus:border-[#1C1917]"
                placeholder="Enter your college email"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-[#A8A29E]">@epcet.edu.in</div>
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#1C1917] mb-2">Password</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A8A29E]"><Lock size={16} /></div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 bg-white border border-[#E7E5E4] rounded-[8px] pl-10 pr-16 text-[13px] font-medium focus:outline-none focus:border-[#1C1917] tracking-wider"
                placeholder="Enter your password"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-bold text-[#78716C] hover:text-[#1C1917]">Show</button>
            </div>
          </div>

          <div className="bg-[#FEF3C7] rounded-[8px] p-4 flex items-start gap-3 mt-6 border border-[#FDE68A]">
            <Info size={16} className="text-[#D97706] shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-[12px] font-bold text-[#92400E]">Use your college email</div>
              <div className="text-[11px] text-[#B45309]">OTP will be sent if password fails.</div>
            </div>
            <button className="text-[11px] font-bold text-[#D97706] hover:underline whitespace-nowrap">Forgot password?</button>
          </div>

          <button 
            onClick={() => setActive(5)}
            className="w-full h-11 bg-[#1C1917] hover:bg-[#292524] text-white rounded-[8px] text-[13px] font-bold transition-all mt-6 flex items-center justify-center gap-2"
          >
            Continue to Student Dashboard <ArrowRight size={14} />
          </button>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#E7E5E4]"></div>
            <div className="text-[11px] text-[#A8A29E] font-medium uppercase tracking-wider">or</div>
            <div className="flex-1 h-px bg-[#E7E5E4]"></div>
          </div>

          <button className="w-full h-11 bg-white hover:bg-[#F5F5F0] text-[#1C1917] border border-[#E7E5E4] rounded-[8px] text-[13px] font-bold transition-all flex items-center justify-center gap-2">
            Register as new student <FileText size={14} className="text-[#A8A29E]" />
          </button>

          <div className="text-center text-[11px] text-[#A8A29E] mt-8">
            Having trouble? <button className="hover:text-[#1C1917] underline">Contact your college admin</button>
          </div>
        </div>
      </div>

    </div>
  );
}
`;
    appTsx = appTsx.substring(0, loginStart) + newStudentLoginFlow + appTsx.substring(loginEnd);
}

// Now add BACK button to Flow4 Top Navbar
const flow4NavStart = appTsx.indexOf('className="serif text-[16px] font-bold text-[#1C1917] leading-tight hidden sm:block">EduFeedback Pro</div>');
if (flow4NavStart !== -1) {
    const injectionPoint = appTsx.indexOf('</div>', flow4NavStart); // end of the EduFeedback Pro div
    if (injectionPoint !== -1) {
        // Find the end of the `<div>` containing the logo and title
        const endOfLogoDiv = appTsx.indexOf('</div>', injectionPoint + 6) + 6;
        
        const backBtnStr = `
          <button 
            onClick={() => setActive(0)} 
            className="ml-6 px-4 py-1.5 rounded-full border border-[#E7E5E4] text-[12px] font-bold text-[#1C1917] hover:bg-[#F5F5F0] transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={14} /> BACK
          </button>
`;
        // insert after the `<div className="flex items-center gap-3">...</div>`
        appTsx = appTsx.substring(0, endOfLogoDiv) + backBtnStr + appTsx.substring(endOfLogoDiv);
    }
}

fs.writeFileSync('src/App.tsx', appTsx);
console.log('Done redesigning student login and adding back button');
