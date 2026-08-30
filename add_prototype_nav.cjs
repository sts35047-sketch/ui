const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
const search = `  return (
    <div className="border-x border-b border-[#E7E5E4] rounded-b-[16px] overflow-hidden mx-4 sm:mx-6 bg-[#FCFCF9] flex flex-col h-[calc(100vh-64px-32px)] font-sans">
      
      {/* Header */}`;
const replacement = `  return (
    <div className="overflow-hidden bg-[#FCFCF9] flex flex-col h-screen font-sans">
      
      {/* Top Prototype Navigation Bar */}
      <div className="h-[56px] border-b border-[#E7E5E4] bg-white flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1C1917] rounded-[8px] flex items-center justify-center text-[14px]">🎓</div>
          <div>
            <div className="font-bold text-[14px] text-[#1C1917] leading-tight">EduFeedback Pro</div>
            <div className="text-[9px] font-bold text-[#A8A29E] tracking-widest flex items-center gap-2 mt-0.5">
              <span>WARM</span> <span className="w-1 h-1 rounded-full bg-[#E7E5E4]"></span> <span>#FCFCF9</span> <span className="w-1 h-1 rounded-full bg-[#E7E5E4]"></span> <span>8PX GRID</span> <span className="w-1 h-1 rounded-full bg-[#E7E5E4]"></span> <span>16PX RADIUS</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          {['Faculty Login', 'Admin Dashboard', 'Institute Overview', 'Department Leaderboard', 'Feedback Activity'].map(tab => (
            <button key={tab} className={\`px-4 py-2 text-[13px] font-medium rounded-full transition-colors \${tab === 'Admin Dashboard' ? 'bg-[#1C1917] text-white' : 'text-[#78716C] hover:bg-[#FAFAFA] hover:text-[#1C1917]'}\`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-[11px] font-bold text-[#A8A29E] tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-[#10B981]"></span> LIVE PREVIEW
        </div>
      </div>

      <div className="border border-[#E7E5E4] rounded-[16px] overflow-hidden m-4 sm:m-6 bg-[#FCFCF9] flex flex-col flex-1 shadow-sm">
        {/* Header */}`;
content = content.replace(search, replacement);
fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Added prototype nav bar successfully");
