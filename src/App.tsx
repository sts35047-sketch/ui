import { useState, useEffect, useRef } from 'react';
import logoUrl from './logo.png';

const tabs = ["Choose Role", "College Login", "HOD & Faculty", "Student Login", "NoteHub"] as const;

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => { if(darkMode) document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark'); }, [darkMode]);

  const [active, setActiveState] = useState(0);
  const [history, setHistory] = useState([0]);

  const setActive = (newActive: number) => {
    setHistory(prev => [...prev, newActive]);
    setActiveState(newActive);
  };

  const goBack = () => {
    setHistory(prev => {
      if (prev.length <= 1) return prev;
      const newHistory = prev.slice(0, -1);
      setActiveState(newHistory[newHistory.length - 1]);
      return newHistory;
    });
  };
  const [roleTab, setRoleTab] = useState<'HOD'|'Faculty'>('HOD');
  const [showPass, setShowPass] = useState(false);
  const [noteView, setNoteView] = useState<'search'|'cse5'>('search');
  const [instQuery, setInstQuery] = useState('');
  const [selectedInst, setSelectedInst] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const instRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (instRef.current && !instRef.current.contains(e.target as Node)) setInstQuery(''); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const institutions = ["East Point College of Engineering and Technology", "RVCE Bangalore", "PES University", "MSRIT", "EPCET Evening"];

  return (
    <div className="min-h-screen bg-[#FCFCF9] text-[#1C1917] antialiased selection:bg-[#DAA520]/20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&family=Newsreader:opsz,ital,wght@6..72,0,400;6..72,1,400;6..72,0,500;6..72,0,600;6..72,1,600&display=swap');
        *{font-family:"Geist",ui-sans-system,sans-serif}
        .serif{font-family:"Newsreader",serif}
        .mono{font-family:"Geist Mono",ui-monospace,monospace}
        ::-webkit-scrollbar{width:6px;height:6px}
        ::-webkit-scrollbar-thumb{background:#E7E5E4;border-radius:999px}
        button{user-select:none}
      `}</style>

      {/* Top Linear-like Segmented Control */}
      {active !== 6 && (
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-[#FCFCF9]/80 border-b border-[#E7E5E4]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="Logo" className="w-10 h-10 object-contain" />
            <span className="serif text-[15px] font-semibold tracking-tight hidden sm:block">EduFeedback Pro</span>
            {active !== 0 && (
              <button onClick={goBack} className="ml-4 px-3 py-1.5 rounded-full text-[12px] font-medium text-[#57534E] bg-[#F5F5F0] hover:bg-[#E7E5E4] transition-colors flex items-center gap-1">
                <span>&lt;</span> BACK
              </button>
            )}
            <span className="mono text-[10px] px-2 py-0.5 rounded-full bg-[#F5F5F0] border border-[#E7E5E4] text-[#78716C] hidden sm:inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" /> Live
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex p-1 rounded-full bg-[#F5F5F0] border border-[#E7E5E4] shadow-[0_1px_0_0_white_inset]">
              {tabs.map((t, i) => (
                <button
                  key={t}
                  onClick={() => setActive(i)}
                  className={`h-8 px-3.5 rounded-full text-[13px] font-medium transition-all ${active===i ? "bg-[#1C1917] text-white shadow-sm" : "text-[#78716C] hover:text-[#1C1917] hover:bg-white dark:bg-[#18181b]"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[13px]">
            <span className="text-[#78716C] hover:text-[#1C1917] cursor-pointer">Help</span>
            <span className="inline-flex items-center gap-1.5 mono text-[11px]"><span className="w-2 h-2 rounded-full bg-[#059669]" /> Operational</span>
          </div>
        </div>
      </div>
      )}

      <main className={active === 6 ? "" : "max-w-[1200px] mx-auto"}>
        {active===0 && <Flow1 setActive={setActive} />}
        {active===1 && <Flow2 setActive={setActive} showPass={showPass} setShowPass={setShowPass} />}
        {active===2 && <Flow3 roleTab={roleTab} setRoleTab={setRoleTab} instQuery={instQuery} setInstQuery={setInstQuery} selectedInst={selectedInst} setSelectedInst={setSelectedInst} institutions={institutions} instRef={instRef} showPass={showPass} setShowPass={setShowPass} />}
        {active===3 && <StudentLoginFlow setActive={setActive} />}
        {active===4 && <Flow5 noteView={noteView} setNoteView={setNoteView} />}
        {active===5 && <Flow4 setActive={setActive} />}
        {active===6 && <CollegeAdminDashboard setActive={setActive} />}
      </main>


    </div>
  );
}

function Flow1({ setActive }: { setActive:(n:number)=>void }) {
  const roles = [
    { icon:"🏛️", bg:"#FEF3C7", title:"College Admin", desc:"For principals & registrars", meta:"Manage 328 colleges • NAAC ready", action:1 },
    { icon:"👥", bg:"#FCE7F3", title:"HOD", desc:"Department oversight & faculty review", meta:"4,215 feedbacks • 28 faculty avg", action:2 },
    { icon:"🎓", bg:"#DBEAFE", title:"Faculty", desc:"View your teaching impact anonymously", meta:"98.4% attendance • 45k logs", action:2 },
    { icon:"📝", bg:"#DCFCE7", title:"Student", desc:"Attendance, feedback & notes in one place", meta:"Batch 2024-2028 • CSE • Sec A", action:3 },
  ];
  return (
    <div className="px-6 sm:px-10 pt-8 sm:pt-12 pb-8">
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#18181b] border border-[#E7E5E4] text-[12px]">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
          <span className="mono">✦ New — NAAC 2024 compliance report added</span>
        </div>
      </div>

      <h1 className="serif text-[34px] sm:text-[48px] leading-[0.95] tracking-[-0.03em] font-[500] text-center max-w-[640px] mx-auto">
        Feedback that helps teachers, <span className="italic font-[400]">not just measures them.</span>
      </h1>
      <p className="text-center text-[15px] sm:text-[16px] leading-6 text-[#78716C] max-w-[480px] mx-auto mt-4">
        Built for colleges like yours. Secure, simple, and actually used by students.
      </p>

      <div className="max-w-[680px] mx-auto mt-10">
        <div className="rounded-[16px] bg-white dark:bg-[#18181b] border border-[#E7E5E4] overflow-hidden">
          {roles.map((r, idx) => (
            <button key={r.title} onClick={()=>setActive(r.action)} className="group w-full flex items-center gap-4 px-5 py-5 text-left hover:bg-[#F5F5F4] border-b last:border-b-0 border-[#F5F5F4] transition-colors">
              <div className="w-12 h-12 rounded-[12px] flex items-center justify-center text-[20px] shrink-0" style={{background:r.bg}}>{r.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-[600] tracking-tight">{r.title}</span>
                  <span className="hidden sm:inline text-[12px] text-[#A8A29E]">— {r.desc}</span>
                </div>
                <div className="mono text-[11px] text-[#A8A29E] mt-0.5 truncate sm:hidden">{r.desc}</div>
                <div className="mono text-[11px] text-[#78716C] mt-1">{r.meta}</div>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-[13px] font-medium opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all">Enter →</span>
                <div className="w-8 h-8 rounded-full bg-[#1C1917] text-white flex items-center justify-center text-[14px] group-hover:bg-[#1C1917]">›</div>
              </div>
              <div className="sm:hidden w-7 h-7 rounded-full bg-[#1C1917] text-white flex items-center justify-center">›</div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 px-1">
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {[1,2,3,4,5].map(i=>(
                <div key={i} className="w-7 h-7 rounded-full border-2 border-[#FCFCF9] bg-[#F5F5F0] flex items-center justify-center text-[10px] font-medium">{String.fromCharCode(64+i)}</div>
              ))}
            </div>
            <span className="ml-3 text-[12px] text-[#78716C]">Trusted by CSE, ECE, ME departments across Karnataka</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white dark:bg-[#18181b] border border-[#E7E5E4] mono text-[10px]">
            <span className="w-5 h-5 rounded-full bg-[#1C1917] text-white flex items-center justify-center">N</span> NAAC A++ verified
          </div>
        </div>
      </div>
    </div>
  );
}

function Flow2({ setActive, showPass, setShowPass }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[40%_60%]  border-x border-b border-[#E7E5E4] bg-white dark:bg-[#18181b] rounded-b-[16px] overflow-hidden mx-4 sm:mx-6">
      <div className="bg-[#FEF3C7] p-8 sm:p-10 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white dark:bg-[#18181b] border border-[#E7E5E4] mono text-[10px]">COLLEGE OS • SECURE</div>
          <h2 className="serif text-[28px] leading-[1.1] tracking-tight mt-6">Run your institution from one place.</h2>
          <div className="mt-6 space-y-4">
            {[
              { t:"Manage departments", d:"Create HODs, faculty, sections in 2 clicks", i:"◧" },
              { t:"Track faculty performance", d:"Anonymous feedback, not ratings warfare", i:"◈" },
              { t:"Review student feedback", d:"Filter by subject, sentiment, semester", i:"◎" },
              { t:"Export NAAC reports", d:"One-click compliance PDFs — 2024 format", i:"⧉" },
            ].map(b=>(
              <div key={b.t} className="flex gap-3">
                <div className="w-8 h-8 rounded-[10px] bg-white dark:bg-[#18181b] border border-[#E7E5E4] flex items-center justify-center text-[14px]">{b.i}</div>
                <div><div className="text-[13px] font-semibold">{b.t}</div><div className="text-[12px] text-[#78716C] leading-5">{b.d}</div></div>
              </div>
            ))}
          </div>
        </div>

        {/* illustration */}
        <div className="relative mt-10 h-[240px]">
          <svg viewBox="0 0 320 180" className="w-full h-full">
            <path d="M20 140 L20 60 L60 20 L100 60 L100 140" fill="none" stroke="#1C1917" strokeWidth="1.2" strokeLinecap="round"/>
            <rect x="38" y="75" width="14" height="18" rx="3" fill="none" stroke="#78716C" strokeWidth="1"/>
            <rect x="68" y="75" width="14" height="18" rx="3" fill="none" stroke="#78716C" strokeWidth="1"/>
            <rect x="38" y="105" width="44" height="22" rx="6" fill="white" stroke="#E7E5E4"/>
          </svg>
          <div className="absolute left-6 top-6 rotate-[-3deg] bg-white dark:bg-[#18181b] border border-[#E7E5E4] rounded-[12px] px-3 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <div className="mono text-[10px] text-[#A8A29E]">FEEDBACK</div>
            <div className="text-[16px] font-semibold leading-none mt-1">12.8k</div>
            <div className="text-[11px] text-[#059669] mt-1">↑ 12% this sem</div>
          </div>
          <div className="absolute right-8 bottom-8 rotate-[2deg] bg-[#1C1917] text-white rounded-[12px] px-3 py-2">
            <div className="mono text-[10px] opacity-70">SYLLABUS</div>
            <div className="text-[14px] font-medium">98.1% covered</div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-[#E7E5E4] lg:hidden" />
      </div>

      <div className="p-8 sm:p-12 flex justify-center">
        <div className="w-full max-w-[380px]">
          <button onClick={()=>setActive(0)} className="mono text-[12px] text-[#78716C] hover:text-[#1C1917] inline-flex items-center gap-1.5">← Back to roles</button>
          <h2 className="serif text-[28px] tracking-tight mt-6">College Admin access</h2>
          <p className="text-[13px] text-[#78716C] mt-2">Use your official college email. We’ll never share it.</p>

          <div className="mt-8 space-y-5">
            <div>
              <label className="text-[13px] font-medium">Work email</label>
              <div className="mt-2 relative">
                <input placeholder="principal@bmsce.ac.in" className="w-full h-[44px] rounded-[12px] border border-[#E7E5E4] bg-white dark:bg-[#18181b] px-3.5 text-[14px] outline-none focus:border-[#1C1917] focus:ring-4 focus:ring-[#1C1917]/5 transition-all" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#A8A29E] mono">.edu</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-medium">Password</label>
                <button onClick={()=>setShowPass(!showPass)} className="text-[12px] text-[#78716C] hover:text-[#1C1917]">{showPass ? "Hide" : "Show"}</button>
              </div>
              <input type={showPass ? "text" : "password"} placeholder="••••••••" className="mt-2 w-full h-[44px] rounded-[12px] border border-[#E7E5E4] bg-white dark:bg-[#18181b] px-3.5 text-[14px] outline-none focus:border-[#1C1917] focus:ring-4 focus:ring-[#1C1917]/5" />
              <div className="mt-2 mono text-[11px] text-[#059669]">✓ 12 characters • Encrypted</div>
            </div>

            <button onClick={() => setActive(6)} className="w-full h-[44px] rounded-[12px] bg-[#1C1917] text-white text-[14px] font-medium inline-flex items-center justify-center gap-2 hover:bg-black transition-colors">
              Continue to dashboard <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>

            <div className="flex items-center gap-3 py-2">
              <div className="h-[1px] flex-1 bg-[#E7E5E4]" />
              <span className="mono text-[11px] text-[#A8A29E]">or</span>
              <div className="h-[1px] flex-1 bg-[#E7E5E4]" />
            </div>

            <div className="flex items-center justify-between text-[13px]">
              <a className="text-[#78716C] hover:text-[#1C1917] underline underline-offset-4">Having trouble? Contact Super Admin</a>
            </div>
            <button className="w-full h-[44px] rounded-[12px] border border-[#E7E5E4] bg-white dark:bg-[#18181b] text-[13px] font-medium inline-flex items-center justify-center gap-2 hover:bg-[#F5F5F0]">
              Register your institution <span className="text-[#F59E0B]">↗</span>
            </button>

            <div className="mt-8 flex items-center gap-2 text-[11px] text-[#78716C] mono bg-[#F5F5F0] border border-[#E7E5E4] rounded-[12px] px-3 py-2.5">
              <span>🔒</span> SOC 2 compliant • Encrypted • Audit logged
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Flow3({ roleTab, setRoleTab, instQuery, setInstQuery, selectedInst, setSelectedInst, institutions, instRef, showPass, setShowPass }: any) {
  const filtered = institutions.filter((i:string)=> i.toLowerCase().includes(instQuery.toLowerCase()));
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[40%_60%]  border-x border-b border-[#E7E5E4] bg-white dark:bg-[#18181b] rounded-b-[16px] overflow-hidden mx-4 sm:mx-6">
      <div className={`${roleTab === 'HOD' ? 'bg-[#FCE7F3]' : 'bg-[#DBEAFE]'} p-8 sm:p-10 transition-colors duration-300`}>
        <div className="inline-flex gap-1.5 p-1 rounded-full bg-white dark:bg-[#18181b] border border-[#E7E5E4]">
          <button onClick={()=>setRoleTab('HOD')} className={`h-7 px-3 rounded-full text-[12px] font-medium ${roleTab==='HOD' ? "bg-[#1C1917] text-white" : "text-[#78716C]"}`}>HOD</button>
          <button onClick={()=>setRoleTab('Faculty')} className={`h-7 px-3 rounded-full text-[12px] font-medium ${roleTab==='Faculty' ? "bg-[#1C1917] text-white" : "text-[#78716C]"}`}>Faculty</button>
        </div>

        {roleTab==='HOD' ? (
          <>
            <h2 className="serif text-[26px] leading-[1.1] mt-6">Department oversight, without micromanaging.</h2>
            <p className="text-[13px] text-[#78716C] mt-3 leading-6">See real teaching quality, not vanity scores. Filter by subject, year, sentiment.</p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="bg-white dark:bg-[#18181b] border border-[#E7E5E4] rounded-[12px] p-3">
                <div className="mono text-[10px] text-[#A8A29E]">FEEDBACK</div>
                <div className="text-[18px] font-semibold mt-1">4,215</div>
                <div className="text-[11px] text-[#059669]">↑ 8.2%</div>
              </div>
              <div className="bg-white dark:bg-[#18181b] border border-[#E7E5E4] rounded-[12px] p-3">
                <div className="mono text-[10px] text-[#A8A29E]">FACULTY</div>
                <div className="text-[18px] font-semibold mt-1">28</div>
                <div className="text-[11px] text-[#78716C]">active</div>
              </div>
              <div className="bg-[#1C1917] text-white rounded-[12px] p-3">
                <div className="mono text-[10px] opacity-60">SYLLABUS</div>
                <div className="text-[18px] font-semibold mt-1">98.1%</div>
                <div className="text-[11px] opacity-70">on track</div>
              </div>
            </div>
            <div className="mt-6 rounded-[12px] bg-white dark:bg-[#18181b] border border-[#E7E5E4] p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F5F5F0] flex items-center justify-center">◧</div>
              <div className="text-[12px]"><span className="font-medium">CSE Department tree</span><div className="text-[#78716C] mono text-[11px]">Sections A • B • C • Labs</div></div>
            </div>
          </>
        ) : (
          <>
            <h2 className="serif text-[26px] leading-[1.1] mt-6">Your teaching impact, clearly shown.</h2>
            <p className="text-[13px] text-[#78716C] mt-3 leading-6">Anonymous feedback. Verified attendance logs. No public shaming — just useful insights.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="bg-white dark:bg-[#18181b] border border-[#E7E5E4] rounded-[12px] p-3">
                <div className="mono text-[10px] text-[#A8A29E]">ATTENDANCE</div>
                <div className="text-[20px] font-semibold mt-1">98.4%</div>
                <div className="text-[11px] text-[#059669]">verified logs</div>
              </div>
              <div className="bg-[#1C1917] text-white rounded-[12px] p-3">
                <div className="mono text-[10px] opacity-60">LOGS</div>
                <div className="text-[20px] font-semibold mt-1">45,210</div>
                <div className="text-[11px] opacity-70">since Aug</div>
              </div>
            </div>
            <div className="mt-6 rounded-[12px] bg-white dark:bg-[#18181b] border border-dashed border-[#E7E5E4] p-4">
              <div className="text-[12px] font-medium">How students see you</div>
              <div className="mt-2 flex gap-1.5">
                <span className="px-2 py-1 rounded-full bg-[#DCFCE7] text-[11px]">Clear explanations</span>
                <span className="px-2 py-1 rounded-full bg-[#DBEAFE] text-[11px]">Helpful</span>
                <span className="px-2 py-1 rounded-full bg-[#FEF3C7] text-[11px]">Fast doubt clearing</span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="p-8 sm:p-12 flex justify-center">
        <div className="w-full max-w-[380px]">
          <div className="inline-flex p-1 rounded-full bg-[#F5F5F0] border border-[#E7E5E4]">
            <button onClick={()=>setRoleTab('HOD')} className={`h-8 px-4 rounded-full text-[13px] font-medium transition ${roleTab==='HOD' ? "bg-[#1C1917] text-white" : "text-[#78716C]"}`}>HOD</button>
            <button onClick={()=>setRoleTab('Faculty')} className={`h-8 px-4 rounded-full text-[13px] font-medium transition ${roleTab==='Faculty' ? "bg-[#1C1917] text-white" : "text-[#78716C]"}`}>Faculty</button>
          </div>

          <h2 className="serif text-[26px] mt-6">{roleTab} access</h2>
          <p className="text-[13px] text-[#78716C] mt-2">{roleTab==='HOD' ? "Department-level view. Requires college verification." : "Personal teaching dashboard. Private to you."}</p>

          <div className="mt-7 space-y-5" ref={instRef}>
            <div>
              <label className="text-[13px] font-medium">Your institution</label>
              <div className="mt-2 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E]">🏛️</span>
                <input value={selectedInst ? selectedInst : instQuery} onChange={e=>{setInstQuery(e.target.value); setSelectedInst('');}} placeholder="Search and select institution..." className="w-full h-[44px] rounded-[12px] border border-[#E7E5E4] bg-white dark:bg-[#18181b] pl-9 pr-3 text-[14px] outline-none focus:border-[#1C1917] focus:ring-4 focus:ring-[#1C1917]/5" />
                {instQuery && filtered.length>0 && (
                  <div className="absolute z-20 mt-2 w-full rounded-[12px] bg-white dark:bg-[#18181b] border border-[#E7E5E4] shadow-[0_12px_24px_rgba(0,0,0,0.08)] overflow-hidden">
                    {filtered.map((f:string)=>(
                      <button key={f} onClick={()=>{setSelectedInst(f); setInstQuery('');}} className="w-full text-left px-3.5 py-2.5 text-[13px] hover:bg-[#F5F5F0]">{f}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {roleTab==='Faculty' && (
              <div>
                <label className="text-[13px] font-medium">Department</label>
                <div className={`mt-2 h-[44px] rounded-[12px] border bg-white dark:bg-[#18181b] px-3.5 flex items-center text-[14px] ${selectedInst ? "border-[#E7E5E4] text-[#1C1917]" : "border-dashed border-[#E7E5E4] text-[#A8A29E] bg-[#FCFCF9]"}`}>
                  {selectedInst ? (
                    <select className="w-full bg-transparent outline-none text-[14px]"><option>CSE — Computer Science</option><option>ECE</option><option>ME</option></select>
                  ) : "Select institution first..."}
                </div>
              </div>
            )}

            <div>
              <label className="text-[13px] font-medium">{roleTab} email</label>
              <input placeholder={roleTab==='HOD' ? "hod.cse@bmsce.ac.in" : "faculty@institution.edu"} className="mt-2 w-full h-[44px] rounded-[12px] border border-[#E7E5E4] bg-white dark:bg-[#18181b] px-3.5 text-[14px] outline-none focus:border-[#1C1917] focus:ring-4 focus:ring-[#1C1917]/5" />
              <div className="mt-1.5 mono text-[11px] text-[#78716C]">We’ll send a magic link if password fails.</div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-medium">Password</label>
                <button onClick={()=>setShowPass(!showPass)} className="text-[12px] text-[#78716C] hover:text-[#1C1917]">{showPass ? "Hide" : "Show"}</button>
              </div>
              <input type={showPass ? "text" : "password"} placeholder="••••••••" className="mt-2 w-full h-[44px] rounded-[12px] border border-[#E7E5E4] bg-white dark:bg-[#18181b] px-3.5 text-[14px] outline-none focus:border-[#1C1917] focus:ring-4 focus:ring-[#1C1917]/5" />
              {roleTab==='HOD' && <div className="mt-2 text-[11px] text-[#F59E0B] bg-[#FFFBEB] border border-[#FDE68A] rounded-[8px] px-2.5 py-1.5">Hint: Use college SSO if enabled.</div>}
            </div>

            <button className="w-full h-[44px] rounded-[12px] bg-[#1C1917] text-white text-[14px] font-medium hover:bg-black transition-colors">
              {roleTab==='HOD' ? "Continue to HOD panel →" : "Sign in to Faculty Portal →"}
            </button>

            <div className="pt-2 text-[12px] text-[#78716C]">Blocked? <span className="underline underline-offset-4 text-[#1C1917] cursor-pointer">Contact your College Admin</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}




function SubjectFeedbackFlow() {
  const [step, setStep] = useState(1);
  const [sem, setSem] = useState('');
  const [subject, setSubject] = useState('');

  const subjects = [
    { code: '21CS51', name: '21CS51', faculty: 'Teacher 1' },
    { code: '21CS52', name: '21CS52', faculty: 'Teacher 4' },
    { code: '21CS53', name: '21CS53', faculty: 'Teacher 7' },
    { code: '21CS54', name: '21CS54', faculty: 'Teacher 6' },
    { code: '21CS55', name: '21CS55', faculty: 'abcd123' },
  ];

  return (
    <div className="p-6 lg:p-10 bg-[#FCFCF9] min-h-full">
      {step > 1 && (
        <button 
          onClick={() => { setSem('Sem ' + s); setStep(2); }}
          className="mb-6 bg-white dark:bg-[#18181b] border border-[#E7E5E4] px-4 py-2 rounded-full text-sm font-medium text-[#44403C] hover:bg-[#F5F5F0] flex items-center gap-2 transition-all shadow-sm"
        >
          <span>←</span> Previous Step
        </button>
      )}

      <div className="bg-white dark:bg-[#18181b] rounded-3xl border border-[#E7E5E4] shadow-sm max-w-4xl mx-auto w-full p-12 flex flex-col items-center min-h-[400px]">
        
        {/* Stepper */}
        <div className="flex items-center gap-4 mb-10">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step > 1 ? 'bg-[#22C55E] text-white' : (step === 1 ? 'bg-[#4F46E5] text-white' : 'bg-[#F5F5F0] text-[#A8A29E]')}`}>
            {step > 1 ? '✓' : '1'}
          </div>
          <div className={`w-12 h-[2px] ${step > 1 ? 'bg-[#22C55E]' : 'bg-[#E7E5E4]'}`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step > 2 ? 'bg-[#22C55E] text-white' : (step === 2 ? 'bg-[#4F46E5] text-white' : 'bg-[#F5F5F0] text-[#A8A29E]')}`}>
            {step > 2 ? '✓' : '2'}
          </div>
          <div className={`w-12 h-[2px] ${step > 2 ? 'bg-[#22C55E]' : 'bg-[#E7E5E4]'}`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 3 ? 'bg-[#4F46E5] text-white' : 'bg-[#F5F5F0] text-[#A8A29E]'}`}>
            3
          </div>
        </div>

        {/* Step 1: Semester */}
        {step === 1 && (
          <div className="w-full flex flex-col items-center animate-[fadeIn_0.3s_ease]">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl mb-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(s => {
                const isSelected = sem === 'Sem ' + s;
                const year = 2024 - Math.floor((s - 1) / 2);
                return (
                  <div 
                    key={s} 
                    onClick={() => setSem('Sem ' + s)}
                    className={"relative h-44 rounded-[20px] flex flex-col items-center justify-between p-4 cursor-pointer transition-all " + (isSelected ? 'bg-[#FEF3C7] border-2 border-[#F59E0B] shadow-sm' : 'bg-white dark:bg-[#18181b] border border-[#E7E5E4] hover:border-[#F59E0B]/50')}
                  >
                    {/* Top indicators */}
                    <div className="w-full flex justify-between items-center h-6">
                      {isSelected ? (
                        <>
                          <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                          <div className="w-5 h-5 rounded-full bg-[#F59E0B] text-white flex items-center justify-center text-[10px] font-bold shadow-sm">✓</div>
                        </>
                      ) : <div />}
                    </div>
                    
                    {/* Icon */}
                    <div className={"w-10 h-10 rounded-full flex items-center justify-center text-lg mb-2 " + (isSelected ? 'bg-white dark:bg-[#18181b] shadow-sm text-[#F59E0B]' : 'bg-[#F5F5F0] text-[#A8A29E]')}>
                      🎓
                    </div>
                    
                    {/* Text */}
                    <div className="text-center">
                      <div className="font-serif font-bold text-[#1C1917] text-[17px]">Sem {s}</div>
                      <div className="mono text-[10px] text-[#A8A29E] mt-1 tracking-widest uppercase">CSE • {year}</div>
                    </div>
                    
                    {/* Progress Bar Line */}
                    <div className="w-full h-1 mt-4 rounded-full bg-[#F5F5F0] overflow-hidden">
                      {isSelected && <div className="h-full bg-[#F59E0B] w-full rounded-full" />}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="text-[13px] font-medium text-[#78716C] flex items-center gap-2 mb-8 bg-[#FCFCF9] border border-[#E7E5E4] px-5 py-2 rounded-full">
              <span className="text-lg">💡</span> Tip: You can change semester later in Profile
            </div>
            
            <button 
              onClick={() => sem ? setStep(2) : null}
              disabled={!sem}
              className={"px-8 py-3 rounded-full text-[14px] font-bold transition-all " + (sem ? 'bg-[#1C1917] text-white hover:bg-[#292524] shadow-md' : 'bg-[#E7E5E4] text-[#A8A29E] cursor-not-allowed opacity-50')}
            >
              Continue {sem ? 'with ' + sem : ''}
            </button>
          </div>
        )}


        {/* Step 2: Subject */}
        {step === 2 && (
          <div className="w-full flex flex-col items-center animate-[fadeIn_0.3s_ease]">
            <div className="text-sm font-bold text-[#78716C] tracking-widest uppercase mb-8">Select Subject / Course</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
              {subjects.map(sub => (
                <div 
                  key={sub.code}
                  onClick={() => { setSubject(sub.name); setStep(3); }}
                  className="p-5 rounded-2xl border border-[#E7E5E4] flex flex-col gap-3 cursor-pointer hover:border-[#4F46E5] hover:shadow-md transition-all bg-white dark:bg-[#18181b] hover:bg-[#F8F9FF]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F5F5F0] text-[#4F46E5] flex items-center justify-center text-lg">
                      📘
                    </div>
                    <div>
                      <div className="text-xs text-[#A8A29E] font-mono">{sub.code}</div>
                      <div className="text-base font-bold text-[#1C1917]">{sub.name}</div>
                    </div>
                  </div>
                  <div className="h-px bg-[#E7E5E4] w-full" />
                  <div className="text-sm text-[#57534E] flex items-center gap-2">
                    <span className="text-[#4F46E5]">👨‍🏫</span> Faculty: {sub.faculty}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Evaluation Criteria */}
        {step === 3 && (
          <div className="w-full flex flex-col items-center justify-center animate-[fadeIn_0.3s_ease] h-48">
            <p className="text-[#44403C] font-medium text-lg">No evaluation criteria configured for this session.</p>
          </div>
        )}

      </div>
    </div>
  );
}





function StudentLoginFlow({ setActive }: { setActive: (val: number) => void }) {
  return (
    <div className="flex justify-center p-2 sm:p-4">
      <div className="flex flex-col lg:flex-row w-full max-w-[1050px] bg-[#F0EBE1] rounded-[32px] overflow-hidden shadow-sm border border-stone-200 my-2">
        
        {/* Left Panel */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 relative flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🎓</span>
              <span className="font-serif text-[18px] text-stone-800 font-semibold tracking-tight">EduFeedback Pro</span>
            </div>
            
            <div className="flex justify-center mb-4">
              <div className="w-32 h-32 relative flex items-center justify-center opacity-80">
                <svg viewBox="0 0 200 200" fill="none" stroke="#292524" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                  <path d="M30 150 L170 150 L180 135 L40 135 Z" fill="#F5F5F0" />
                  <path d="M40 135 L180 135 L160 115 L20 115 Z" fill="#E7E5E4" />
                  <path d="M20 115 L160 115 L145 95 L5 95 Z" fill="#F5F5F0" />
                  <path d="M30 90 C 50 90 80 95 100 105 C 120 95 150 90 170 90 L 150 75 C 130 75 110 80 100 90 C 90 80 70 75 50 75 Z" fill="#ffffff" />
                  <path d="M100 105 L100 90" />
                  <path d="M100 30 L40 60 L100 90 L160 60 Z" fill="#292524" />
                  <path d="M60 70 L60 95 C 60 105 140 105 140 95 L140 70" />
                  <path d="M160 60 L160 90" />
                  <path d="M100 60 L125 85" strokeWidth="1.5" />
                  <circle cx="125" cy="85" r="3" fill="#F59E0B" stroke="none" />
                </svg>
              </div>
            </div>
            
            <h2 className="font-serif italic text-[24px] sm:text-[28px] text-stone-900 mb-6 text-center tracking-tight leading-tight">
              College-wide feedback, with trust.
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="bg-[#FEF3C7] rounded-[12px] p-3 flex flex-col items-center justify-center text-center shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center text-white mb-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <div className="font-serif text-[12px] font-medium leading-tight mb-1 text-stone-900">Secure College SSO</div>
                <div className="font-mono text-[7px] tracking-wider text-stone-600 uppercase">Single Sign-On</div>
              </div>
              <div className="bg-[#DCFCE7] rounded-[12px] p-3 flex flex-col items-center justify-center text-center shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#8ba492] flex items-center justify-center text-white mb-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18"/><path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2-4h14l2 4"/><path d="M5 21V10.85"/><path d="M19 21V10.85"/><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/></svg>
                </div>
                <div className="font-serif text-[12px] font-medium leading-tight mb-1 text-stone-900">All Departments</div>
                <div className="font-mono text-[7px] tracking-wider text-stone-600 uppercase">All Years • All Depts</div>
              </div>
              <div className="bg-[#DBEAFE] rounded-[12px] p-3 flex flex-col items-center justify-center text-center shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#5b87a8] flex items-center justify-center text-white mb-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/></svg>
                </div>
                <div className="font-serif text-[12px] font-medium leading-tight mb-1 text-stone-900">Anonymous Feedback</div>
                <div className="font-mono text-[7px] tracking-wider text-stone-600 uppercase">Secure • Private</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-[10px] text-stone-600 font-medium tracking-wide">
            Secure College SSO • VTU • Karnataka
          </div>
        </div>
        
        {/* Right Panel */}
        <div className="w-full lg:w-1/2 bg-white p-6 sm:p-8 relative flex flex-col">
          <div className="absolute top-4 right-4 lg:top-6 lg:right-6">
            <div className="bg-[#F59E0B] text-stone-900 px-3 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 shadow-sm border border-[#eab308]">
              Student Access 
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col justify-center max-w-[340px] mx-auto w-full mt-8 lg:mt-0">
            <h1 className="font-serif text-[32px] sm:text-[38px] leading-tight text-stone-900 mb-2 tracking-tight">Student Login</h1>
            <p className="text-stone-600 text-[13px] leading-relaxed mb-5 pr-2">
              Access attendance, marks, and give anonymous feedback. Your USN is your identity.
            </p>
            
            <div className="space-y-3">
              <div>
                <label className="block text-[12px] font-medium text-stone-900 mb-1">University / USN</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18"/><path d="M9 8h1"/><path d="M9 12h1"/><path d="M9 16h1"/><path d="M14 8h1"/><path d="M14 12h1"/><path d="M14 16h1"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/></svg>
                  </div>
                  <input type="text" defaultValue="1EP24CS001" className="w-full h-[40px] pl-9 pr-3 rounded-[8px] border border-[#E7E5E4] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/30 focus:border-[#F59E0B] text-stone-900 font-medium text-[13px]" />
                  <div className="absolute left-[34px] top-1/2 -translate-y-1/2 w-[80px] h-[18px] bg-[#FDE68A]/40 rounded -z-10 mix-blend-multiply pointer-events-none"></div>
                </div>
              </div>
              
              <div>
                <label className="block text-[12px] font-medium text-stone-900 mb-1">Student Email (optional)</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </div>
                  <input type="email" placeholder="student.email@epcet.edu.in" className="w-full h-[40px] pl-9 pr-3 rounded-[8px] border border-[#E7E5E4] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/30 focus:border-[#F59E0B] text-stone-800 placeholder:text-stone-500 text-[13px]" />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[12px] font-medium text-stone-900">Password</label>
                  <button className="text-[12px] text-[#D97706] hover:text-[#92400E] font-medium transition-colors">Forgot password?</button>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <input type="password" defaultValue="password123" className="w-full h-[40px] pl-9 pr-14 rounded-[8px] border border-[#E7E5E4] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/30 focus:border-[#F59E0B] text-stone-900 font-medium text-[13px] tracking-widest" />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 px-2 py-1 rounded-[4px] transition-colors">Show</button>
                </div>
              </div>
              
              <div className="flex items-start gap-2 pt-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" className="mt-0.5 shrink-0"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                <p className="text-[11px] text-stone-600 leading-tight">Use your college email • <span className="text-[#D97706] font-medium">OTP</span> if password fails</p>
              </div>

              <button onClick={() => setActive(5)} className="w-full h-[44px] bg-[#1C1917] hover:bg-[#292524] text-white rounded-[10px] font-medium transition-colors mt-4 flex items-center justify-center gap-2 shadow-sm text-[14px]">
                Continue to Student Dashboard <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
            
            <div className="mt-6 flex flex-col items-center gap-3">
              <div className="text-[12px] text-stone-600">
                Need help? <button className="font-medium text-stone-900 border-b border-stone-900 hover:text-[#D97706] hover:border-[#D97706] transition-colors pb-0.5">Contact HOD</button>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-stone-500">
                <span className="flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Secured with 2FA</span>
                <span>•</span>
                <button className="hover:text-stone-800 transition-colors">Privacy Policy</button>
                <span>•</span>
                <button className="hover:text-stone-800 transition-colors">Terms</button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 lg:absolute lg:bottom-6 lg:right-6 text-[11px] text-stone-500 text-center lg:text-right w-full lg:w-auto font-medium">
            Secured with 2FA • Privacy Policy • Terms
          </div>
        </div>
      </div>
    </div>
  );
}


function Flow4({ setActive }: any) {
  const [studentTab, setStudentTab] = useState('Overview');
  const [dashSearch, setDashSearch] = useState('');
  const [dashFocus, setDashFocus] = useState(false);
  
const dashItemsData = [
  { name: 'Overview', keywords: 'overview dashboard analytics profile anonymous secure semester progress alerts makeup class view schedule feedback due math submit' },
  { name: 'Attendance', keywords: 'attendance subject classes attended percentage status data structures warning operating systems computer networks excellent' },
  { name: 'CIE Marks', keywords: 'cie marks internal assessments average score' },
  { name: 'Subject Feedback', keywords: 'subject feedback ongoing rate course teaching materials punctuality anonymous' },
  { name: 'NoteHub', keywords: 'notes hub documents study materials pdf lectures' }
];
const filteredDash = dashSearch ? dashItemsData.filter(i => i.name.toLowerCase().includes(dashSearch.toLowerCase()) || i.keywords.includes(dashSearch.toLowerCase())).map(i => i.name) : dashItemsData.map(i => i.name);

  
  return (
    <div className="border-x border-b border-[#E7E5E4] rounded-b-[16px] overflow-hidden mx-4 sm:mx-6 bg-white dark:bg-[#18181b] flex flex-col h-[calc(100vh-64px-32px)] ">
      
      {/* Header (Top Sub-navbar) */}
      <div className="h-[56px] bg-white dark:bg-[#18181b] border-b border-[#E7E5E4] flex items-center justify-between px-4 sm:px-6 shrink-0">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-full bg-[#1C1917] text-white text-[11px] font-semibold mono tracking-widest">EPCET • DEMO</span>
          <span className="hidden sm:inline text-[13px] font-medium text-[#78716C]">Academic Workspace</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:flex items-center gap-2 h-9 w-[280px] px-3 rounded-[10px] bg-[#F5F5F0] border border-[#E7E5E4] text-[13px] text-[#A8A29E] focus-within:border-[#1C1917] focus-within:bg-white dark:bg-[#18181b] transition-colors z-50">
            <span className="text-[14px]">⌕</span> 
            <input 
              value={dashSearch}
              onChange={(e) => setDashSearch(e.target.value)}
              onFocus={() => setDashFocus(true)}
              onBlur={() => setTimeout(() => setDashFocus(false), 200)}
              placeholder="Search attendance, feedback..." 
              className="flex-1 bg-transparent outline-none truncate text-[#1C1917]" 
            />
            <span className="ml-auto mono text-[10px] bg-white dark:bg-[#18181b] border border-[#E7E5E4] rounded px-1.5 py-0.5 shadow-sm text-[#78716C]">⌘K</span>
            
            {dashFocus && dashSearch && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#18181b] rounded-[10px] border border-[#E7E5E4] shadow-lg overflow-hidden py-1 z-[100]">
                {filteredDash.length > 0 ? filteredDash.map(item => (
                  <div 
                    key={item} 
                    onMouseDown={(e) => { e.preventDefault(); if (item === 'NoteHub') { setActive(4); } else { setStudentTab(item); } setDashSearch(''); setDashFocus(false); }}
                    className="px-3 py-2 text-[13px] text-[#1C1917] hover:bg-[#F5F5F0] cursor-pointer"
                  >
                    Go to {item}
                  </div>
                )) : (
                  <div className="px-3 py-2 text-[13px] text-[#78716C]">No suggestions found.</div>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 pl-4 border-l border-[#E7E5E4]">

            <div className="relative cursor-pointer">
              <span className="text-[18px]">🔔</span>
              <span className="absolute -top-1 -right-1 w-[14px] h-[14px] rounded-full bg-[#F59E0B] text-white flex items-center justify-center text-[9px] font-bold border-2 border-white">2</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer ml-1">
              <div className="w-8 h-8 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center font-bold text-[13px]">L</div>
              <div className="hidden lg:block text-left">
                <div className="text-[12px] font-semibold leading-tight text-[#1C1917]">loki</div>
                <div className="mono text-[10px] text-[#A8A29E]">1EP24CS001</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        
        {/* Mobile Tab Bar */}
        <div className="md:hidden w-full overflow-x-auto whitespace-nowrap border-b border-[#E7E5E4] bg-white dark:bg-[#18181b] flex items-center px-4 py-3 gap-2 shrink-0" style={{ scrollbarWidth: 'none' }}>
          {['Dashboard', 'Academic Attendance', 'CIE Marks', 'My Profile', 'Subject Feedback', 'Suggestion Box'].map((item) => (
            <button
              key={item}
              onClick={() => setStudentTab(item)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all shrink-0 ${studentTab === item || (item==='Dashboard' && studentTab==='Overview') || (item==='Academic Attendance' && studentTab==='Attendance') ? "bg-[#1C1917] text-white" : "bg-[#F5F5F0] text-[#57534E]"}`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Left Sidebar */}
        <div className="w-[240px] border-r border-[#E7E5E4] bg-white dark:bg-[#18181b] shrink-0 hidden md:flex flex-col justify-between py-6 px-4">
          <div>
            <div className="mono text-[10px] font-bold text-[#D97706] tracking-widest mb-4 px-3">ACADEMIC</div>
            <div className="space-y-1">
              {['Dashboard', 'Academic Attendance', 'CIE Marks', 'My Profile', 'Subject Feedback', 'Suggestion Box'].map((item) => (
                <button
                  key={item}
                  onClick={() => setStudentTab(item)}
                  className={`w-full text-left px-3 py-2.5 rounded-[12px] text-[13px] font-medium transition-all flex justify-between items-center ${studentTab === item || (item==='Dashboard' && studentTab==='Overview') || (item==='Academic Attendance' && studentTab==='Attendance') ? "bg-[#1C1917] text-white shadow-md" : "text-[#57534E] hover:bg-[#F5F5F0]"}`}
                >
                  {item}
                  {item === 'Academic Attendance' && <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${studentTab===item || studentTab==='Attendance' ? "bg-[#D97706] text-white" : "bg-[#FEF3C7] text-[#D97706]"}`}>Live</span>}
                  {item === 'CIE Marks' && <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${studentTab===item ? "bg-white/20 text-white" : "bg-[#1C1917] text-white"}`}>Live</span>}
                </button>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-[#E7E5E4]">
              <div className="p-3 rounded-[14px] border border-[#E7E5E4] bg-[#F5F5F0]/50 flex items-center gap-3 shadow-sm mb-3">
                <div className="w-8 h-8 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center font-bold text-[13px] shrink-0">L</div>
                <div className="overflow-hidden">
                  <div className="text-[13px] font-semibold text-[#1C1917] truncate">loki</div>
                  <div className="mono text-[10px] text-[#A8A29E] truncate">1EP24CS001 • CSE • Synced</div>
                </div>
              </div>
              <button onClick={() => setActive(0)} className="w-full text-center text-[12px] font-semibold text-[#DC2626] border border-[#FECACA] hover:bg-[#FEF2F2] py-2 rounded-[10px] transition-colors bg-white dark:bg-[#18181b] shadow-sm">
                Logout
              </button>
            </div>
          </div>

          
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-[#FCFCF9] overflow-y-auto p-6 lg:p-8">
          
          <div className="flex items-center justify-between mb-8">
            <div className="inline-flex p-1 rounded-full bg-white dark:bg-[#18181b] border border-[#E7E5E4] shadow-sm">
               {['Overview', 'Attendance', 'CIE Marks', 'Profile'].map(t=>(
                 <button key={t} onClick={()=>setStudentTab(t)} className={`h-8 px-5 rounded-full text-[13px] font-medium transition-all ${studentTab===t || (t==='Overview' && studentTab==='Dashboard') || (t==='Attendance' && studentTab==='Academic Attendance') ? "bg-[#1C1917] text-white shadow" : "text-[#78716C] hover:bg-[#F5F5F0]"}`}>{t}</button>
               ))}
            </div>
            
          </div>

          {(studentTab === 'Overview' || studentTab === 'Dashboard') && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 pb-12">
              {/* Welcome Card */}
              <div className="lg:col-span-1 bg-white dark:bg-[#18181b] rounded-[20px] border border-[#E7E5E4] p-6 shadow-sm relative overflow-hidden flex flex-col">
                <div className="absolute left-0 top-6 bottom-6 w-1 bg-[#D97706] rounded-r-full" />
                <h2 className="serif text-[24px] tracking-tight mb-3 pl-3 text-[#1C1917]">Welcome back, Student 1! 👋</h2>
                <p className="text-[13px] text-[#78716C] leading-relaxed mb-6 pl-3">Select any module to view analytics, submit feedback, or manage profile. Your data is anonymous and secure.</p>
                <div className="mt-auto pl-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5F5F0] border border-[#E7E5E4] text-[11px] text-[#57534E] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span> 3 of 5 tasks complete
                  </span>
                </div>
              </div>

              {/* University Reg Card */}
              <div className="bg-white dark:bg-[#18181b] rounded-[20px] border border-[#E7E5E4] p-6 shadow-sm flex flex-col">
                 <div className="mono text-[10px] text-[#DB2777] font-bold tracking-widest flex items-center gap-2 mb-4 uppercase">
                   <span className="text-[14px]">🎓</span> University Reg
                 </div>
                 <div className="text-[18px] font-bold text-[#1C1917]">1EP24CS001</div>
                 <div className="text-[12px] text-[#78716C] mt-1 font-medium">CSE • Sem 1 • Sec A</div>
                 <div className="mt-auto pt-8">
                   <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DCFCE7] border border-[#BBF7D0] text-[#059669] text-[11px] font-bold">
                     ✓ Eligible • 78% attendance
                   </div>
                 </div>
              </div>

              {/* Student ID Card */}
              <div className="bg-white dark:bg-[#18181b] rounded-[20px] border border-[#E7E5E4] p-6 shadow-sm flex flex-col relative overflow-hidden">
                 <div className="flex justify-between items-start mb-6">
                   <div className="flex gap-3">
                     <div className="w-10 h-10 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center font-bold text-[16px]">L</div>
                     <div>
                       <div className="text-[13px] font-bold text-[#1C1917]">Student ID</div>
                       <div className="text-[11px] text-[#A8A29E] mono mt-0.5">1EP24CS001 •<br/>CSE</div>
                     </div>
                   </div>
                   <div className="text-right">
                     <div className="text-[11px] text-[#A8A29E] mono">Sec</div>
                     <div className="text-[14px] font-bold text-[#78716C]">A</div>
                   </div>
                   <div className="absolute top-4 right-4 w-12 h-12 border border-[#E7E5E4] rounded-full opacity-20 pointer-events-none" />
                   <div className="absolute top-2 right-12 w-20 h-20 border border-[#E7E5E4] rounded-full opacity-10 pointer-events-none" />
                 </div>

                 <div className="flex gap-4 items-center mt-auto">
                   <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                     <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                       <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E7E5E4" strokeWidth="4" />
                       <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10B981" strokeWidth="4" strokeDasharray="78, 100" />
                     </svg>
                     <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-[#1C1917]">78%</div>
                   </div>
                   <p className="text-[11px] text-[#78716C] leading-snug">
                     You need <span className="font-bold text-[#1C1917]">3 more</span> classes to reach 75% in DBMS.
                   </p>
                 </div>
              </div>

              {/* Row 2: Academic Attendance (2 cols) & CIE Marks (1 col) */}
              <div className="lg:col-span-2 bg-white dark:bg-[#18181b] rounded-[20px] border border-[#E7E5E4] p-6 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#E0F2FE] flex items-center justify-center text-[#0369A1] text-[12px]">◎</span>
                    <h3 className="font-bold text-[15px] text-[#1C1917]">Academic Attendance</h3>
                  </div>
                  <div className="px-2 py-0.5 rounded-md bg-[#DCFCE7] border border-[#BBF7D0] text-[#059669] text-[9px] font-bold mono uppercase">
                    • Live Module
                  </div>
                </div>
                <p className="text-[13px] font-semibold text-[#1C1917] mb-1">Live subject-wise breakdown with logs</p>
                <p className="text-[12px] text-[#78716C] mb-6">Real-time subject-wise class attendance, date-wise logs, eligibility predictor. Works offline too.</p>

                <div className="grid grid-cols-4 gap-3 mb-6">
                  <div className="bg-[#F5F5F0] rounded-[12px] p-3 border border-[#E7E5E4]">
                    <div className="mono text-[9px] text-[#78716C] font-bold tracking-widest uppercase mb-1">Conducted</div>
                    <div className="text-[20px] font-bold text-[#1C1917]">6</div>
                  </div>
                  <div className="bg-[#DCFCE7]/50 rounded-[12px] p-3 border border-[#BBF7D0]">
                    <div className="mono text-[9px] text-[#059669] font-bold tracking-widest uppercase mb-1">Attended</div>
                    <div className="text-[20px] font-bold text-[#059669]">6</div>
                  </div>
                  <div className="bg-[#FEE2E2]/50 rounded-[12px] p-3 border border-[#FECACA]">
                    <div className="mono text-[9px] text-[#DC2626] font-bold tracking-widest uppercase mb-1">Absent</div>
                    <div className="text-[20px] font-bold text-[#DC2626]">0</div>
                  </div>
                  <div className="bg-[#DBEAFE]/50 rounded-[12px] p-3 border border-[#BFDBFE]">
                    <div className="mono text-[9px] text-[#2563EB] font-bold tracking-widest uppercase mb-1">Current</div>
                    <div className="text-[20px] font-bold text-[#2563EB]">100%</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] mono text-[#A8A29E] uppercase font-bold">
                  <span>Attendance Meter</span>
                  <span>100% / 75% Required</span>
                </div>
                <div className="mt-2 h-1.5 w-full bg-[#F5F5F0] rounded-full overflow-hidden">
                  <div className="h-full bg-[#10B981] rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              {/* Compact CIE Marks Card */}
              <div className="bg-white dark:bg-[#18181b] rounded-[20px] border border-[#E7E5E4] p-6 shadow-sm flex flex-col cursor-pointer hover:border-[#1C1917]/20 transition-colors" onClick={()=>setStudentTab('CIE Marks')}>
                <div className="flex justify-between items-start mb-6">
                  <span className="w-8 h-8 rounded-full bg-[#FFF1F2] flex items-center justify-center text-[#BE123C] text-[14px]">📊</span>
                  <span className="mono text-[9px] text-[#78716C] font-bold tracking-widest bg-[#F5F5F0] border border-[#E7E5E4] px-2 py-1 rounded-md uppercase">Live</span>
                </div>
                <h3 className="font-bold text-[15px] text-[#1C1917] mb-2">CIE & Internals</h3>
                <p className="text-[12px] text-[#78716C] leading-relaxed mb-6">Track your continuous internal evaluation scores.</p>
                
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="mono text-[10px] text-[#A8A29E] uppercase font-bold mb-1">Your Avg</div>
                      <div className="text-[20px] font-bold text-[#1C1917]">42.5<span className="text-[14px] text-[#A8A29E]">/50</span></div>
                    </div>
                    <div className="w-10 h-10 rounded-full border-[3px] border-[#10B981] flex items-center justify-center text-[10px] font-bold text-[#059669]">85%</div>
                  </div>
                  <button className="text-[12px] font-bold text-[#1C1917] hover:underline underline-offset-4">View detailed marks →</button>
                </div>
              </div>

              {/* Row 3: Subject Feedback */}
              <div className="lg:col-span-3 bg-white dark:bg-[#18181b] rounded-[20px] border border-[#E7E5E4] p-6 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="w-12 h-12 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#475569] text-[18px] shrink-0">📝</span>
                  <div>
                    <h3 className="font-bold text-[15px] text-[#1C1917] mb-1">Subject Feedback <span className="mono text-[9px] text-[#78716C] font-bold tracking-widest bg-[#F5F5F0] border border-[#E7E5E4] px-2 py-1 rounded-md uppercase ml-2">Batch 2024-2028</span></h3>
                    <p className="text-[12px] text-[#78716C] leading-relaxed">Anonymous NAAC-aligned feedback. Your response matters for teaching quality.</p>
                  </div>
                </div>
                <button className="h-10 px-5 rounded-[12px] bg-[#1C1917] text-white text-[13px] font-medium shrink-0">Submit feedback →</button>
              </div>

            </div>
          )}

                  {studentTab === 'Subject Feedback' && <SubjectFeedbackFlow />}
{(studentTab === 'Attendance' || studentTab === 'Academic Attendance') && (
            <div className="space-y-6 pb-12">
              <div className="bg-white dark:bg-[#18181b] rounded-[16px] border border-[#E7E5E4] p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="serif font-semibold text-[18px]">OVERALL ATTENDANCE & PREDICTION</h3>
                    <p className="text-[13px] text-[#78716C] mt-1">Real-time eligibility calculation based on institutional rules (75% required).</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#DCFCE7] border border-[#A7F3D0] text-[#065F46] text-[12px] font-medium">✓ Eligible Status</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                  <div className="rounded-[12px] bg-[#F5F5F0] border border-[#E7E5E4] p-4">
                    <div className="mono text-[10px] text-[#78716C] uppercase">Classes Conducted</div>
                    <div className="serif text-[28px] font-[500] mt-2">6</div>
                  </div>
                  <div className="rounded-[12px] bg-[#DCFCE7] border border-[#A7F3D0] p-4">
                    <div className="mono text-[10px] text-[#065F46] uppercase">Attended</div>
                    <div className="serif text-[28px] font-[500] mt-2 text-[#065F46]">6</div>
                  </div>
                  <div className="rounded-[12px] bg-[#FEE2E2] border border-[#FECACA] p-4">
                    <div className="mono text-[10px] text-[#991B1B] uppercase">Absent</div>
                    <div className="serif text-[28px] font-[500] mt-2 text-[#DC2626]">0</div>
                  </div>
                  <div className="rounded-[12px] bg-[#F5F5F0] border border-[#E7E5E4] p-4">
                    <div className="mono text-[10px] text-[#78716C] uppercase">Current Percentage</div>
                    <div className="serif text-[28px] font-[500] mt-2">100%</div>
                  </div>
                </div>
                
                <div className="mt-6 rounded-[12px] bg-[#DCFCE7] border border-[#A7F3D0] p-4 flex items-center gap-3 text-[13px] text-[#065F46]">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-[#18181b] border border-[#A7F3D0] flex items-center justify-center text-[#059669]">ℹ</div>
                  <span><span className="font-semibold">Forecast:</span> You can miss up to 2 more classes and still remain eligible (75%).</span>
                </div>
              </div>
              
              {/* Detailed tables can go here if expanded further */}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

function Flow5({ setActive, noteView, setNoteView }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  
  const documents = [
    { type: 'LAB_MANUAL', title: 'ada lab', date: 'Aug 23 • 2026', author: 'faculty', verified: true, format: 'PDF' },
    { type: 'NOTES', title: 'DBMS Chapter 1', date: 'Sep 10 • 2026', author: 'student', verified: false, format: 'PDF' },
    { type: 'PPT', title: 'Computer Networks Intro', date: 'Oct 05 • 2026', author: 'faculty', verified: true, format: 'PPTX' }
  ];

  const filteredDocs = searchQuery 
    ? documents.filter(d => Object.values(d).some(val => String(val).toLowerCase().includes(searchQuery.toLowerCase()))) 
    : documents;

  return (
    <div className="border-x border-b border-[#E7E5E4] rounded-b-[16px] overflow-hidden mx-4 sm:mx-6 bg-white dark:bg-[#18181b]">
      <div className="h-[56px] border-b border-[#E7E5E4] flex items-center justify-between px-4 sm:px-6 gap-3">
        <div className="flex items-center gap-3">
          <span className="serif text-[18px] font-[600] tracking-tight">NoteHub</span>
          <span className="mono text-[10px] px-2 py-0.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E]">ENGINEERING EPCET</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="h-9 w-[320px] lg:w-[480px] rounded-full border border-[#E7E5E4] bg-[#F5F5F0] flex items-center px-3 gap-2 text-[13px] text-[#78716C] focus-within:border-[#1C1917] focus-within:bg-white dark:bg-[#18181b] transition-colors">
            ⌕ 
            <input 
              value={searchQuery} 
              onChange={e => {
                setSearchQuery(e.target.value); 
                if(e.target.value) setNoteView('search');
              }} 
              placeholder="Search for courses, quizzes, or documents" 
              className="flex-1 bg-transparent outline-none truncate text-[#1C1917]" 
            />
            <span className="ml-auto mono text-[10px] bg-white dark:bg-[#18181b] border border-[#E7E5E4] rounded px-1">⌘K</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex h-8 px-3 rounded-full bg-[#1C1917] text-white text-[12px] items-center">University</span>
          <span className="hidden sm:inline-flex h-8 px-3 rounded-full text-[12px] items-center text-[#78716C]">High School</span>
          <button className="h-8 px-4 rounded-full bg-[#1C1917] text-white text-[12px] font-medium">Sign in</button>
          <div className="w-8 h-8 rounded-full bg-[#FEF3C7] flex items-center justify-center text-[12px] font-semibold">S</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr]">
        <div className="bg-[#F5F5F0] p-4 border-b lg:border-b-0 lg:border-r border-[#E7E5E4]">
          <button className="w-full h-10 rounded-[12px] bg-[#1C1917] text-white text-[13px] font-medium inline-flex items-center justify-center gap-2">+ New Upload</button>
          <div className="mono text-[11px] text-[#78716C] mt-2 px-1">Share notes, PPTs, lab manuals →</div>

          <div className="mt-6 space-y-1">
            {[{l:"Home",a:true},{l:"Library"},{l:"Recent"}].map(i=>(
              <div key={i.l} className={`h-8 px-2.5 rounded-[10px] flex items-center gap-2 text-[13px] ${i.a ? "bg-white dark:bg-[#18181b] border border-[#E7E5E4] font-medium" : "text-[#57534E]"}`}>
                <span className="w-5 h-5 rounded-[6px] bg-white dark:bg-[#18181b] border border-[#E7E5E4] flex items-center justify-center text-[11px]">{i.l[0]}</span>{i.l}
              </div>
            ))}
            <div className="pt-4">
              <div className="mono text-[10px] tracking-[0.12em] text-[#A8A29E] px-2 mb-2">DEPARTMENTS</div>
              <div className="rounded-[12px] bg-[#FEF3C7] border border-[#FDE68A] p-2">
                <div className="flex items-center gap-2 text-[13px] font-medium"><span>📁</span> CSE</div>
                <div className="mt-2 space-y-1 pl-6">
                  <div className="text-[12px] text-[#57534E]">Sem 1 • 2 files</div>
                  <div className="text-[12px] text-[#57534E]">Sem 2 • 12 files</div>
                  <button onClick={()=>setNoteView('cse5')} className={`text-[12px] px-2 py-1 rounded-full border ${noteView==='cse5' ? "bg-[#1C1917] text-white border-[#1C1917]" : "bg-white dark:bg-[#18181b] border-[#E7E5E4]"}`}>Sem 5 • 45 files</button>
                </div>
              </div>
              <div className="mt-2 px-2 py-1.5 text-[13px] text-[#78716C]">ECE • 32 files</div>
              <div className="px-2 py-1.5 text-[13px] text-[#78716C]">ME • 18 files</div>
            </div>
          </div>

          <div className="mt-6 rounded-[12px] bg-[#FFFBEB] border border-[#FDE68A] p-3">
            <div className="text-[12px] font-medium">Psst! How it works</div>
            <div className="text-[11px] text-[#78716C] leading-5 mt-1">Select a Dept → Sem → Subject to see notes, PPTs, lab manuals, PYQs</div>
            <div className="mt-2 text-[11px]">↗ Try CSE → Sem 5</div>
          </div>
        </div>

        <div className="p-5 sm:p-8 bg-[#FCFCF9]">
          {noteView==='search' ? (
            <>
              <h2 className="serif text-[32px] italic leading-none">Find your materials</h2>
              <p className="text-[14px] text-[#78716C] mt-2">Search across EPCET Engineering. Everything is peer-verified.</p>

              <div className="mt-6 h-[48px] rounded-[12px] bg-white dark:bg-[#18181b] border border-[#E7E5E4] flex items-center px-3.5 gap-2 focus-within:border-[#1C1917]">
                <span className="text-[#A8A29E]">⌕</span>
                <input 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search materials..." 
                  className="flex-1 bg-transparent outline-none text-[14px]" 
                  autoFocus
                />
                <span className="mono text-[10px] bg-[#F5F5F0] border border-[#E7E5E4] rounded-full px-2 py-1">Press / to focus</span>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {["All Sections","Academic","Lab Resources"].map(f=>(
                  <button key={f} className={`h-8 px-3.5 rounded-full text-[12px] border ${f==="All Sections" ? "bg-[#1C1917] text-white border-[#1C1917]" : "bg-white dark:bg-[#18181b] border-[#E7E5E4] text-[#57534E]"}`}>{f}</button>
                ))}
                <div className="ml-2 h-8 px-3 rounded-full bg-white dark:bg-[#18181b] border border-[#E7E5E4] text-[12px] flex items-center gap-1">Resource Type ▾</div>
              </div>

              <div className="mt-6 mono text-[12px] text-[#A8A29E] flex items-center justify-between">
                <span>All Materials • {filteredDocs.length} found</span>
                <button onClick={()=>{setNoteView('cse5'); setSearchQuery('');}} className="underline underline-offset-4 text-[#1C1917]">Go to CSE5 →</button>
              </div>

              <div className="mt-4 space-y-2">
                <div className="mono text-[10px] tracking-[0.12em] text-[#A8A29E]">SECTION RESOURCES</div>
                {filteredDocs.length > 0 ? filteredDocs.map((doc, idx) => (
                  <div key={idx} className="rounded-[12px] bg-white dark:bg-[#18181b] border border-[#E7E5E4] p-4 flex items-center justify-between hover:bg-[#F5F5F0] transition-colors cursor-pointer">
                    <div>
                      <div className="mono text-[10px] px-1.5 py-0.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] inline-flex">{doc.type}</div>
                      <div className="text-[16px] font-medium mt-1">{doc.title}</div>
                      <div className="mono text-[11px] text-[#A8A29E] mt-1">{doc.date} • By {doc.author} {doc.verified && "• Verified"}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="hidden sm:flex w-9 h-9 rounded-[10px] bg-[#F5F5F0] border border-[#E7E5E4] items-center justify-center">📄</div>
                      <span className="px-2.5 py-1 rounded-full bg-[#1C1917] text-white mono text-[10px]">{doc.format}</span>
                    </div>
                  </div>
                )) : (
                  <div className="p-8 text-center text-[#78716C] text-[14px]">No materials found for "{searchQuery}"</div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <span className="h-7 px-3 rounded-full bg-white dark:bg-[#18181b] border border-[#E7E5E4] text-[12px] inline-flex items-center">Home</span>
                <span className="text-[#A8A29E]">/</span>
                <span className="h-7 px-3 rounded-full bg-white dark:bg-[#18181b] border border-[#E7E5E4] text-[12px] inline-flex items-center">CSE</span>
                <span className="text-[#A8A29E]">/</span>
                <span className="h-7 px-3 rounded-full bg-[#1C1917] text-white text-[12px] inline-flex items-center">Sem 5</span>
              </div>

              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="serif text-[28px] leading-tight">Computer Science and Engineering <span className="text-[#DAA520]">CSE5</span></h2>
                  <p className="text-[14px] text-[#78716C] mt-2">5th Semester core subjects • Updated for 2026 syllabus • Lab manuals included.</p>
                </div>
                <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#18181b] border border-[#E7E5E4] mono text-[11px]">
                  9 subjects • 45 files live
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2">
                {["Popular","Recent","A-Z"].map(f=>(
                  <button key={f} className={`h-8 px-3.5 rounded-full text-[12px] border ${f==="Popular" ? "bg-[#1C1917] text-white border-[#1C1917]" : "bg-white dark:bg-[#18181b] border-[#E7E5E4]"}`}>{f}</button>
                ))}
                <button onClick={()=>setNoteView('search')} className="ml-auto mono text-[11px] underline underline-offset-4">← Back to search</button>
              </div>

              <div className="mt-4 flex gap-1.5 flex-wrap">
                {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(l=>(
                  <div key={l} className={`w-7 h-7 rounded-[8px] border flex items-center justify-center text-[11px] font-medium ${l==="A" ? "bg-[#FEF3C7] border-[#FDE68A] text-[#92400E]" : "bg-white dark:bg-[#18181b] border-[#E7E5E4] text-[#78716C]"}`}>{l}{l==="A" ? "★" : ""}</div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { code:"20CS51", name:"DBMS - Database Management", docs:124 },
                  { code:"20CS52", name:"CN - Computer Networks", docs:98 },
                  { code:"20CS53", name:"ADA - Analysis & Design of Algorithms", docs:112 },
                  { code:"20CS54", name:"AI - Artificial Intelligence", docs:87 },
                  { code:"20CS55", name:"SE - Software Engineering", docs:76 },
                  { code:"20CS56", name:"OS - Operating Systems", docs:102 },
                ].map(s=>(
                  <div key={s.code} className="rounded-[16px] bg-white dark:bg-[#18181b] border border-[#E7E5E4] p-4 hover:border-[#1C1917] transition-colors group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2"><span className="w-6 h-6 rounded-[8px] bg-[#F5F5F0] border border-[#E7E5E4] flex items-center justify-center text-[12px]">📁</span><span className="mono text-[11px] text-[#78716C]">{s.code}</span></div>
                      <span className="mono text-[10px] text-[#A8A29E]">{s.docs} docs</span>
                    </div>
                    <div className="serif text-[16px] font-medium leading-tight mt-3">{s.name}</div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="px-2 py-1 rounded-full bg-[#F5F5F0] border border-[#E7E5E4] mono text-[10px]">notes • PPTs • PYQs</span>
                    </div>
                    <div className="mt-3 text-[13px] font-medium group-hover:gap-2 flex items-center gap-1 transition-all">Tap to open folder →</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function CollegeAdminDashboard({ setActive }: any) {
  const [navTab, setNavTab] = useState('Admin Setup');

  return (
    <div className="min-h-screen bg-[#F5F1E8] font-sans selection:bg-[#D97706]/20 overflow-x-hidden flex flex-col pb-16">
      {/* Top Navbar */}
      <div className="h-[80px] flex items-center justify-between px-8 shrink-0 z-50 sticky top-0 bg-[#F5F1E8]/80 backdrop-blur-xl border-b border-transparent">
        <div className="flex items-center gap-3">
          <img src={logoUrl} alt="Logo" className="w-10 h-10 object-contain" />
          <div>
            <div className="serif text-[16px] font-bold text-[#1C1917] leading-tight hidden sm:block">EduFeedback Pro</div>
            <div className="text-[9px] font-bold text-[#A8A29E] tracking-widest hidden sm:flex items-center gap-1.5 mt-0.5 uppercase">
              <span>WARM</span> <span>•</span> <span>HUMAN</span> <span>•</span> <span>EPCET</span>
            </div>
          </div>
          <button 
            onClick={() => setActive(1)} 
            className="ml-4 px-3 py-1.5 rounded-full text-[12px] font-medium text-[#57534E] bg-white/50 hover:bg-white transition-colors border border-[#E7E5E4] flex items-center gap-1 shadow-sm"
          >
            <span>&lt;</span> BACK
          </button>
        </div>

        <div className="flex overflow-x-auto no-scrollbar items-center gap-1 bg-white/70 backdrop-blur-md border border-[#E7E5E4] rounded-full p-1 sm:p-1.5 shadow-sm max-w-[50vw] sm:max-w-none mx-2 sm:mx-0">
          {['Admin Setup', 'Overview', 'Leaderboard', 'Activity'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setNavTab(tab)}
              className={`px-5 py-2 text-[13px] font-medium rounded-full transition-all ${navTab === tab ? 'bg-[#1C1917] text-white shadow-md' : 'text-[#78716C] hover:bg-white hover:text-[#1C1917]'}`}
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
      <div className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-12 flex flex-col gap-6 sm:gap-8">
        
        {navTab === 'Admin Setup' && (
          <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="serif text-[32px] sm:text-[40px] text-[#1C1917] leading-tight mb-3 flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row gap-6 sm:gap-8 hover:-translate-y-0.5 transition-transform duration-300">
                <div className="w-full sm:w-32 h-32 rounded-[16px] bg-[#FAFAFA] border border-[#F5F5F0] flex flex-col items-center justify-center shrink-0">
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
                      <div className={`w-12 h-12 rounded-[12px] ${action.bg} flex items-center justify-center text-[20px]`}>{action.icon}</div>
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
            <div className="bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <h3 className="serif text-[22px] text-[#1C1917]">Global Filters</h3>
                <span className="text-[11px] text-[#A8A29E] mono">Filters apply to Overview & Leaderboard • Friendly defaults</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 sm:gap-y-6">
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
                <h1 className="serif text-[32px] sm:text-[40px] text-[#1C1917] leading-tight mb-2 flex flex-col">
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
              <div className="bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 shadow-sm flex flex-col justify-between min-h-[220px] hover:shadow-md transition-shadow">
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

              <div className="bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 shadow-sm flex flex-col justify-between min-h-[220px] hover:shadow-md transition-shadow">
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

              <div className="bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 shadow-sm flex flex-col justify-between min-h-[220px] hover:shadow-md transition-shadow">
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

            {/* Bottom Insights & AI Section */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              
              {/* Real-time Insights */}
              <div className="lg:col-span-3 bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="serif text-[20px] text-[#1C1917] font-semibold">Real-time Insights</h3>
                  <button className="flex items-center gap-2 px-4 py-2 border border-[#E7E5E4] rounded-full text-[12px] font-medium text-[#78716C] hover:bg-[#FAFAFA] hover:text-[#1C1917] transition-all">
                    <span>🔗</span> Copy share link
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="border border-[#E7E5E4] rounded-[16px] p-5 flex flex-col gap-3 bg-[#FAFAFA]/50">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#059669] tracking-widest uppercase">
                      <span>🏆</span> TOP PERFORMER
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-[#E7E5E4] bg-white flex items-center justify-center text-[12px] font-bold text-[#1C1917]">AS</div>
                      <div>
                        <div className="font-semibold text-[14px] text-[#1C1917]">Ananya S. — CSE</div>
                        <div className="flex items-center gap-1">
                          <span className="text-[#059669] text-[12px]">★★★★★</span>
                          <span className="text-[12px] font-medium text-[#059669]">4.9</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[12px] text-[#78716C] italic leading-relaxed mt-1">
                      "Explains DSA with real examples — loved the live coding." — 12 students
                    </p>
                  </div>

                  <div className="border border-[#FDE68A] bg-[#FEF3C7]/20 rounded-[16px] p-5 flex flex-col gap-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#D97706] tracking-widest uppercase">
                      <span>⚠️</span> NEEDS ATTENTION
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-[#FDE68A] bg-white flex items-center justify-center text-[12px] font-bold text-[#1C1917]">RK</div>
                      <div>
                        <div className="font-semibold text-[14px] text-[#1C1917]">Ramesh K. — ECE</div>
                        <div className="flex items-center gap-1">
                          <span className="text-[#D97706] text-[12px]">★★★☆☆</span>
                          <span className="text-[12px] font-medium text-[#D97706]">3.1</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[12px] text-[#78716C] italic leading-relaxed mt-1">
                      "Pace is fast — request slower revision sessions." — 5 students
                    </p>
                  </div>
                </div>

                <div className="border border-[#E7E5E4] border-dashed rounded-[16px] p-6 flex flex-col items-center justify-center text-center gap-4 bg-[#FAFAFA]">
                  <p className="text-[12px] text-[#78716C] mono max-w-[400px]">
                    No feedback yet for MECH — share link with students to start collecting honest notes
                  </p>
                  <button className="px-5 py-2 bg-[#1C1917] text-white text-[12px] font-medium rounded-full shadow-sm hover:scale-95 transition-transform flex items-center gap-2">
                    <span>🔗</span> Copy MECH link
                  </button>
                </div>
              </div>

              {/* AI Executive Summary */}
              <div className="lg:col-span-2 bg-[#1C1917] rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 shadow-xl flex flex-col relative overflow-hidden group">
                <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-[#F59E0B] blur-[80px] rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
                
                <h3 className="serif text-[22px] text-white font-semibold mb-3 flex items-center gap-2 relative z-10">
                  <span className="text-[#F59E0B]">✨</span> AI Executive Summary
                </h3>
                <p className="text-[14px] text-[#D6D3D1] leading-relaxed mb-6 relative z-10">
                  Get a principal-ready report in 30 seconds — no jargon, just what to fix and what's working.
                </p>
                
                <ul className="flex flex-col gap-3 mb-8 relative z-10">
                  {['Top 3 strengths by department', '2 risks + suggested actions', 'Student quotes (anonymized)', 'Trend vs last month'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[13px] text-[#E7E5E4]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto relative z-10">
                  <button className="w-full py-4 bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1917] text-[15px] font-bold rounded-[14px] shadow-[0_4px_20px_0_rgba(245,158,11,0.25)] transition-all flex items-center justify-center gap-2">
                    ✨ Generate report
                  </button>
                  <div className="text-[10px] text-[#A8A29E] mono text-center mt-4 uppercase tracking-widest">
                    Preview • No email needed • Exports PDF
                  </div>
                </div>
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
              <div className="bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 flex flex-col shadow-sm h-[400px]">
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
        
        {navTab === 'Leaderboard' && (
          <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
              <h1 className="serif text-[36px] text-[#1C1917] leading-tight mb-2 flex flex-col">
                Department Leaderboard
                <svg className="w-36 h-2 text-[#F59E0B] mt-1" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </h1>
              <p className="text-[15px] text-[#78716C] max-w-[600px] mt-4">
                Medals for top 3, stars not scary pills. Empty states are friendly, not red.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-[20px] sm:rounded-[24px] p-1 sm:p-8 shadow-sm overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr>
                    <th className="py-4 px-6 text-[10px] font-bold text-[#A8A29E] tracking-widest uppercase border-b border-[#F5F5F0]">RANK</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-[#A8A29E] tracking-widest uppercase border-b border-[#F5F5F0]">DEPARTMENT</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-[#A8A29E] tracking-widest uppercase border-b border-[#F5F5F0]">RATING</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-[#A8A29E] tracking-widest uppercase border-b border-[#F5F5F0]">RESPONSES</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-[#A8A29E] tracking-widest uppercase border-b border-[#F5F5F0]">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="group hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-5 px-6 border-b border-[#F5F5F0]">
                      <div className="flex items-center gap-2 mono text-[13px] text-[#1C1917] font-medium">#1 <span className="text-[16px]">🥇</span></div>
                    </td>
                    <td className="py-5 px-6 border-b border-[#F5F5F0]">
                      <div className="font-semibold text-[14px] text-[#1C1917]">CSE — Dr. Lokesh</div>
                      <div className="text-[11px] text-[#A8A29E] mono mt-1">128 ratings • updated today</div>
                    </td>
                    <td className="py-5 px-6 border-b border-[#F5F5F0]">
                      <div className="flex items-center gap-2 bg-[#DCFCE7]/30 px-3 py-1.5 rounded-full w-fit">
                        <span className="text-[#059669] text-[13px]">★★★★★</span>
                        <span className="text-[13px] font-bold text-[#059669]">4.6</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 border-b border-[#F5F5F0]">
                      <span className="mono text-[13px] text-[#57534E]">128</span>
                    </td>
                    <td className="py-5 px-6 border-b border-[#F5F5F0]">
                      <span className="mono text-[12px] font-medium text-[#059669]">+8%</span>
                    </td>
                  </tr>

                  <tr className="group hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-5 px-6 border-b border-[#F5F5F0]">
                      <div className="flex items-center gap-2 mono text-[13px] text-[#1C1917] font-medium">#2 <span className="text-[16px]">🥈</span></div>
                    </td>
                    <td className="py-5 px-6 border-b border-[#F5F5F0]">
                      <div className="font-semibold text-[14px] text-[#1C1917]">ECE — Dr. Priya</div>
                      <div className="text-[11px] text-[#A8A29E] mono mt-1">96 ratings • updated today</div>
                    </td>
                    <td className="py-5 px-6 border-b border-[#F5F5F0]">
                      <div className="flex items-center gap-2 bg-[#DCFCE7]/30 px-3 py-1.5 rounded-full w-fit">
                        <span className="text-[#059669] text-[13px]">★★★★<span className="text-[#A8A29E]/50">★</span></span>
                        <span className="text-[13px] font-bold text-[#059669]">4.2</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 border-b border-[#F5F5F0]">
                      <span className="mono text-[13px] text-[#57534E]">96</span>
                    </td>
                    <td className="py-5 px-6 border-b border-[#F5F5F0]">
                      <span className="mono text-[12px] font-medium text-[#059669]">+3%</span>
                    </td>
                  </tr>

                  <tr className="group hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-5 px-6 border-b border-[#F5F5F0]">
                      <div className="flex items-center gap-2 mono text-[13px] text-[#1C1917] font-medium">#3 <span className="text-[16px]">🥉</span></div>
                    </td>
                    <td className="py-5 px-6 border-b border-[#F5F5F0]">
                      <div className="font-semibold text-[14px] text-[#1C1917]">ISE — Dr. Arjun</div>
                      <div className="text-[11px] text-[#A8A29E] mono mt-1">74 ratings • updated today</div>
                    </td>
                    <td className="py-5 px-6 border-b border-[#F5F5F0]">
                      <div className="flex items-center gap-2 bg-[#FEF3C7]/40 px-3 py-1.5 rounded-full w-fit">
                        <span className="text-[#D97706] text-[13px]">★★★<span className="text-[#A8A29E]/50">★★</span></span>
                        <span className="text-[13px] font-bold text-[#D97706]">3.9</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 border-b border-[#F5F5F0]">
                      <span className="mono text-[13px] text-[#57534E]">74</span>
                    </td>
                    <td className="py-5 px-6 border-b border-[#F5F5F0]">
                      <span className="mono text-[12px] font-medium text-[#D97706]">-2%</span>
                    </td>
                  </tr>

                  <tr className="group hover:bg-[#FAFAFA] transition-colors opacity-60">
                    <td className="py-5 px-6 border-b border-[#F5F5F0]">
                      <div className="mono text-[13px] text-[#78716C] font-medium">#4</div>
                    </td>
                    <td className="py-5 px-6 border-b border-[#F5F5F0]">
                      <div className="font-medium text-[14px] text-[#78716C]">MECH — —</div>
                      <div className="text-[11px] text-[#A8A29E] mono mt-1">No feedback yet</div>
                    </td>
                    <td className="py-5 px-6 border-b border-[#F5F5F0]">
                      <div className="text-[12px] text-[#A8A29E] italic">— no rating</div>
                    </td>
                    <td className="py-5 px-6 border-b border-[#F5F5F0]">
                      <span className="mono text-[13px] text-[#A8A29E]">0 ratings</span>
                    </td>
                    <td className="py-5 px-6 border-b border-[#F5F5F0]">
                      <span className="mono text-[12px] text-[#A8A29E]">—</span>
                    </td>
                  </tr>

                  <tr className="group hover:bg-[#FAFAFA] transition-colors opacity-60">
                    <td className="py-5 px-6">
                      <div className="mono text-[13px] text-[#78716C] font-medium">#5</div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="font-medium text-[14px] text-[#78716C]">CIVIL — —</div>
                      <div className="text-[11px] text-[#A8A29E] mono mt-1">No feedback yet</div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="text-[12px] text-[#A8A29E] italic">— no rating</div>
                    </td>
                    <td className="py-5 px-6">
                      <span className="mono text-[13px] text-[#A8A29E]">0 ratings</span>
                    </td>
                    <td className="py-5 px-6">
                      <span className="mono text-[12px] text-[#A8A29E]">—</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
