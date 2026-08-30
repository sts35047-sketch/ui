const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = content.indexOf('function CollegeAdminDashboard({ setActive }');
if (startIdx === -1) {
    console.error("Function not found");
    process.exit(1);
}

const newDashboard = `function CollegeAdminDashboard({ setActive }: any) {
  const [navTab, setNavTab] = useState('Admin Setup');

  return (
    <div className="min-h-screen bg-[#F5F1E8] font-sans selection:bg-[#D97706]/20 overflow-x-hidden flex flex-col pb-16">
      {/* Top Navbar */}
      <div className="h-[80px] flex items-center justify-between px-8 shrink-0 z-50 sticky top-0 bg-[#F5F1E8]/80 backdrop-blur-xl border-b border-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1C1917] rounded-[12px] flex items-center justify-center text-[18px]">🎓</div>
          <div>
            <div className="font-bold text-[16px] text-[#1C1917] leading-tight">EduFeedback Pro</div>
            <div className="text-[9px] font-bold text-[#A8A29E] tracking-widest flex items-center gap-1.5 mt-0.5 uppercase">
              <span>WARM</span> <span>•</span> <span>HUMAN</span> <span>•</span> <span>EPCET</span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-white/70 backdrop-blur-md border border-[#E7E5E4] rounded-full p-1.5 shadow-sm">
          {['Faculty Login', 'Admin Setup', 'Overview', 'Leaderboard', 'Activity'].map(tab => (
            <button 
              key={tab} 
              onClick={() => { if(tab !== 'Faculty Login') setNavTab(tab); }}
              className={\`px-5 py-2 text-[13px] font-medium rounded-full transition-all \${navTab === tab ? 'bg-[#1C1917] text-white shadow-md' : 'text-[#78716C] hover:bg-white hover:text-[#1C1917]'}\`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-[#E7E5E4] flex items-center justify-center text-[#78716C] hover:text-[#1C1917] hover:bg-white shadow-sm transition-all">🔔</button>
          <button className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-[#E7E5E4] flex items-center justify-center text-[#78716C] hover:text-[#1C1917] hover:bg-white shadow-sm transition-all">👤</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-[1100px] mx-auto px-6 py-12 flex flex-col gap-8">
        
        {navTab === 'Admin Setup' && (
          <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="serif text-[40px] text-[#1C1917] leading-tight mb-3 flex items-center gap-3">
                  Welcome back, Lokesh <span>👋</span>
                </h1>
                <p className="text-[15px] text-[#57534E] max-w-[500px] leading-relaxed">
                  Your EPCET Demo is ready — let's set up batches so students can share honest feedback. Only 2 steps left.
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-[#E7E5E4] rounded-full px-5 py-2.5 flex items-center gap-3 shadow-sm shrink-0">
                <span className="text-[11px] font-bold text-[#A8A29E] tracking-widest uppercase">SETUP CHECKLIST</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E7E5E4]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E7E5E4]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E7E5E4]"></div>
                </div>
                <span className="text-[12px] font-medium text-[#78716C]">2/5 done</span>
              </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-[24px] p-8 shadow-sm flex flex-col sm:flex-row gap-8 hover:-translate-y-0.5 transition-transform duration-300">
                <div className="w-32 h-32 rounded-[16px] bg-[#FAFAFA] border border-[#F5F5F0] flex flex-col items-center justify-center shrink-0">
                  <div className="text-[40px] opacity-20">🧊</div>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="serif text-[22px] text-[#1C1917] mb-3">Your college is fresh — create your first batch</h3>
                  <p className="text-[14px] text-[#78716C] leading-relaxed mb-6">Batches help organize feedback by year — e.g., <strong className="font-semibold text-[#1C1917]">2024-28 CSE</strong>. Students join via link, faculty see live insights. No CSV needed to start.</p>
                  <div className="flex items-center gap-4">
                    <button className="px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-white text-[14px] font-bold rounded-[12px] shadow-[0_4px_14px_0_rgba(245,158,11,0.39)] transition-all flex items-center gap-2">
                      Create First Batch <span>→</span>
                    </button>
                    <button className="px-6 py-3 bg-white border border-[#E7E5E4] hover:border-[#D97706]/30 text-[#1C1917] text-[14px] font-medium rounded-[12px] shadow-sm transition-all">
                      See example
                    </button>
                    <span className="text-[12px] text-[#A8A29E] mono ml-2">Takes ~20 sec</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { title: "Create Batch", sub: "2024-28 CSE • 60 students", icon: "📄", bg: "bg-[#FEF3C7]" },
                  { title: "Invite Faculty", sub: "Add HODs & teachers", icon: "👥", bg: "bg-[#DBEAFE]" },
                  { title: "Import Students", sub: "CSV or share link", icon: "📤", bg: "bg-[#DCFCE7]" }
                ].map((action, i) => (
                  <div key={i} className="bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-[16px] p-4 flex items-center justify-between shadow-sm cursor-pointer hover:border-[#D97706]/30 hover:-translate-y-0.5 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className={\`w-12 h-12 rounded-[12px] \${action.bg} flex items-center justify-center text-[20px]\`}>{action.icon}</div>
                      <div>
                        <div className="font-semibold text-[15px] text-[#1C1917] mb-0.5">{action.title}</div>
                        <div className="text-[12px] text-[#78716C]">{action.sub}</div>
                      </div>
                    </div>
                    <div className="text-[#A8A29E] group-hover:text-[#1C1917] transition-colors">›</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Global Filters */}
            <div className="bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-[24px] p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <h3 className="serif text-[22px] text-[#1C1917]">Global Filters</h3>
                <span className="text-[11px] text-[#A8A29E] mono">Filters apply to Overview & Leaderboard • Friendly defaults</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <div className="text-[10px] font-bold text-[#A8A29E] tracking-widest uppercase mb-2">ACADEMIC YEAR</div>
                  <div className="relative">
                    <select className="w-full h-[52px] bg-transparent border border-[#E7E5E4] rounded-[12px] px-4 text-[14px] text-[#78716C] appearance-none outline-none focus:border-[#D97706] transition-colors">
                      <option>Choose year — e.g., 2024-28</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A8A29E] pointer-events-none">⌄</div>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#A8A29E] tracking-widest uppercase mb-2">DEPARTMENT</div>
                  <div className="relative">
                    <select className="w-full h-[52px] bg-transparent border border-[#E7E5E4] rounded-[12px] px-4 text-[14px] text-[#78716C] appearance-none outline-none focus:border-[#D97706] transition-colors">
                      <option>Pick CSE, ECE...</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A8A29E] pointer-events-none">⌄</div>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#A8A29E] tracking-widest uppercase mb-2">SEMESTER</div>
                  <div className="relative">
                    <select className="w-full h-[52px] bg-transparent border border-[#E7E5E4] rounded-[12px] px-4 text-[14px] text-[#78716C] appearance-none outline-none focus:border-[#D97706] transition-colors">
                      <option>Select sem 1-8</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A8A29E] pointer-events-none">⌄</div>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#A8A29E] tracking-widest uppercase mb-2">FEEDBACK TYPE</div>
                  <div className="relative">
                    <select className="w-full h-[52px] bg-transparent border border-[#E7E5E4] rounded-[12px] px-4 text-[14px] text-[#78716C] appearance-none outline-none focus:border-[#D97706] transition-colors">
                      <option>Academic, Hostel...</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A8A29E] pointer-events-none">⌄</div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex items-start gap-2 text-[12px] text-[#A8A29E]">
                <span className="w-4 h-4 rounded-full border border-[#A8A29E] flex items-center justify-center text-[9px] shrink-0 font-bold mt-0.5">i</span>
                No batches yet — filters will show options after you create your first batch.
              </div>
            </div>
          </div>
        )}

        {navTab === 'Overview' && (
          <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="serif text-[40px] text-[#1C1917] leading-tight mb-2 flex flex-col">
                  Institute Overview
                  <svg className="w-32 h-2 text-[#F59E0B] mt-1" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </h1>
                <p className="text-[15px] text-[#78716C] max-w-[500px] mt-3">
                  A calm snapshot — not 7 identical cards. Real hierarchy, real color.
                </p>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#A8A29E] mono">
                <span>🕒</span> Last updated 2 min ago • Live from EPCET
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Large cards */}
              <div className="bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-[24px] p-8 shadow-sm flex flex-col justify-between min-h-[220px] hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center text-xl">👥</div>
                  <div className="px-3 py-1 bg-[#DCFCE7] text-[#059669] text-[11px] font-bold rounded-full mono tracking-wide">+12% this week</div>
                </div>
                <div>
                  <div className="text-[48px] font-serif text-[#1C1917] leading-none mb-2">1,248</div>
                  <div className="text-[14px] text-[#78716C] font-medium mb-6">Total Students</div>
                  <div className="w-full h-1.5 bg-[#F5F5F0] rounded-full overflow-hidden">
                    <div className="w-[72%] h-full bg-[#60A5FA] rounded-full"></div>
                  </div>
                  <div className="text-[10px] text-[#A8A29E] mono mt-3">72% verified emails • 48 new invites pending</div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-[24px] p-8 shadow-sm flex flex-col justify-between min-h-[220px] hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#DCFCE7] text-[#059669] flex items-center justify-center text-xl">🎓</div>
                  <div className="px-3 py-1 bg-[#F5F5F0] text-[#78716C] text-[11px] font-bold rounded-full mono tracking-wide">8 HODs</div>
                </div>
                <div>
                  <div className="text-[48px] font-serif text-[#1C1917] leading-none mb-2">86</div>
                  <div className="text-[14px] text-[#78716C] font-medium mb-6">Total Faculty</div>
                  <div className="flex -space-x-2">
                    {['A','B','C','D'].map(l => (
                      <div key={l} className="w-8 h-8 rounded-full bg-[#E7E5E4] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#78716C]">{l}</div>
                    ))}
                    <div className="w-8 h-8 rounded-full bg-[#1C1917] border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">+82</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-[24px] p-8 shadow-sm flex flex-col justify-between min-h-[220px] hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center text-xl">📊</div>
                  <div className="px-3 py-1 bg-[#FEF3C7] text-[#D97706] text-[11px] font-bold rounded-full mono tracking-wide">Live</div>
                </div>
                <div>
                  <div className="text-[48px] font-serif text-[#1C1917] leading-none mb-2">342</div>
                  <div className="text-[14px] text-[#78716C] font-medium mb-4">Academic Feedbacks</div>
                  <div className="flex items-center gap-2">
                    <div className="flex text-[#F59E0B] text-[18px]">★★★★<span className="text-[#E7E5E4]">★</span></div>
                    <span className="text-[12px] text-[#78716C] font-medium mt-1">4.2 avg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 4 mini cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/80 backdrop-blur-sm border border-[#E7E5E4] rounded-[16px] p-5 shadow-sm">
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#A8A29E] tracking-widest uppercase mb-3">
                  <span>🔗</span> ACTIVE BATCHES
                </div>
                <div className="text-[24px] font-serif text-[#1C1917] mb-1">3</div>
                <div className="text-[11px] text-[#78716C] mono">2024-28 running</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-[#E7E5E4] rounded-[16px] p-5 shadow-sm">
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#A8A29E] tracking-widest uppercase mb-3">
                  <span>📈</span> RESPONSE RATE
                </div>
                <div className="text-[24px] font-serif text-[#1C1917] mb-1">78%</div>
                <div className="text-[11px] text-[#78716C] mono">This month</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-[#E7E5E4] rounded-[16px] p-5 shadow-sm">
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#A8A29E] tracking-widest uppercase mb-3">
                  <span>⭐</span> AVG RATING
                </div>
                <div className="text-[24px] font-serif text-[#1C1917] mb-1">4.2</div>
                <div className="text-[11px] text-[#78716C] mono">★ across depts</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-[#E7E5E4] rounded-[16px] p-5 shadow-sm">
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#A8A29E] tracking-widest uppercase mb-3">
                  <span>🛡️</span> VERIFIED TODAY
                </div>
                <div className="text-[24px] font-serif text-[#1C1917] mb-1">12</div>
                <div className="text-[11px] text-[#78716C] mono">New logs</div>
              </div>
            </div>
          </div>
        )}

        {navTab === 'Activity' && (
          <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
              <h1 className="serif text-[36px] text-[#1C1917] leading-tight mb-2 flex flex-col">
                Feedback Activity
                <svg className="w-24 h-2 text-[#F59E0B] mt-1" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </h1>
              <p className="text-[15px] text-[#78716C] max-w-[600px] mt-4">
                Large human audit circle, soft chart, small certified footer — no big dark scary banner.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Chart */}
              <div className="bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-[24px] p-10 flex flex-col items-center justify-center text-center shadow-sm h-[400px]">
                <div className="relative w-40 h-40 mb-8">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#F5F5F0" strokeWidth="6" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#F59E0B" strokeWidth="6" strokeDasharray="283" strokeDashoffset="186" strokeLinecap="round" className="animate-[spin_1.5s_ease-out_reverse]" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[32px] font-serif text-[#1C1917] leading-none">34%</span>
                    <span className="text-[9px] font-bold text-[#A8A29E] tracking-widest uppercase mt-1">PARTICIPATED</span>
                  </div>
                </div>
                <h3 className="serif text-[20px] text-[#1C1917] mb-2">34% students participated</h3>
                <p className="text-[13px] text-[#78716C] leading-relaxed max-w-[240px] mb-6">
                  124 of 360 students shared feedback this week. Gentle nudge helps — not spam.
                </p>
                <button className="px-6 py-2.5 bg-[#1C1917] text-white text-[13px] font-medium rounded-full shadow-sm hover:scale-95 transition-transform flex items-center gap-2">
                  <span>✉</span> Send reminder to students
                </button>
                <div className="text-[11px] text-[#A8A29E] mono mt-4">
                  Last reminder: 2 days ago • Open rate 62%
                </div>
              </div>

              {/* Right Chart */}
              <div className="bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-[24px] p-8 flex flex-col shadow-sm h-[400px]">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="serif text-[18px] text-[#1C1917] font-semibold">Volume distribution</h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#A8A29E] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span> This week
                  </div>
                </div>
                
                <div className="flex-1 border border-[#E7E5E4] border-dashed rounded-[16px] bg-[#FAFAFA] flex flex-col items-center justify-center p-6 relative">
                  <svg width="100" height="40" viewBox="0 0 100 40" fill="none" className="opacity-20 mb-4">
                    <path d="M0 20 Q 25 5, 50 20 T 100 20" stroke="#1C1917" strokeWidth="2" strokeDasharray="4 4" />
                    <circle cx="25" cy="12.5" r="3" fill="#1C1917" />
                    <circle cx="75" cy="27.5" r="3" fill="#1C1917" />
                  </svg>
                  <p className="text-[11px] text-[#A8A29E] mono text-center max-w-[280px]">
                    If no data yet - we show dotted outline + "No data yet" illustration, not blank white card. Human empty state.
                  </p>
                  
                  {/* Axis labels */}
                  <div className="absolute bottom-[-24px] left-0 right-0 flex justify-between px-8 text-[9px] text-[#A8A29E] mono">
                    <span>D1</span><span>D2</span><span>D3</span><span>D4</span><span>D5</span><span>D6</span><span>D7</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer Elements */}
            <div className="mt-4 flex flex-col gap-4">
              <div className="bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-full px-6 py-3 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-2 text-[12px] text-[#78716C] mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span> Database certified • Last audit 0ms ago • Encrypted at rest
                </div>
                <div className="flex items-center gap-4 text-[12px] text-[#78716C] mono">
                  <span>12 logs today</span>
                  <span className="px-2 py-0.5 bg-[#F5F5F0] rounded-md font-bold text-[#1C1917]">99.9% uptime</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/80 backdrop-blur-sm border border-[#E7E5E4] rounded-[16px] p-5 shadow-sm">
                  <div className="serif text-[15px] font-semibold text-[#1C1917] mb-1">Imperfect spacing</div>
                  <div className="text-[12px] text-[#78716C] leading-relaxed">24px, 32px, 40px — not uniform 16px. Feels hand-placed.</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm border border-[#E7E5E4] rounded-[16px] p-5 shadow-sm">
                  <div className="serif text-[15px] font-semibold text-[#1C1917] mb-1">No all-caps shouting</div>
                  <div className="text-[12px] text-[#78716C] leading-relaxed">Sentence case, Newsreader titles, mono 10-11px labels. Calm.</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm border border-[#E7E5E4] rounded-[16px] p-5 shadow-sm">
                  <div className="serif text-[15px] font-semibold text-[#1C1917] mb-1">Hover lift 2px</div>
                  <div className="text-[12px] text-[#78716C] leading-relaxed">Soft shadow, active scale 0.98, focus ring amber 2px, 200ms.</div>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-[#A8A29E] mono mt-4 pb-8">
                <div>Designed like Linear + Notion + Stripe • Warm paper #F5F1E8 • Human microcopy • Bento, not grid</div>
                <div><span className="text-[#F59E0B]">★</span> EduFeedback Pro - human best</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Placeholder for Leaderboard */}
        {navTab === 'Leaderboard' && (
          <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full justify-center items-center text-center py-20">
             <div className="text-[40px] opacity-30 mb-4">🏆</div>
             <h2 className="serif text-[28px] text-[#1C1917]">Department Leaderboard</h2>
             <p className="text-[#78716C] mt-2 max-w-sm">Rankings will appear here once the first feedback cycle completes.</p>
          </div>
        )}

      </div>
    </div>
  );
}
`

content = content.substring(0, startIdx) + newDashboard;
fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Rewritten dashboard completely");
