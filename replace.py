import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_idx = content.find('function CollegeAdminDashboard({ setActive }')
if start_idx == -1:
    print("Function not found")
    exit(1)

new_dashboard = """function CollegeAdminDashboard({ setActive }: any) {
  const [adminTab, setAdminTab] = useState('Dashboard');
  const sidebarSections = [
    { title: 'OVERVIEW', items: ['Dashboard', 'Institute Setup', 'Create Batch', 'Matrix Questions', 'Manage Students'] },
    { title: 'ENGAGEMENT', items: ['Suggestion Box', 'Notifications', 'Support Center'] },
    { title: 'SYSTEM', items: ['Settings', 'Subject Management'] }
  ];

  return (
    <div className="border-x border-b border-[#E7E5E4] rounded-b-[16px] overflow-hidden mx-4 sm:mx-6 bg-[#FCFCF9] flex flex-col h-[calc(100vh-64px-32px)] font-sans">
      
      {/* Header */}
      <div className="h-[64px] bg-white border-b border-[#E7E5E4] flex items-center justify-between px-6 shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1C1917] rounded-[10px] flex items-center justify-center text-xl">🎓</div>
          <div>
            <div className="font-bold text-[16px] text-[#1C1917] leading-none">EduFeedback Pro</div>
            <div className="text-[10px] font-semibold text-[#A8A29E] tracking-widest mt-1">ADMIN PANEL</div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E]">🔍</div>
            <input type="text" placeholder="Search..." className="w-[240px] h-[36px] bg-[#FCFCF9] border border-[#E7E5E4] rounded-full pl-9 pr-4 text-[13px] outline-none focus:border-[#D97706] transition-colors" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-full border border-[#E7E5E4] flex items-center justify-center text-[#78716C]">🔔</div>
              <div className="absolute -top-1 -right-1 bg-[#F59E0B] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">51</div>
            </div>
            <div className="hidden sm:block px-3 py-1 bg-[#FCFCF9] border border-[#E7E5E4] rounded-full text-[11px] font-medium text-[#78716C]">Last Active: 2m ago</div>
          </div>
          <div className="flex items-center gap-2 pl-4 border-l border-[#E7E5E4]">
            <div className="w-8 h-8 bg-[#1C1917] rounded-full text-white flex items-center justify-center font-bold text-[12px]">L</div>
            <div className="hidden sm:block">
              <div className="text-[12px] font-bold text-[#1C1917] leading-tight">LOKESH</div>
              <div className="text-[9px] text-[#A8A29E] font-bold tracking-widest">ADMIN</div>
            </div>
            <button className="ml-2 px-3 py-1 bg-white border border-[#E7E5E4] rounded-full text-[11px] font-medium hover:bg-[#FAFAFA]">Originals</button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar */}
        <div className="w-[240px] border-r border-[#E7E5E4] bg-white shrink-0 hidden md:flex flex-col justify-between py-6 overflow-y-auto">
          <div className="space-y-6 px-4">
            {sidebarSections.map((sec, sidx) => (
              <div key={sidx}>
                <div className="text-[10px] font-bold text-[#A8A29E] tracking-widest mb-2 px-3">{sec.title}</div>
                <div className="space-y-0.5">
                  {sec.items.map((item) => (
                    <button
                      key={item}
                      onClick={() => setAdminTab(item)}
                      className={`w-full text-left px-3 py-2 rounded-[8px] text-[13px] font-medium transition-all flex items-center gap-2 ${adminTab === item ? "bg-[#1C1917] text-white" : "text-[#78716C] hover:bg-[#FAFAFA]"}`}
                    >
                      <span className="opacity-60">{item === 'Dashboard' ? '📊' : item === 'Institute Setup' ? '🏛️' : item === 'Create Batch' ? '➕' : item === 'Matrix Questions' ? '❓' : item === 'Manage Students' ? '👥' : item === 'Suggestion Box' ? '📥' : item === 'Notifications' ? '🔔' : item === 'Support Center' ? '🎧' : item === 'Settings' ? '⚙️' : '📚'}</span>
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 mt-6">
            <button onClick={() => setActive(0)} className="w-full text-left px-4 py-2 text-[13px] font-medium text-[#DC2626] border border-[#FECACA] rounded-[8px] hover:bg-[#FEF2F2] transition-colors flex items-center gap-2">
              <span>↪</span> Sign Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-[#FCFCF9]">
          {adminTab === 'Dashboard' ? (
            <div className="max-w-[1000px] mx-auto space-y-6 pb-12">
              
              <div className="text-[14px] text-[#78716C] mb-4">Manage your institution's academic performance and feedback ecosystem.</div>
              
              {/* Top Banner */}
              <div className="bg-[#FCF9F0] border border-[#FDE68A] rounded-[16px] p-6 flex flex-col sm:flex-row sm:items-center justify-between shadow-sm gap-4">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-white border border-[#FDE68A] flex items-center justify-center text-[#D97706] text-xl shrink-0">⭐</div>
                  <div>
                    <h2 className="serif text-[22px] text-[#1C1917]">Enterprise Dashboard</h2>
                    <p className="text-[13px] text-[#78716C] mt-1">Consolidated academic performance across all departments and batches.</p>
                  </div>
                </div>
                <button className="px-5 py-2.5 bg-[#1C1917] text-white rounded-full text-[13px] font-medium transition-colors hover:bg-black shadow-sm flex items-center gap-2 shrink-0">
                  <span>↻</span> Reload Cache
                </button>
              </div>

              {/* Yellow Alert */}
              <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-[16px] p-6 flex flex-col sm:flex-row sm:items-center justify-between shadow-sm mt-4 gap-4">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-white border border-[#FDE68A] flex items-center justify-center text-[#D97706] text-xl shrink-0 font-serif">!</div>
                  <div>
                    <h3 className="text-[16px] font-bold text-[#92400E]">No Academic Batches Created Yet</h3>
                    <p className="text-[13px] text-[#B45309] mt-1">Create your first batch to unlock analytics, leaderboards and feedback collection.</p>
                  </div>
                </div>
                <button className="px-6 py-2.5 bg-[#1C1917] text-white text-[13px] font-medium rounded-full transition-colors hover:bg-black shadow-sm whitespace-nowrap shrink-0">
                  Create First Batch →
                </button>
              </div>

              {/* Global Filters */}
              <div className="bg-white border border-[#E7E5E4] rounded-[16px] p-6 shadow-sm mt-4">
                <div className="text-[11px] font-bold text-[#A8A29E] tracking-widest uppercase mb-4">GLOBAL FILTERS</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { l: "Batch / Academic Year", v: "No Batches Created" },
                    { l: "Department Stream", v: "Select" },
                    { l: "Semester Level", v: "Select" },
                    { l: "Section Division", v: "Select" },
                  ].map(f => (
                    <div key={f.l}>
                      <div className="text-[12px] font-medium text-[#78716C] mb-2">{f.l}</div>
                      <select className="w-full text-[14px] text-[#1C1917] bg-white border border-[#E7E5E4] rounded-[8px] px-3 py-2 outline-none focus:border-[#D97706] appearance-none cursor-pointer">
                        <option>{f.v}</option>
                      </select>
                      {f.l === "Batch / Academic Year" && <div className="text-[11px] text-[#A8A29E] mt-1.5">No Batches Created</div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Grid 2x4 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                  { l: "TOTAL BATCHES", v: "0", icon: "📦", color: "text-[#D97706]", bg: "bg-[#FEF3C7]" },
                  { l: "TOTAL DEPARTMENTS", v: "5", icon: "🏢", color: "text-[#059669]", bg: "bg-[#DCFCE7]" },
                  { l: "TOTAL SUBJECTS", v: "0", icon: "📘", color: "text-[#2563EB]", bg: "bg-[#DBEAFE]" },
                  { l: "TOTAL FACULTY", v: "12", icon: "👥", color: "text-[#78716C]", bg: "bg-[#F5F5F0]" },
                  { l: "TOTAL STUDENTS", v: "0", icon: "🎓", color: "text-[#D97706]", bg: "bg-[#FEF3C7]" },
                  { l: "AVG RATING", v: "0.00", icon: "⭐", color: "text-[#D97706]", bg: "bg-[#FEF3C7]" },
                  { l: "PENDING REVIEWS", v: "3", icon: "💬", color: "text-[#9333EA]", bg: "bg-[#F3E8FF]" },
                  { l: "", v: "", icon: "", color: "", bg: "" }
                ].map((s, i) => s.l ? (
                  <div key={i} className="bg-white border border-[#E7E5E4] rounded-[16px] p-5 flex flex-col justify-between shadow-sm min-h-[120px]">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[14px] mb-3 border border-white/50 shadow-sm ${s.bg} ${s.color}`}>{s.icon}</div>
                    <div>
                      <div className="text-[10px] font-bold text-[#A8A29E] tracking-widest uppercase mb-1">{s.l}</div>
                      <div className="text-[24px] font-bold text-[#1C1917]">{s.v}</div>
                    </div>
                  </div>
                ) : <div key={i} className="bg-transparent border border-dashed border-[#E7E5E4] rounded-[16px]"></div>)}
              </div>

              {/* Insights and AI */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
                <div className="lg:col-span-2 bg-white border border-[#E7E5E4] rounded-[16px] p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
                    <div className="flex items-center gap-2 text-[#1C1917] text-[14px] font-bold">✨ Real-time Academic Insights</div>
                    <div className="w-max px-3 py-1 bg-[#DCFCE7] text-[#059669] text-[10px] font-bold rounded-full tracking-widest">COMPUTED LIVE</div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-6 gap-x-4">
                    <div>
                      <div className="text-[10px] font-bold text-[#A8A29E] tracking-widest uppercase mb-1">BEST PERFORMING DEPARTMENT</div>
                      <div className="text-[14px] font-bold text-[#1C1917]">No responses yet</div>
                      <div className="text-[12px] text-[#78716C]">Awaiting feedback</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#A8A29E] tracking-widest uppercase mb-1">DEPARTMENT REQUIRING ATTENTION</div>
                      <div className="text-[14px] font-bold text-[#1C1917]">No responses yet</div>
                      <div className="text-[12px] text-[#78716C]">No low ratings</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#A8A29E] tracking-widest uppercase mb-1">MOST ACTIVE BATCH</div>
                      <div className="text-[14px] font-bold text-[#1C1917]">No responses yet</div>
                      <div className="text-[12px] text-[#78716C]">0% participation</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#A8A29E] tracking-widest uppercase mb-1">TOP RATED FACULTY</div>
                      <div className="text-[14px] font-bold text-[#1C1917]">No responses yet</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#A8A29E] tracking-widest uppercase mb-1">FEEDBACK</div>
                      <div className="text-[14px] font-bold text-[#1C1917]">No responses yet</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#A8A29E] tracking-widest uppercase mb-1">NO RESPONSES YET</div>
                      <div className="text-[14px] font-bold text-[#1C1917]">No responses yet</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1C1917] rounded-[16px] p-6 text-white shadow-sm flex flex-col">
                  <div className="text-[10px] font-bold tracking-widest text-[#FDE68A] uppercase mb-2">AI REPORT</div>
                  <h3 className="text-[20px] font-bold mb-3 text-white">Gemini Academic Compiler</h3>
                  <p className="text-[13px] text-[#A8A29E] leading-relaxed mb-6">Summarizes department performance, risk areas and next best actions for leadership review.</p>
                  <div className="mt-auto h-24 border border-white/10 rounded-[12px] bg-white/5 border-dashed relative">
                    <div className="absolute inset-0 flex items-center justify-center text-[12px] text-[#78716C]">No data to compile</div>
                  </div>
                </div>
              </div>

              {/* Leaderboard */}
              <div className="bg-white border border-[#E7E5E4] rounded-[16px] shadow-sm mt-8 overflow-hidden">
                <div className="px-6 py-5 border-b border-[#E7E5E4] flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div className="text-[11px] font-bold text-[#A8A29E] tracking-widest uppercase">COMPARING ACADEMIC SATISFACTION INDEX ACROSS DEPARTMENTS</div>
                  <div className="w-max px-3 py-1 bg-[#FAFAFA] border border-[#E7E5E4] rounded-full text-[11px] font-medium text-[#78716C]">6 Departments</div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="border-b border-[#E7E5E4] bg-[#FCFCF9]">
                        <th className="py-4 px-6 text-[11px] font-bold text-[#A8A29E] tracking-wider w-[10%]">RANK</th>
                        <th className="py-4 px-6 text-[11px] font-bold text-[#A8A29E] tracking-wider w-[40%]">DEPARTMENT</th>
                        <th className="py-4 px-6 text-[11px] font-bold text-[#A8A29E] tracking-wider text-right">RATING</th>
                        <th className="py-4 px-6 text-[11px] font-bold text-[#A8A29E] tracking-wider text-right">BENCHMARK</th>
                        <th className="py-4 px-6 text-[11px] font-bold text-[#A8A29E] tracking-wider text-center">TREND</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { r: "#1", d: "CSE", s: "Computer Science", rt: "4.60", b: "4.20/5.00", bg: "bg-[#DCFCE7] text-[#059669]", tr: "↗" },
                        { r: "#2", d: "IT", s: "Information Tech", rt: "4.20", b: "4.00/5.00", bg: "bg-[#DCFCE7] text-[#059669]", tr: "↗" },
                        { r: "#3", d: "ECE", s: "Electronics", rt: "3.80", b: "3.90/5.00", bg: "bg-[#FEF3C7] text-[#D97706]", tr: "↘" },
                        { r: "#4", d: "AI/ML", s: "Artificial Intel", rt: "3.40", b: "3.80/5.00", bg: "bg-[#FEF3C7] text-[#D97706]", tr: "↘" },
                        { r: "#5", d: "ME", s: "Mechanical", rt: "0.00", b: "0.00/5.00", bg: "bg-[#F5F5F0] text-[#A8A29E]", tr: "—" },
                        { r: "#6", d: "CE", s: "Civil", rt: "0.00", b: "0.00/5.00", bg: "bg-[#F5F5F0] text-[#A8A29E]", tr: "—" },
                      ].map((row, i) => (
                        <tr key={row.d} className="border-b border-[#E7E5E4] last:border-0 hover:bg-[#FAFAFA]">
                          <td className="py-4 px-6 text-[13px] text-[#A8A29E] font-mono">{row.r}</td>
                          <td className="py-4 px-6">
                            <div className="font-bold text-[14px] text-[#1C1917]">{row.d}</div>
                            <div className="text-[12px] text-[#78716C]">{row.s}</div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-[6px] text-[13px] font-bold ${row.bg}`}>
                              {row.rt} ★
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right text-[13px] text-[#A8A29E] font-mono">{row.b}</td>
                          <td className="py-4 px-6 text-center text-[16px] text-[#78716C] font-mono">{row.tr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 bg-[#FCFCF9] border-t border-[#E7E5E4] flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div className="text-[12px] text-[#78716C]">Empty slots show 0.00 amber — collect first feedback to populate.</div>
                  <button className="px-4 py-2 bg-[#1C1917] text-white text-[12px] font-medium rounded-full shadow-sm whitespace-nowrap">Export CSV</button>
                </div>
              </div>

              {/* Feedback Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="bg-white border border-[#E7E5E4] rounded-[16px] p-6 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-8">
                    <div className="text-[11px] font-bold text-[#A8A29E] tracking-widest uppercase">AUDIT COMPLETION RATE</div>
                    <div className="px-3 py-1 bg-[#DCFCE7] text-[#059669] text-[10px] font-bold rounded-full tracking-widest">LIVE</div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-8 mb-8">
                    <div className="w-24 h-24 rounded-full border-[8px] border-[#F5F5F0] flex items-center justify-center flex-col shrink-0 mx-auto sm:mx-0">
                      <div className="text-[20px] font-bold text-[#1C1917]">0.0%</div>
                      <div className="text-[9px] font-bold text-[#A8A29E] uppercase tracking-widest mt-1">AUDIT</div>
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="text-[14px] font-bold text-[#1C1917] mb-1">No audit started</div>
                      <p className="text-[13px] text-[#78716C] leading-relaxed mb-4">Create a batch and invite students to start the feedback cycle. Progress updates in real-time.</p>
                      <button className="px-4 py-2 bg-[#F5F5F0] text-[#1C1917] text-[13px] font-medium rounded-full hover:bg-[#E7E5E4] transition-colors">Invite Students</button>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-6 border-t border-[#E7E5E4]">
                    <div className="flex justify-between items-center text-[13px]">
                      <span className="text-[#78716C]">Student Participation</span>
                      <span className="font-medium text-[#1C1917]">0 / 0 <span className="text-[#A8A29E] font-normal">Students</span></span>
                    </div>
                    <div className="flex justify-between items-center text-[13px]">
                      <span className="text-[#78716C]">Total Responses</span>
                      <span className="font-medium text-[#1C1917]">0 <span className="text-[#A8A29E] font-normal">feedbacks</span></span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[#E7E5E4] rounded-[16px] p-6 shadow-sm flex flex-col">
                  <div className="text-[11px] font-bold text-[#A8A29E] tracking-widest uppercase mb-6">DEPARTMENT FEEDBACK VOLUME DISTRIBUTION</div>
                  <div className="flex-1 bg-[#FCFCF9] border border-[#E7E5E4] rounded-[12px] flex items-end justify-between px-6 pb-8 pt-12 relative min-h-[160px]">
                    {/* Mock grid lines */}
                    <div className="absolute inset-x-0 top-6 border-b border-[#E7E5E4] opacity-50"></div>
                    <div className="absolute inset-x-0 top-12 border-b border-[#E7E5E4] opacity-50"></div>
                    <div className="absolute inset-x-0 top-18 border-b border-[#E7E5E4] opacity-50"></div>
                    
                    {['CSE', 'ECE', 'ME', 'CE', 'IT'].map(d => (
                      <div key={d} className="flex flex-col items-center gap-2 relative z-10">
                        <div className="w-8 h-4 bg-[#E7E5E4] rounded-t-[4px]"></div>
                        <div className="text-[10px] font-bold text-[#A8A29E]">{d}</div>
                      </div>
                    ))}
                    <div className="absolute bottom-3 left-0 right-0 text-center text-[11px] text-[#A8A29E]">No feedback yet — bars show capacity placeholder</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <button className="px-4 py-2.5 bg-white border border-[#E7E5E4] text-[#1C1917] text-[13px] font-medium rounded-full hover:bg-[#FAFAFA]">View Details</button>
                    <button className="px-4 py-2.5 bg-[#1C1917] text-white text-[13px] font-medium rounded-full hover:bg-black transition-colors">Reset View</button>
                  </div>
                </div>
              </div>
              
              {/* Security Lock Bottom */}
              <div className="mt-8 bg-[#1C1917] rounded-[16px] p-6 flex flex-col sm:flex-row sm:items-center justify-between shadow-md gap-4">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#D97706]/10 border border-[#D97706]/30 flex items-center justify-center text-[#FDE68A] text-xl shrink-0">🔒</div>
                  <div>
                    <h3 className="text-[12px] sm:text-[14px] font-bold text-white tracking-widest uppercase mb-1">ENTERPRISE SECURITY LOCK — FEEDBACK ENCRYPTED AT REST</h3>
                    <p className="text-[12px] sm:text-[13px] text-[#A8A29E]">Anonymous collection, role-based access, audit trail enabled for compliance.</p>
                  </div>
                </div>
                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[12px] text-[#A8A29E] font-mono shrink-0 whitespace-nowrap">
                  Selected Batch: —
                </div>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-white border border-[#E7E5E4] rounded-2xl flex items-center justify-center text-[24px] mb-4 shadow-sm">🚧</div>
              <h3 className="serif text-[24px] text-[#1C1917]">{adminTab}</h3>
              <p className="text-[14px] text-[#78716C] mt-2 max-w-sm">This module is part of the College Admin dashboard but is currently under construction in the demo environment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
"""

content = content[:start_idx] + new_dashboard
with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Replaced successfully")
