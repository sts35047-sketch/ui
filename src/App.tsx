import { Users, GraduationCap, BarChart2, Link2, LineChart, Star, ShieldCheck } from 'lucide-react';
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
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-[#E9E2D3] min-h-[calc(100vh-80px)] flex items-center justify-center p-3 sm:p-6 md:p-10 font-sans selection:bg-[#EE930D]/20">
      <main className="w-full max-w-[1400px] bg-white rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_40px_100px_-30px_rgba(28,23,22,0.35)] grid grid-cols-1 md:grid-cols-2">

        {/* ================= LEFT PANEL ================= */}
        <section className="relative bg-[#F2E8DB] flex flex-col px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <span className="text-3xl leading-none" aria-hidden="true">🎓</span>
            <span className="font-serif font-semibold text-2xl sm:text-3xl text-[#1C1716] tracking-tight">EduFeedback Pro</span>
          </div>

          {/* Illustration (hand-drawn cap + books, traced to vector) */}
          <div className="flex-1 flex items-center justify-center py-6 md:py-8 min-h-[220px]">
            <svg viewBox="0 0 790 590" className="w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[330px] h-auto" aria-hidden="true">
              <g transform="translate(0.000000,590.000000) scale(0.100000,-0.100000)" fill="#4A3524" stroke="none">
                <path d="M4551 5644 c0 -11 3 -14 6 -6 3 7 2 16 -1 19 -3 4 -6 -2 -5 -13z"/>
                <path d="M4380 4970 c0 -5 11 -10 25 -10 14 0 25 5 25 10 0 6 -11 10 -25 10 -14 0 -25 -4 -25 -10z"/>
                <path d="M4025 4730 c-88 -4 -245 -11 -350 -15 -104 -4 -242 -10 -306 -14 l-116 -7 -76 -50 c-121 -78 -302 -202 -427 -292 -63 -45 -185 -130 -270 -189 -85 -58 -191 -134 -236 -168 -44 -34 -115 -86 -158 -115 -99 -66 -156 -117 -156 -140 0 -39 26 -45 173 -42 l140 4 -8 -29 c-5 -15 -9 -98 -10 -185 -2 -153 -2 -157 -28 -188 -30 -35 -36 -84 -13 -115 10 -13 11 -27 5 -49 -14 -46 -27 -138 -38 -258 -12 -124 -47 -242 -91 -306 -33 -48 -39 -75 -14 -70 23 4 91 142 114 230 28 106 24 52 -5 -77 -14 -62 -34 -122 -46 -138 -24 -33 -20 -39 37 -55 51 -15 88 -15 138 -1 l39 11 -6 51 c-4 28 0 94 8 146 24 168 28 251 14 351 -13 100 -14 135 -4 212 6 42 4 50 -19 73 -26 26 -28 -26 173 0 81 5 164 11 185 l10 37 139 2 c77 1 166 2 197 3 l57 0 26 -115 c34 -152 112 -409 126 -414 6 -2 34 2 63 10 28 7 80 16 114 20 l62 6 -81 -40 c-76 -37 -110 -62 -84 -62 20 0 90 25 90 32 0 14 79 48 109 48 16 0 36 7 45 15 16 16 36 20 36 7 0 -11 -36 -27 -89 -42 -23 -6 -41 -17 -41 -24 0 -11 8 -10 35 4 27 14 44 16 66 10 20 -6 40 -4 65 6 20 8 41 13 47 11 18 -6 -68 -47 -100 -48 -47 -2 -62 -9 -56 -25 3 -7 0 -14 -7 -14 -18 0 -612 -295 -642 -320 -16 -12 -28 -25 -28 -30 0 -23 66 -80 202 -177 82 -58 145 -109 141 -113 -4 -5 -80 -38 -169 -74 -170 -71 -224 -99 -224 -117 0 -6 18 -27 40 -46 22 -20 40 -39 40 -43 0 -4 -20 -15 -45 -24 -25 -10 -45 -24 -45 -32 0 -13 188 -159 258 -200 18 -10 31 -22 30 -26 -2 -5 -55 -32 -118 -61 -141 -65 -210 -105 -210 -121 0 -7 9 -21 20 -31 12 -10 18 -25 15 -33 -3 -10 0 -12 10 -8 19 7 85 -31 85 -49 0 -8 8 -13 18 -13 9 1 107 -53 217 -119 274 -164 294 -177 295 -185 0 -3 -21 -14 -47 -24 -27 -10 -104 -42 -173 -72 -69 -30 -140 -57 -159 -61 -19 -3 -36 -12 -39 -20 -4 -11 6 -13 54 -7 33 3 127 13 209 21 90 8 182 24 230 38 61 19 85 22 103 14 31 -14 28 -21 -15 -36 -84 -29 -332 -137 -383 -167 -66 -38 -223 -114 -237 -114 -5 0 -18 -6 -28 -14 -18 -13 -18 -14 10 -10 29 4 28 3 -7 -14 -21 -9 -38 -23 -38 -29 0 -20 11 -16 70 28 58 45 164 99 192 99 10 0 85 22 167 50 82 27 172 55 200 61 28 6 51 15 51 20 0 5 -3 9 -6 9 -14 0 -312 -94 -351 -111 -61 -26 -53 -16 20 24 125 69 293 137 403 164 14 3 68 -27 180 -101 259 -171 394 -266 394 -276 0 -6 7 -10 16 -10 9 0 28 -8 42 -19 53 -37 112 -61 149 -61 29 0 112 37 346 155 169 84 320 162 335 173 42 28 135 64 141 53 8 -12 83 20 251 108 74 38 159 79 188 91 30 11 115 50 190 86 239 115 430 204 437 204 12 0 77 42 72 46 -8 9 -235 -78 -277 -106 -27 -18 -169 -79 -210 -90 -14 -3 -25 -12 -25 -19 0 -7 -31 -26 -70 -42 -148 -63 -297 -120 -302 -115 -7 7 185 102 235 115 24 7 42 18 42 26 0 16 31 28 53 19 9 -3 17 0 19 9 1 8 84 56 183 107 99 51 214 112 255 135 41 23 144 77 228 120 185 94 186 96 64 169 l-84 50 90 31 c89 31 142 58 142 73 0 5 -11 19 -25 32 -42 40 -29 80 33 105 57 23 74 35 49 35 -9 0 -21 8 -26 19 -6 10 -41 38 -78 62 -37 24 -117 79 -177 122 -60 42 -115 77 -122 77 -7 0 -28 14 -46 31 -18 16 -50 40 -70 51 -21 12 -38 24 -38 28 0 3 48 32 108 63 157 84 354 193 380 212 26 19 28 46 5 67 -10 9 -94 62 -188 118 -93 56 -174 105 -178 109 -5 5 -1 26 8 47 29 67 85 224 85 238 0 8 -32 20 -85 31 -47 11 -85 22 -85 25 0 4 35 23 78 43 42 20 69 37 58 37 -10 0 -52 -17 -94 -37 -75 -36 -75 -36 -141 -25 -36 7 -160 28 -275 48 -264 44 -363 76 -532 170 -152 84 -172 88 -264 49 -33 -14 -81 -32 -107 -41 -27 -9 -55 -22 -63 -29 -8 -7 -62 -34 -120 -60 -58 -26 -139 -63 -180 -82 -62 -29 -72 -31 -56 -14 28 31 163 114 229 141 32 13 62 29 68 36 7 8 -10 57 -54 160 -35 82 -72 174 -82 204 -10 30 -26 72 -36 92 -11 21 -19 42 -19 47 0 6 53 50 118 97 243 181 422 316 428 326 3 5 3 20 0 34 l-6 24 -323 -2 c-177 0 -394 -4 -482 -8z m710 -40 c-11 -12 -53 -46 -94 -77 -42 -32 -100 -75 -129 -98 -29 -22 -107 -78 -172 -125 -65 -47 -233 -171 -372 -276 -139 -105 -289 -217 -333 -249 -44 -32 -83 -63 -87 -69 -12 -19 11 -19 40 0 l27 17 -24 -27 c-26 -27 -83 -38 -78 -13 3 15 -172 16 -738 4 -372 -8 -389 -8 -365 9 14 9 39 30 55 45 42 39 284 163 314 161 13 -1 29 2 35 7 6 5 45 23 86 39 41 17 140 61 220 100 112 53 153 68 177 65 76 -12 213 61 213 112 0 33 -23 47 -82 47 -86 1 -180 -47 -190 -97 -2 -11 -17 -24 -38 -32 -19 -7 -109 -39 -200 -72 -459 -165 -584 -229 -692 -350 l-43 -49 -137 -4 c-76 -2 -138 -3 -138 -2 0 3 350 248 620 435 102 71 221 155 265 187 44 33 103 74 130 92 28 19 95 68 150 110 l100 77 205 6 c113 4 311 12 440 18 129 6 368 14 530 18 162 4 301 8 309 9 10 2 9 -4 -4 -18z m-1288 -376 c6 -18 -59 -53 -112 -61 -43 -5 -47 -4 -44 13 8 41 145 83 156 48z m813 -139 c7 -22 26 -66 41 -98 l27 -58 -29 -32 c-16 -17 -29 -35 -29 -39 0 -17 20 -6 44 25 27 33 37 26 11 -9 -8 -10 -14 -26 -14 -34 -1 -10 5 -7 18 9 l18 24 47 -91 c53 -104 52 -102 26 -102 -29 0 -178 -80 -251 -135 -73 -55 -161 -131 -299 -256 -52 -47 -110 -96 -129 -109 l-33 -23 -239 18 c-131 10 -260 15 -286 12 -79 -9 -236 -37 -267 -47 -56 -19 -53 5 13 110 36 58 185 213 236 246 26 17 46 19 180 17 82 -2 151 -6 153 -10 17 -50 24 -47 218 104 80 62 148 113 150 113 3 0 24 13 47 28 68 47 289 159 327 167 34 7 35 7 18 -12 -10 -11 -18 -24 -18 -28 0 -5 13 6 29 25 32 39 24 53 -20 37 -37 -14 -46 -4 -31 35 6 18 10 34 7 36 -5 5 -28 -53 -25 -64 1 -7 -103 -72 -109 -68 -2 2 12 25 31 51 37 51 62 93 54 93 -2 0 -15 -19 -29 -42 -37 -63 -111 -138 -134 -138 -11 0 -26 -7 -33 -15 -13 -16 -40 -21 -40 -7 0 4 8 19 17 32 l17 25 -22 -19 c-12 -10 -26 -34 -32 -52 -7 -19 -18 -34 -26 -34 -8 0 -29 -13 -47 -30 -81 -75 -302 -250 -316 -250 -5 0 26 35 68 78 92 95 166 182 154 182 -11 0 -92 -84 -157 -162 -26 -32 -52 -58 -57 -58 -16 0 -10 26 11 45 11 10 20 21 20 25 0 4 -17 -10 -39 -31 -38 -38 -40 -39 -115 -39 -42 0 -76 2 -76 4 0 2 24 21 53 43 43 33 63 41 115 46 77 8 87 13 185 94 42 36 77 60 77 54 0 -7 14 -2 30 11 17 12 30 27 30 33 0 10 222 191 300 245 19 13 50 37 69 53 37 32 43 29 61 -28z m-1606 -203 c-83 -43 -169 -93 -192 -111 -23 -18 -39 -26 -36 -17 10 27 189 130 334 194 77 33 26 1 -106 -66z m-312 -174 c-5 -7 -21 -31 -36 -52 -14 -21 -26 -34 -26 -29 0 12 58 93 66 93 4 0 2 -6 -4 -12z m2515 -28 c10 0 36 -14 57 -30 22 -17 44 -30 48 -30 5 0 55 -29 111 -64 123 -77 257 -156 264 -156 3 0 98 -55 211 -123 114 -68 239 -141 277 -162 39 -21 138 -78 220 -125 83 -48 178 -102 213 -120 34 -18 62 -36 62 -40 0 -4 -17 -15 -38 -23 -48 -19 -548 -281 -870 -456 -194 -105 -637 -355 -897 -506 -132 -77 -260 -148 -350 -195 -44 -23 -101 -56 -127 -72 l-48 -30 -61 44 c-33 23 -79 60 -102 80 -23 21 -44 38 -47 38 -3 0 -24 17 -46 38 -22 20 -92 73 -155 116 -117 82 -223 158 -390 281 -52 38 -138 100 -190 137 -52 37 -166 119 -254 182 -88 64 -182 130 -208 148 l-48 32 88 45 c115 58 529 255 613 291 56 24 87 29 220 39 85 6 184 18 220 27 73 18 365 147 450 198 56 33 116 60 136 61 14 0 194 146 194 158 0 5 -6 7 -12 4 -7 -2 -38 -13 -68 -23 -64 -21 -187 -78 -150 -69 24 5 24 5 -3 -10 -40 -23 -28 -29 17 -10 77 33 70 8 -9 -30 -44 -21 -93 -47 -108 -58 -49 -34 -326 -161 -302 -139 37 35 205 139 205 127 0 -21 23 -18 37 4 7 11 28 24 47 31 20 6 36 16 36 21 0 10 -87 0 -115 -14 -20 -10 -20 -10 -1 11 20 23 95 60 227 113 98 39 181 83 179 94 -1 5 49 31 112 60 62 28 156 72 208 98 94 47 95 47 112 27 9 -11 24 -20 35 -20z m-1876 -64 c3 -3 -35 -46 -84 -97 -48 -50 -90 -89 -93 -87 -7 8 82 122 122 157 34 30 46 36 55 27z m139 -5 c0 -12 -130 -94 -138 -87 -4 5 4 16 17 25 47 31 67 50 52 51 -8 0 -63 -48 -122 -107 -60 -59 -112 -103 -116 -99 -4 4 42 55 103 115 108 106 110 108 157 108 26 0 47 -3 47 -6z m120 4 c0 -8 -132 -87 -137 -81 -3 3 -2 6 3 6 13 0 68 49 62 55 -2 3 -23 -9 -47 -26 -23 -17 -45 -29 -48 -25 -4 3 -4 7 -2 9 2 1 20 17 40 33 28 24 46 31 83 31 25 1 46 0 46 -2z m157 -13 c-26 -32 -87 -62 -124 -62 l-38 1 35 30 35 30 -30 -11 c-16 -6 -38 -19 -48 -27 -9 -9 -20 -13 -24 -9 -5 4 8 21 27 37 32 26 41 28 107 27 62 -1 71 -4 60 -16z m-569 -38 c-41 -57 -48 -62 -48 -30 0 15 12 34 31 50 47 39 54 31 17 -20z m53 7 c-21 -21 -47 -52 -57 -70 -19 -33 -34 -40 -34 -17 0 23 91 126 111 126 15 0 11 -8 -20 -39z m-101 19 c0 -5 -5 -10 -11 -10 -5 0 -7 5 -4 10 3 6 8 10 11 10 2 0 4 -4 4 -10z m385 -79 c-58 -27 -225 -197 -261 -265 -16 -31 -31 -56 -35 -56 -4 0 -19 55 -35 131 -8 36 110 164 159 174 18 4 40 9 50 12 10 2 -30 -42 -88 -99 -58 -57 -105 -109 -105 -117 0 -7 32 21 71 63 92 98 140 136 203 158 67 23 92 22 41 -1z m2151 -11 c84 -22 452 -90 490 -90 3 0 3 -4 0 -8 -2 -4 12 -8 32 -8 31 0 160 -23 171 -30 6 -5 -82 -254 -89 -254 -10 0 -127 67 -327 187 -95 57 -210 123 -256 147 -105 55 -155 86 -142 86 6 0 60 -13 121 -30z m-1016 -115 c-7 -8 -18 -15 -24 -15 -6 0 -2 7 8 15 25 19 32 19 16 0z m-280 -94 c0 -5 -7 -12 -16 -15 -14 -5 -15 -4 -4 9 14 17 20 19 20 6z m-1738 -98 c33 -29 16 -93 -25 -93 -46 0 -64 55 -30 92 20 22 31 23 55 1z m978 -63 c-20 -13 -33 -13 -25 0 3 6 14 10 23 10 15 0 15 -2 2 -10z m46 -15 c-11 -8 -29 -15 -40 -15 -19 1 -19 2 4 15 35 20 62 19 36 0z m74 1 c-14 -7 -36 -17 -50 -21 l-25 -8 25 21 c14 12 36 21 50 21 l25 0 -25 -13z m298 -6 c34 0 52 -4 47 -9 -22 -21 -255 -81 -255 -66 0 2 27 12 60 21 33 9 63 21 67 26 3 6 -2 8 -13 4 -56 -16 -256 -57 -267 -53 -29 9 261 91 291 81 8 -2 39 -4 70 -4z m-1396 -82 c3 -18 2 -53 -2 -78 -6 -37 -8 -39 -9 -14 -2 50 -13 94 -23 94 -5 0 -7 -4 -4 -8 7 -11 6 -50 -4 -287 -9 -243 -29 -328 -74 -333 -23 -3 -27 0 -22 15 27 88 48 234 51 359 2 119 14 221 30 272 3 6 15 12 28 12 20 0 25 -6 29 -32z m-25 -251 c-2 -23 -3 -1 -3 48 0 50 1 68 3 42 2 -26 2 -67 0 -90z m30 91 c-3 -7 -5 -2 -5 12 0 14 2 19 5 13 2 -7 2 -19 0 -25z m-10 -70 c-3 -7 -5 -2 -5 12 0 14 2 19 5 13 2 -7 2 -19 0 -25z m7 -271 c-4 -55 -3 -91 5 -104 8 -17 8 -22 -4 -27 -17 -6 -21 78 -9 168 11 75 16 53 8 -37z m3567 -67 c30 -22 57 -40 62 -40 4 0 36 -24 70 -52 34 -29 124 -93 200 -143 75 -49 137 -92 137 -95 0 -3 -89 -36 -198 -73 -108 -38 -233 -84 -277 -102 -44 -19 -174 -73 -290 -120 -260 -106 -289 -119 -393 -167 -46 -21 -86 -38 -89 -38 -3 0 -84 -34 -181 -76 -98 -41 -202 -86 -232 -99 -409 -173 -790 -351 -790 -369 0 -4 -11 -17 -25 -28 -31 -24 -33 -75 -5 -111 20 -25 20 -25 0 -30 -14 -4 -40 12 -88 51 -38 32 -131 106 -207 166 -76 60 -166 135 -199 166 -34 30 -105 93 -158 139 -54 46 -98 86 -98 89 0 2 6 0 13 -5 134 -103 211 -163 301 -237 270 -222 354 -286 377 -286 27 0 24 39 -6 80 -32 44 -32 46 9 20 21 -12 37 -17 41 -11 6 11 -13 30 -116 113 -36 29 -126 103 -200 163 -166 137 -285 229 -366 284 -35 23 -71 50 -80 60 -47 48 -439 347 -547 416 l-58 37 99 45 c54 24 135 60 181 79 l82 34 34 -38 c38 -41 27 -56 -18 -26 -43 27 -29 7 20 -31 46 -34 72 -45 59 -25 -10 16 11 12 25 -5 11 -13 10 -14 -4 -9 -32 12 -15 -13 24 -35 22 -12 76 -53 118 -89 43 -37 93 -80 111 -95 75 -63 14 -30 -158 83 -101 66 -206 132 -234 146 -65 33 -54 21 28 -31 36 -22 136 -88 223 -147 167 -113 192 -127 192 -109 0 6 7 11 15 11 8 0 15 -4 15 -10 0 -5 -5 -10 -11 -10 -5 0 -7 -5 -4 -10 4 -6 12 -9 18 -8 21 4 207 -125 229 -158 4 -6 33 -31 65 -55 32 -24 75 -58 96 -76 20 -18 43 -33 50 -33 6 0 45 -25 85 -55 41 -31 72 -51 70 -46 -4 12 -172 154 -221 187 -23 16 -57 45 -76 66 -19 21 -39 38 -44 38 -5 0 -32 20 -59 45 -28 25 -72 59 -99 77 -27 17 -47 33 -45 35 2 3 15 -3 28 -11 14 -9 27 -13 31 -10 4 4 18 -1 32 -10 14 -9 29 -15 34 -12 4 3 19 -6 31 -19 13 -14 21 -25 18 -25 -17 0 131 -129 155 -135 15 -4 27 -13 27 -20 0 -6 53 -49 118 -94 103 -72 111 -76 62 -31 -63 57 -47 69 21 16 40 -32 48 -35 100 -32 56 4 62 6 264 110 28 14 100 46 160 72 61 25 142 61 180 79 39 18 84 36 100 39 40 9 -26 -29 -259 -145 -98 -50 -200 -105 -226 -122 -27 -18 -67 -43 -90 -57 -22 -13 -36 -26 -30 -28 6 -2 16 1 23 6 7 6 37 20 67 31 31 11 179 84 330 161 151 77 284 140 297 140 14 0 23 6 23 16 0 8 17 22 38 31 20 8 93 41 162 73 213 98 517 226 709 299 172 65 211 84 200 95 -2 3 -92 -27 -199 -65 -239 -85 -276 -89 -96 -9 71 31 90 53 21 25 -80 -34 -41 -4 72 54 217 111 58 60 -207 -67 -69 -33 -189 -90 -268 -128 -79 -38 -147 -74 -151 -81 -4 -8 -41 -28 -81 -46 -41 -18 -91 -42 -111 -55 -42 -26 -50 -27 -43 -8 3 9 -42 -7 -116 -40 -67 -30 -124 -54 -128 -54 -43 1 750 383 842 406 14 3 23 10 20 15 -5 9 34 29 218 110 72 32 96 49 66 49 -17 0 -285 -121 -345 -156 -140 -80 -174 -94 -106 -44 50 37 453 268 469 269 7 1 36 -17 65 -39z m-3608 -37 c-3 -18 -9 -33 -14 -33 -11 0 -11 0 2 39 14 39 18 37 12 -6z m649 -119 c21 -15 35 -30 32 -35 -7 -12 -33 3 -63 35 -31 33 -17 33 31 0z m118 -112 c30 -32 76 -71 103 -86 26 -15 47 -29 47 -32 0 -12 -103 52 -157 97 -31 27 -61 49 -65 49 -4 0 -8 7 -8 15 0 28 24 15 80 -43z m2380 -26 c0 -2 -7 -7 -16 -10 -8 -3 -12 -2 -9 4 6 10 25 14 25 6z m-50 -21 c0 -5 -175 -95 -185 -95 -23 0 7 22 63 47 128 57 122 55 122 48z m-2747 -126 c87 -72 90 -76 25 -35 -32 20 -58 32 -58 27 0 -10 206 -154 303 -211 32 -19 80 -53 106 -75 26 -22 108 -84 182 -138 162 -119 228 -170 383 -295 150 -123 281 -272 238 -272 -12 0 -56 35 -228 180 -196 165 -444 357 -563 436 -122 81 -202 139 -326 238 -55 43 -121 92 -147 108 -55 34 -59 43 -23 52 14 4 28 13 31 21 8 21 8 21 77 -36z m717 -10 c26 -23 19 -20 -27 11 -35 22 -63 43 -63 46 0 8 52 -25 90 -57z m-30 -71 c0 -9 -136 88 -146 104 -4 6 27 -13 69 -42 43 -30 77 -57 77 -62z m2955 103 c-10 -8 -104 -42 -114 -40 -3 0 17 11 44 24 51 24 87 33 70 16z m35 -53 l18 -23 -162 -57 c-366 -129 -468 -168 -686 -263 -146 -64 -289 -123 -325 -135 -22 -7 -118 -46 -214 -87 -96 -40 -176 -71 -179 -69 -2 3 -36 -11 -75 -31 -39 -19 -121 -55 -183 -78 -121 -47 -553 -241 -568 -256 -5 -5 -7 -11 -4 -14 6 -6 71 20 352 141 82 36 150 63 152 61 10 -9 -463 -220 -496 -221 -33 -1 -35 1 -38 34 -3 35 -2 35 105 96 93 53 302 154 317 154 3 0 108 45 233 101 126 56 271 118 323 139 113 45 240 101 370 163 106 50 431 180 436 174 2 -2 -44 -25 -103 -52 -326 -145 -444 -201 -596 -280 -92 -49 -166 -90 -164 -92 3 -2 56 23 118 56 63 33 177 87 254 120 77 32 221 96 320 141 314 142 708 298 758 300 11 0 27 -10 37 -22z m-1454 -83 c-11 -8 -25 -15 -30 -15 -6 1 0 7 14 15 32 19 40 18 16 0z m-106 -45 c-46 -25 -64 -25 -25 -1 17 11 37 20 45 20 8 0 -1 -8 -20 -19z m-1118 -68 c26 -24 29 -42 7 -42 -6 0 -8 4 -4 9 3 5 -10 14 -29 21 -19 6 -37 19 -40 28 -3 9 -9 24 -13 32 -8 18 38 -10 79 -48z m2098 38 c-8 -5 -19 -10 -25 -10 -5 0 -3 5 5 10 8 5 20 10 25 10 6 0 3 -5 -5 -10z m465 -47 l85 -48 -47 -20 c-75 -30 -317 -151 -573 -287 -129 -68 -251 -130 -270 -138 -52 -21 -451 -226 -538 -276 -23 -14 -46 -23 -51 -20 -29 18 -156 -50 -145 -78 7 -19 -576 -342 -600 -333 -36 14 -686 452 -686 463 0 7 19 18 42 26 43 13 64 38 31 38 -10 -1 -36 -7 -58 -15 -44 -16 -60 -11 -31 11 19 13 18 14 -11 14 -31 0 -151 73 -217 133 -17 15 -39 30 -50 33 -10 4 -65 36 -120 72 -145 94 -197 123 -209 119 -12 -4 63 -54 233 -157 58 -34 112 -70 120 -80 8 -9 44 -31 79 -50 34 -19 77 -47 93 -62 17 -16 38 -33 47 -38 13 -8 12 -9 -6 -10 -13 0 -23 5 -23 10 0 6 -6 10 -13 10 -7 0 -39 18 -72 39 -110 72 -474 295 -620 381 -80 47 -145 87 -144 90 0 3 52 29 115 59 l116 54 46 -22 c33 -16 42 -18 33 -7 -12 14 -10 15 20 10 l34 -5 -39 20 c-47 25 -52 26 -36 6 7 -8 8 -15 2 -15 -5 0 -15 6 -21 14 -10 12 -7 18 17 30 28 14 32 14 58 -6 48 -35 50 -38 37 -46 -8 -5 6 -15 37 -27 28 -11 49 -24 47 -29 -2 -5 -46 -40 -98 -77 -52 -38 -95 -75 -97 -84 -5 -20 7 -19 32 4 12 10 61 44 109 75 l88 56 32 -32 c18 -18 57 -51 87 -74 30 -23 106 -86 169 -140 447 -388 589 -498 653 -508 54 -8 114 12 146 49 12 14 34 27 49 31 46 10 83 26 83 36 0 5 5 6 10 3 6 -3 10 -1 10 5 0 10 170 95 225 114 20 6 20 6 1 -9 -11 -8 -18 -15 -15 -15 14 0 323 111 384 138 39 17 97 41 130 53 33 12 74 33 91 46 17 12 35 23 41 23 35 0 355 148 347 161 -5 9 110 79 130 79 7 0 30 11 50 25 43 29 47 30 40 10 -4 -10 0 -15 10 -15 9 0 19 6 22 14 6 16 33 30 167 87 54 23 96 43 94 46 -2 2 -25 -6 -51 -17 -53 -22 -72 -26 -41 -8 23 14 274 106 292 107 7 1 51 -20 98 -46z m-2489 -54 l29 -31 -30 13 c-40 17 -49 25 -41 38 9 15 8 15 42 -20z m109 -99 c3 -6 -1 -7 -9 -4 -18 7 -21 14 -7 14 6 0 13 -4 16 -10z m1554 -134 c-2 -2 -26 -13 -54 -24 -27 -11 -67 -27 -87 -36 -68 -30 -40 -6 35 28 60 29 121 47 106 32z m-204 -86 c-3 -5 -12 -10 -18 -10 -7 0 -6 4 3 10 19 12 23 12 15 0z m-205 -77 c-41 -19 -163 -71 -270 -114 -107 -44 -206 -84 -220 -90 -14 -6 -21 -6 -15 -1 12 12 389 183 478 217 94 36 112 29 27 -12z m-1839 -192 l24 -19 -45 -12 c-25 -6 -104 -29 -176 -51 -71 -21 -143 -39 -160 -38 l-29 0 25 12 c14 6 43 19 65 29 61 27 249 97 261 98 7 0 22 -9 35 -19z m62 -44 c3 -13 -137 -54 -206 -61 l-62 -6 34 16 c42 19 201 63 219 61 7 -1 14 -6 15 -10z m1586 -121 c-11 -11 -79 -34 -73 -25 3 6 16 14 28 19 22 9 53 13 45 6z"/>
                <path d="M3160 4533 c0 -7 11 -25 25 -40 32 -36 32 -17 0 22 -14 17 -25 25 -25 18z"/>
                <path d="M2790 4206 c-8 -27 -9 -41 -2 -48 17 -17 35 31 24 62 -9 24 -9 23 -22 -14z"/>
                <path d="M4080 4052 c-24 -37 -48 -73 -53 -79 -5 -7 -7 -13 -4 -13 6 0 80 98 96 128 27 51 2 28 -39 -36z"/>
                <path d="M3895 3940 c-16 -16 -26 -32 -23 -35 3 -3 17 10 32 30 33 43 29 45 -9 5z"/>
                <path d="M3450 3670 c-29 -26 -31 -30 -14 -30 19 0 64 37 64 53 0 13 -15 6 -50 -23z"/>
                <path d="M3930 3580 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z"/>
                <path d="M3485 3540 c3 -5 8 -10 11 -10 2 0 4 5 4 10 0 6 -5 10 -11 10 -5 0 -7 -4 -4 -10z"/>
                <path d="M4083 3438 c-13 -6 -23 -15 -23 -20 0 -5 14 -2 30 7 45 23 38 35 -7 13z"/>
                <path d="M5190 3429 c0 -5 5 -7 10 -4 6 3 10 8 10 11 0 2 -4 4 -10 4 -5 0 -10 -5 -10 -11z"/>
                <path d="M4587 3355 c-166 -33 -340 -128 -399 -218 l-21 -33 -96 -1 c-115 -1 -184 -21 -313 -93 -189 -105 -227 -137 -197 -167 17 -17 3 -47 -31 -66 -16 -10 -30 -24 -30 -32 0 -12 89 -101 455 -457 l110 -107 90 50 c49 28 124 66 165 86 41 19 82 39 90 44 120 67 220 108 252 102 44 -7 126 31 139 64 4 12 29 31 56 43 118 54 464 200 472 200 4 0 16 9 26 20 22 24 51 -5 -335 335 -212 186 -238 206 -264 201 -21 -5 -36 0 -58 19 -16 14 -33 25 -36 24 -4 0 -38 -7 -75 -14z m191 -112 c64 -54 166 -143 227 -198 61 -55 132 -118 158 -139 l48 -39 -68 -18 c-225 -57 -433 -184 -433 -264 0 -13 -11 -14 -68 -9 -87 8 -163 -12 -307 -81 -146 -70 -275 -165 -224 -165 6 0 32 15 58 34 111 81 352 187 421 185 14 -1 3 -6 -25 -11 -47 -9 -215 -81 -215 -92 0 -3 8 -3 18 0 16 5 16 5 -1 -6 -9 -6 -22 -8 -27 -5 -6 4 -9 1 -8 -5 2 -6 -35 -31 -82 -56 -47 -25 -105 -57 -130 -70 l-45 -25 -65 71 c-102 113 -309 317 -371 366 -46 37 -55 49 -51 69 2 14 5 25 7 25 1 0 47 -46 101 -102 166 -173 358 -357 372 -358 21 0 -71 101 -289 321 l-195 197 100 63 c172 107 271 142 402 143 l72 1 240 -237 c234 -229 282 -272 282 -247 0 24 -422 447 -479 479 -31 17 47 102 155 168 54 33 144 66 238 87 34 7 63 13 65 14 2 1 56 -43 119 -96z m307 -223 c10 -11 16 -20 13 -20 -3 0 -13 9 -23 20 -10 11 -16 20 -13 20 3 0 13 -9 23 -20z m106 -97 c13 -16 12 -17 -3 -4 -17 13 -22 21 -14 21 2 0 10 -8 17 -17z m102 -95 c-2 -5 -12 -8 -22 -8 -19 0 -336 -127 -403 -161 -21 -11 -43 -17 -48 -14 -5 3 -27 -11 -50 -31 -22 -20 -40 -32 -40 -26 0 14 63 68 128 110 67 42 214 105 302 127 101 27 95 23 76 43 -30 34 -16 34 22 1 21 -19 37 -37 35 -41z m-1711 -105 c89 -77 111 -99 130 -127 12 -17 -14 2 -58 43 -43 41 -88 83 -99 93 -31 29 -8 21 27 -9z m1167 -187 c-14 -13 -69 -35 -69 -28 0 10 38 30 59 31 8 1 12 -1 10 -3z m-284 -56 c-33 -16 -64 -28 -70 -28 -5 0 17 13 50 29 33 16 65 29 70 28 6 0 -17 -13 -50 -29z m-386 -225 c22 -7 22 -8 7 -17 -14 -8 -26 -1 -60 34 -83 84 -111 123 -41 57 39 -36 81 -70 94 -74z"/>
                <path d="M4465 3150 c-4 -6 -28 -21 -55 -35 -49 -25 -67 -41 -56 -52 3 -3 31 14 63 38 77 57 79 59 66 59 -7 0 -15 -5 -18 -10z"/>
                <path d="M4623 3121 c-40 -16 -95 -47 -122 -70 -27 -22 -54 -41 -60 -41 -6 0 -11 -4 -11 -10 0 -21 41 -8 72 23 37 37 153 96 204 104 19 3 37 10 40 14 11 18 -53 7 -123 -20z"/>
                <path d="M4720 3051 c-80 -25 -247 -141 -204 -141 3 0 40 22 81 50 42 27 105 59 140 71 34 11 63 25 63 30 0 13 -16 11 -80 -10z"/>
                <path d="M4800 2978 c-55 -21 -177 -95 -199 -122 -27 -32 9 -23 60 15 51 39 158 93 206 105 27 7 31 24 6 23 -10 0 -43 -9 -73 -21z"/>
                <path d="M3975 2960 c-33 -11 -84 -35 -114 -54 -30 -20 -59 -37 -64 -39 -6 -2 -8 -9 -6 -16 3 -9 20 -2 54 22 28 18 88 46 135 62 128 43 131 44 90 44 -19 0 -62 -9 -95 -19z"/>
                <path d="M4054 2892 c-77 -26 -214 -105 -214 -123 0 -21 42 -6 84 30 47 40 123 74 211 93 27 6 54 15 60 20 20 18 -64 6 -141 -20z"/>
                <path d="M4744 2830 c-56 -33 -96 -70 -74 -70 16 0 139 82 140 93 0 12 -13 8 -66 -23z"/>
                <path d="M4175 2821 c-38 -10 -83 -24 -100 -30 -43 -17 -155 -85 -155 -93 0 -14 21 -8 50 12 16 11 59 33 97 49 62 27 97 37 176 55 15 4 25 11 22 16 -8 12 -4 12 -90 -9z"/>
                <path d="M4244 2740 c-100 -26 -269 -120 -230 -128 9 -2 28 5 43 16 52 36 132 72 210 93 43 12 82 25 88 30 15 14 -33 10 -111 -11z"/>
                <path d="M4229 2626 c-45 -19 -139 -68 -158 -83 -2 -2 -2 -6 2 -9 3 -3 42 12 87 35 45 23 90 41 99 41 18 0 41 18 41 32 0 12 -9 10 -71 -16z"/>
                <path d="M4277 2414 c-16 -9 -27 -18 -24 -20 3 -3 20 4 38 15 39 24 28 28 -14 5z"/>
                <path d="M4991 2745 c-72 -29 -188 -95 -170 -95 3 0 32 13 65 29 65 32 180 85 204 94 13 5 13 5 0 6 -8 0 -53 -15 -99 -34z"/>
                <path d="M4101 3320 c-84 -55 -187 -106 -296 -147 -62 -23 -78 -32 -50 -27 67 10 235 85 327 147 77 51 98 67 85 67 -2 0 -32 -18 -66 -40z"/>
                <path d="M5821 2954 c-14 -32 5 -29 27 4 13 19 13 22 0 22 -8 0 -20 -12 -27 -26z"/>
                <path d="M5900 2960 c0 -5 7 -7 15 -4 8 4 15 8 15 10 0 2 -7 4 -15 4 -8 0 -15 -4 -15 -10z"/>
                <path d="M5927 2944 c-15 -8 -44 -26 -64 -39 -19 -14 -49 -25 -65 -25 -33 0 -88 -25 -88 -40 0 -14 4 -13 49 11 22 11 49 18 59 15 12 -4 25 1 37 14 11 12 31 20 51 20 25 0 38 7 54 30 24 34 13 39 -33 14z"/>
                <path d="M3028 2860 c-25 -21 -48 -37 -50 -34 -3 2 -18 0 -33 -6 -21 -8 -25 -14 -17 -22 8 -8 15 -8 25 0 7 6 23 8 36 5 17 -4 29 1 47 23 13 16 23 33 24 38 0 5 8 15 18 22 9 7 12 14 6 14 -6 0 -31 -18 -56 -40z"/>
                <path d="M5713 2782 c-31 -15 -44 -32 -24 -32 11 0 81 40 81 46 0 8 -25 1 -57 -14z"/>
                <path d="M2970 2750 c-21 -7 -21 -8 -5 -9 11 0 27 4 35 9 18 11 5 11 -30 0z"/>
                <path d="M2778 2728 c-34 -12 -38 -33 -5 -22 55 18 91 22 120 13 41 -12 42 -12 27 6 -14 17 -99 19 -142 3z"/>
                <path d="M2794 2679 c-9 -16 18 -30 33 -17 7 6 10 14 7 19 -7 13 -31 11 -40 -2z"/>
                <path d="M2952 2620 c0 -14 2 -19 5 -12 2 6 2 18 0 25 -3 6 -5 1 -5 -13z"/>
                <path d="M2936 2575 c-9 -26 -7 -32 5 -12 6 10 9 21 6 23 -2 3 -7 -2 -11 -11z"/>
                <path d="M3327 3681 c-35 -23 -43 -31 -29 -31 6 0 24 11 39 25 33 28 29 31 -10 6z"/>
                <path d="M5895 3398 c-45 -16 -59 -29 -43 -39 19 -13 28 -11 28 6 0 8 15 21 33 29 37 17 26 19 -18 4z"/>
                <path d="M6020 2390 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z"/>
                <path d="M5880 2353 c-20 -8 -401 -171 -520 -223 -52 -23 -126 -55 -165 -72 -38 -17 -119 -53 -179 -79 -60 -27 -103 -43 -97 -35 10 12 9 13 -8 9 -29 -7 -45 -29 -28 -36 15 -6 16 -5 182 72 61 28 160 70 220 94 150 60 579 243 613 261 26 15 13 21 -18 9z"/>
                <path d="M5045 2140 c-8 -13 15 -13 35 0 12 8 11 10 -7 10 -12 0 -25 -4 -28 -10z"/>
                <path d="M4940 2090 c-47 -31 -48 -40 -1 -16 23 12 62 47 50 45 -2 0 -24 -13 -49 -29z"/>
                <path d="M5023 2009 c-46 -21 -83 -41 -83 -44 0 -4 132 54 167 74 41 24 -7 7 -84 -30z"/>
                <path d="M4844 1895 c-18 -13 -18 -14 4 -8 12 3 25 9 28 14 8 14 -10 11 -32 -6z"/>
                <path d="M4749 1852 c-31 -15 -100 -47 -155 -72 -54 -25 -165 -80 -247 -122 -81 -43 -153 -78 -161 -78 -17 0 -220 -99 -214 -105 6 -6 97 29 161 62 65 32 105 44 109 32 2 -5 12 -2 23 6 11 9 14 14 8 10 -7 -3 -13 -1 -13 5 0 6 124 71 275 145 151 74 275 137 275 140 0 6 5 8 -61 -23z"/>
                <path d="M4034 1606 c-28 -12 -68 -34 -88 -50 -21 -15 -44 -25 -52 -22 -9 3 -12 1 -9 -4 3 -6 11 -10 17 -10 18 0 114 48 127 64 7 8 26 18 42 21 16 4 29 11 29 16 0 12 -6 11 -66 -15z"/>
                <path d="M3975 1520 c-3 -6 1 -7 9 -4 18 7 21 14 7 14 -6 0 -13 -4 -16 -10z"/>
                <path d="M3930 1510 c0 -5 5 -10 11 -10 5 0 7 5 4 10 -3 6 -8 10 -11 10 -2 0 -4 -4 -4 -10z"/>
                <path d="M4050 1470 c-8 -5 -10 -10 -5 -10 6 0 17 5 25 10 8 5 11 10 5 10 -5 0 -17 -5 -25 -10z"/>
                <path d="M5845 1790 c-3 -6 1 -7 9 -4 18 7 21 14 7 14 -6 0 -13 -4 -16 -10z"/>
                <path d="M5720 1730 c-52 -27 -99 -50 -104 -50 -20 0 -506 -236 -506 -245 0 -6 58 20 215 94 72 34 168 79 215 98 88 38 268 129 285 144 21 20 -14 6 -105 -41z"/>
                <path d="M2730 1766 c0 -7 72 -47 77 -42 3 2 -13 14 -36 26 -23 11 -41 19 -41 16z"/>
                <path d="M5706 1685 c-122 -56 -181 -92 -91 -57 67 27 215 100 215 107 0 7 8 10 -124 -50z"/>
                <path d="M5775 1665 c-27 -13 -43 -24 -35 -24 8 0 35 11 60 24 58 31 41 31 -25 0z"/>
                <path d="M5033 1405 c-18 -8 -33 -16 -33 -19 0 -7 63 15 75 25 14 13 -5 10 -42 -6z"/>
                <path d="M4806 1312 c-50 -19 -208 -95 -354 -169 -145 -73 -270 -133 -278 -133 -8 0 -14 -5 -14 -11 0 -6 -7 -9 -15 -5 -8 3 -18 -1 -22 -8 -17 -29 -163 -72 -163 -48 0 4 44 27 98 52 133 61 369 180 358 180 -6 0 -62 -24 -125 -54 -64 -29 -163 -75 -221 -101 -107 -49 -133 -68 -128 -95 8 -41 129 3 401 146 67 36 175 89 241 120 148 69 334 163 321 162 -5 0 -50 -16 -99 -36z"/>
                <path d="M4230 1120 c-8 -5 -10 -10 -5 -10 6 0 17 5 25 10 8 5 11 10 5 10 -5 0 -17 -5 -25 -10z"/>
                <path d="M4183 1100 c-13 -5 -23 -12 -23 -15 0 -9 16 -5 36 10 22 16 19 18 -13 5z"/>
                <path d="M2547 4593 c-25 -24 6 -73 47 -73 21 0 32 46 16 65 -13 15 -51 20 -63 8z m43 -28 c0 -8 -4 -15 -10 -15 -5 0 -10 7 -10 15 0 8 5 15 10 15 6 0 10 -7 10 -15z"/>
                <path d="M2433 4553 c-17 -6 -16 -40 1 -46 15 -6 36 11 36 29 0 14 -20 23 -37 17z"/>
                <path d="M2690 4450 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z"/>
                <path d="M2310 4420 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z"/>
                <path d="M6247 4328 c-6 -21 -2 -36 7 -27 10 11 16 49 8 49 -5 0 -12 -10 -15 -22z"/>
                <path d="M1875 4289 c-4 -6 -5 -13 -2 -16 7 -7 27 6 27 18 0 12 -17 12 -25 -2z"/>
                <path d="M5200 4229 c0 -5 5 -7 10 -4 6 3 10 8 10 11 0 2 -4 4 -10 4 -5 0 -10 -5 -10 -11z"/>
                <path d="M5670 4220 c-11 -11 -20 -27 -20 -35 0 -21 36 -55 59 -55 47 0 71 78 32 100 -29 15 -49 12 -71 -10z m64 -24 c9 -13 7 -20 -8 -31 -32 -24 -62 15 -34 43 15 15 28 11 42 -12z"/>
                <path d="M370 4222 c0 -12 19 -26 26 -19 2 2 -2 10 -11 17 -9 8 -15 8 -15 2z"/>
                <path d="M4828 4139 c-50 -29 -37 -99 18 -99 33 0 86 52 78 75 -12 29 -65 43 -96 24z m58 -30 c11 -19 -13 -34 -31 -19 -13 11 -13 15 -3 21 18 12 26 11 34 -2z"/>
                <path d="M1965 4027 c-4 -10 -5 -21 -1 -24 10 -10 18 4 13 24 -4 17 -4 17 -12 0z"/>
                <path d="M5010 3970 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z"/>
                <path d="M5240 3956 c0 -8 6 -16 13 -19 22 -8 67 4 67 19 0 17 -22 18 -37 3 -8 -8 -13 -8 -17 0 -10 16 -26 14 -26 -3z"/>
                <path d="M5923 3783 c-18 -7 -16 -43 2 -43 18 0 31 28 19 39 -5 5 -15 6 -21 4z"/>
                <path d="M6083 3639 c-25 -9 -31 -29 -10 -29 19 0 52 26 41 32 -5 3 -19 2 -31 -3z"/>
                <path d="M2005 3590 c3 -5 8 -10 11 -10 2 0 4 5 4 10 0 6 -5 10 -11 10 -5 0 -7 -4 -4 -10z"/>
                <path d="M6350 3470 c0 -5 7 -10 15 -10 8 0 15 5 15 10 0 6 -7 10 -15 10 -8 0 -15 -4 -15 -10z"/>
                <path d="M1630 3445 c7 -9 15 -13 17 -11 7 7 -7 26 -19 26 -6 0 -6 -6 2 -15z"/>
                <path d="M1794 3115 c-10 -25 4 -45 31 -45 30 0 43 24 25 45 -16 19 -49 19 -56 0z"/>
                <path d="M3076 3111 c-4 -7 -5 -15 -2 -18 9 -9 19 4 14 18 -4 11 -6 11 -12 0z"/>
                <path d="M6710 2864 c0 -9 -11 -29 -25 -46 -14 -16 -25 -34 -25 -39 0 -15 17 -10 24 6 3 8 15 15 26 15 17 0 20 6 20 40 0 22 -4 40 -10 40 -5 0 -10 -7 -10 -16z"/>
                <path d="M1720 2789 c0 -14 5 -19 17 -17 26 5 29 38 4 38 -15 0 -21 -6 -21 -21z"/>
                <path d="M6210 2660 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z"/>
                <path d="M6575 2600 c3 -5 13 -10 21 -10 8 0 12 5 9 10 -3 6 -13 10 -21 10 -8 0 -12 -4 -9 -10z"/>
                <path d="M6640 2475 c0 -8 5 -15 10 -15 6 0 10 7 10 15 0 8 -4 15 -10 15 -5 0 -10 -7 -10 -15z"/>
                <path d="M1933 2133 c-7 -3 -13 -14 -13 -24 0 -16 6 -20 27 -17 14 2 28 8 30 15 5 14 -27 32 -44 26z"/>
                <path d="M1732 1998 c-20 -20 -14 -48 14 -60 34 -16 59 0 59 38 0 25 -4 29 -30 32 -17 2 -36 -3 -43 -10z m53 -11 c21 -16 13 -37 -15 -37 -22 0 -34 15 -26 35 7 19 17 19 41 2z"/>
                <path d="M1575 1890 c3 -5 8 -10 11 -10 2 0 4 5 4 10 0 6 -5 10 -11 10 -5 0 -7 -4 -4 -10z"/>
                <path d="M7445 1810 c-3 -5 -2 -10 4 -10 5 0 13 5 16 10 3 6 2 10 -4 10 -5 0 -13 -4 -16 -10z"/>
                <path d="M1995 1800 c3 -5 11 -10 16 -10 6 0 7 5 4 10 -3 6 -11 10 -16 10 -6 0 -7 -4 -4 -10z"/>
                <path d="M6279 1721 l-24 -20 40 9 c22 5 44 10 48 10 5 0 5 5 2 10 -10 16 -41 12 -66 -9z"/>
                <path d="M6505 1686 c-73 -50 -104 -84 -85 -96 20 -13 57 -13 65 0 4 6 -5 10 -20 10 -42 0 -25 20 39 46 67 27 86 41 86 60 0 23 -32 15 -85 -20z"/>
                <path d="M6183 1670 c-24 -10 -43 -22 -43 -25 0 -6 57 17 87 34 30 18 0 12 -44 -9z"/>
                <path d="M7655 1640 c3 -5 14 -10 23 -10 15 0 15 2 2 10 -20 13 -33 13 -25 0z"/>
                <path d="M6038 1599 c-21 -11 -38 -22 -38 -24 0 -5 79 32 89 41 12 11 -18 1 -51 -17z"/>
                <path d="M6375 1590 c-3 -5 -1 -10 4 -10 6 0 11 5 11 10 0 6 -2 10 -4 10 -3 0 -8 -4 -11 -10z"/>
                <path d="M2057 1519 c-24 -14 -22 -56 3 -64 25 -8 50 10 50 36 0 24 -30 40 -53 28z m33 -29 c0 -5 -7 -10 -15 -10 -8 0 -15 5 -15 10 0 6 7 10 15 10 8 0 15 -4 15 -10z"/>
                <path d="M5825 1415 c-77 -29 -171 -65 -210 -80 -38 -16 -110 -44 -160 -63 -49 -19 -97 -38 -105 -43 -67 -34 -383 -185 -419 -199 -26 -10 -156 -73 -291 -140 -243 -122 -427 -210 -436 -210 -3 0 -68 -40 -93 -57 -2 -2 -2 -6 2 -9 3 -3 48 16 99 44 51 28 163 83 248 122 85 40 218 102 295 139 77 37 218 98 312 136 95 38 171 70 169 73 -3 2 -29 -5 -58 -16 -106 -39 -111 -32 -11 17 56 27 112 53 125 57 12 4 54 21 93 39 38 17 84 37 100 43 83 30 472 185 485 193 32 18 -10 5 -145 -46z"/>
                <path d="M1736 1408 c-22 -31 -5 -42 39 -24 41 18 43 39 3 44 -18 2 -31 -4 -42 -20z m34 2 c0 -5 -5 -10 -11 -10 -5 0 -7 5 -4 10 3 6 8 10 11 10 2 0 4 -4 4 -10z"/>
                <path d="M6285 1405 c-87 -34 -379 -149 -535 -210 -138 -54 -292 -124 -276 -125 5 0 111 41 235 91 251 102 401 161 476 189 69 25 165 69 165 75 0 6 5 8 -65 -20z"/>
                <path d="M5350 1170 c-8 -5 -10 -10 -5 -10 6 0 17 5 25 10 8 5 11 10 5 10 -5 0 -17 -5 -25 -10z"/>
                <path d="M5365 1035 c-27 -14 -39 -22 -26 -19 37 9 108 44 91 44 -8 0 -37 -11 -65 -25z"/>
                <path d="M5240 985 c-30 -13 -48 -24 -40 -24 17 0 120 47 105 48 -5 0 -35 -11 -65 -24z"/>
                <path d="M4716 965 c-7 -19 5 -19 30 0 19 14 19 14 -2 15 -12 0 -24 -7 -28 -15z"/>
                <path d="M4930 939 c-206 -88 -604 -279 -597 -286 7 -6 351 150 662 301 79 39 40 29 -65 -15z"/>
                <path d="M5143 947 c-35 -13 -53 -27 -34 -27 14 0 71 28 71 35 0 3 -1 5 -2 4 -2 0 -17 -6 -35 -12z"/>
                <path d="M4615 910 c-38 -22 -67 -40 -62 -40 11 0 147 69 147 75 0 10 -17 3 -85 -35z"/>
                <path d="M4822 805 c-221 -99 -331 -154 -311 -155 4 0 49 20 100 44 52 24 137 63 189 86 52 24 133 60 178 81 46 22 88 39 92 39 5 0 12 5 15 10 11 17 -4 11 -263 -105z"/>
                <path d="M5878 909 c-21 -12 -24 -59 -6 -77 22 -22 67 -14 80 13 21 47 -28 91 -74 64z m47 -40 c0 -28 -23 -32 -39 -6 -8 14 -8 20 4 27 22 14 35 6 35 -21z"/>
                <path d="M6491 870 c6 -16 15 -30 20 -30 12 0 11 4 -3 35 -16 35 -29 31 -17 -5z"/>
                <path d="M4495 850 c-3 -6 1 -7 9 -4 18 7 21 14 7 14 -6 0 -13 -4 -16 -10z"/>
                <path d="M4375 790 c-3 -6 1 -7 9 -4 18 7 21 14 7 14 -6 0 -13 -4 -16 -10z"/>
                <path d="M4330 770 c-8 -5 -10 -10 -5 -10 6 0 17 5 25 10 8 5 11 10 5 10 -5 0 -17 -5 -25 -10z"/>
                <path d="M5533 773 c-19 -7 -16 -43 3 -50 23 -9 48 25 33 44 -12 14 -16 15 -36 6z"/>
                <path d="M4264 624 c-18 -14 -18 -14 6 -3 31 14 36 19 24 19 -6 0 -19 -7 -30 -16z"/>
                <path d="M4113 554 c-77 -38 -113 -64 -88 -64 10 0 160 78 180 94 35 27 3 16 -92 -30z"/>
                <path d="M7218 483 c7 -3 16 -2 19 1 4 3 -2 6 -13 5 -11 0 -14 -3 -6 -6z"/>
                <path d="M2270 410 c0 -5 7 -10 15 -10 8 0 15 5 15 10 0 6 -7 10 -15 10 -8 0 -15 -4 -15 -10z"/>
                <path d="M1340 370 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z"/>
              </g>
            </svg>
          </div>

          {/* Tagline */}
          <p className="font-serif italic text-3xl sm:text-4xl text-[#1C1716] leading-tight mb-7 sm:mb-8" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
            College-wide feedback, with trust.
          </p>

          {/* Feature cards */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="bg-white rounded-2xl shadow-[0_10px_30px_-15px_rgba(28,23,22,0.25)] p-3.5 sm:p-5 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2.5 sm:mb-3 rounded-full bg-[#EE930D] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-7 sm:h-7" aria-hidden="true">
                  <path d="M12 3.2 4.5 6v6.2c0 5 3.3 7.8 7.5 9.6 4.2-1.8 7.5-4.6 7.5-9.6V6L12 3.2Z"/>
                  <path d="m8.7 12.3 2.2 2.2 4.4-4.6"/>
                </svg>
              </div>
              <p className="font-serif font-semibold text-[#1C1716] text-xs sm:text-base leading-snug" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>Secure College SSO</p>
              <p className="text-[8px] sm:text-[11px] tracking-wider text-gray-400 uppercase mt-1">Single Sign-On</p>
            </div>

            <div className="bg-white rounded-2xl shadow-[0_10px_30px_-15px_rgba(28,23,22,0.25)] p-3.5 sm:p-5 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2.5 sm:mb-3 rounded-full bg-[#A2B396] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-7 sm:h-7" aria-hidden="true">
                  <path d="M3 21h18"/>
                  <path d="M4 21V9.5"/>
                  <path d="M20 21V9.5"/>
                  <path d="M2.5 9.5 12 4l9.5 5.5"/>
                  <path d="M8 21v-6.5"/>
                  <path d="M12 21v-6.5"/>
                  <path d="M16 21v-6.5"/>
                </svg>
              </div>
              <p className="font-serif font-semibold text-[#1C1716] text-xs sm:text-base leading-snug" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>All Departments</p>
              <p className="text-[8px] sm:text-[11px] tracking-wider text-gray-400 uppercase mt-1">All Years &middot; All Departments</p>
            </div>

            <div className="bg-white rounded-2xl shadow-[0_10px_30px_-15px_rgba(28,23,22,0.25)] p-3.5 sm:p-5 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2.5 sm:mb-3 rounded-full bg-[#69A0BC] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-7 sm:h-7" aria-hidden="true">
                  <path d="M14.5 4h3A2.5 2.5 0 0 1 20 6.5v4A2.5 2.5 0 0 1 17.5 13H16l-2 2v-2h-.5A2.5 2.5 0 0 1 11 10.5v-4A2.5 2.5 0 0 1 13.5 4Z"/>
                  <path d="M9.5 9c-3 .3-5 2-5 4.6a4.3 4.3 0 0 0 1.2 3L5 19l2.8-1a5 5 0 0 0 1.8.4"/>
                  <circle cx="14" cy="8.4" r="0.5" fill="white" stroke="none"/>
                  <circle cx="16" cy="8.4" r="0.5" fill="white" stroke="none"/>
                </svg>
              </div>
              <p className="font-serif font-semibold text-[#1C1716] text-xs sm:text-base leading-snug" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>Anonymous Feedback</p>
              <p className="text-[8px] sm:text-[11px] tracking-wider text-gray-400 uppercase mt-1">Secure &middot; Confidential &middot; Private</p>
            </div>
          </div>

          <p className="text-xs text-[#1C1716]/50 mt-auto">Secure College SSO &middot; VTU &middot; Karnataka</p>
        </section>

        {/* ================= RIGHT PANEL ================= */}
        <section className="relative bg-white flex flex-col px-6 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-12">
          
          <div className="flex justify-end">
            <button type="button" onClick={() => setActive(0)} className="inline-flex items-center gap-2 bg-[#EE930D] text-[#1C1716] font-medium text-sm pl-4 pr-1.5 py-1.5 rounded-full hover:brightness-95 active:brightness-90 transition">
              Student Access
              <span className="w-7 h-7 rounded-full bg-[#1C1716]/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <path d="M12 21.5s7-3.4 7-9V5.3L12 2.5l-7 2.8V12.5c0 5.6 7 9 7 9Z"/>
                  <circle cx="12" cy="9.6" r="1.9"/>
                  <path d="M8.8 14.8c0-1.7 1.4-2.6 3.2-2.6s3.2.9 3.2 2.6"/>
                </svg>
              </span>
            </button>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-[64px] text-[#1C1716] leading-[1.05] mt-6 sm:mt-8" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>Student Login</h1>

          <p className="text-gray-500 text-base sm:text-lg leading-relaxed mt-4 max-w-md">
            Access attendance, marks, and give anonymous feedback. Your USN is your identity.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); setActive(5); }} className="mt-8 space-y-5 flex-1" noValidate>
            <div>
              <label htmlFor="usn" className="block text-sm font-semibold text-[#1C1716] mb-2">University / USN</label>
              <div className="flex items-center gap-3 rounded-xl border border-[#E6DFD1] bg-white px-4 py-3.5 focus-within:border-[#EE930D] focus-within:ring-2 focus-within:ring-[#EE930D]/25 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0 text-[#1C1716]/60" aria-hidden="true">
                  <path d="M3 21h18"/>
                  <path d="M4 21V9.5"/>
                  <path d="M20 21V9.5"/>
                  <path d="M2.5 9.5 12 4l9.5 5.5"/>
                  <path d="M8 21v-6.5"/>
                  <path d="M12 21v-6.5"/>
                  <path d="M16 21v-6.5"/>
                </svg>
                <input id="usn" name="usn" type="text" defaultValue="1EP24CS001" size={12} required
                  className="font-semibold tracking-wide text-[#1C1716] bg-[#F4E6CE] rounded-md px-2 py-1 outline-none" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm mb-2"><span className="font-semibold text-[#1C1716]">Student Email</span> <span className="text-gray-400">(optional)</span></label>
              <div className="flex items-center gap-3 rounded-xl border border-[#E6DFD1] bg-white px-4 py-3.5 focus-within:border-[#EE930D] focus-within:ring-2 focus-within:ring-[#EE930D]/25 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0 text-[#1C1716]/60" aria-hidden="true">
                  <rect x="3" y="5.5" width="18" height="13" rx="2.2"/>
                  <path d="m3.5 7 8.5 6 8.5-6"/>
                </svg>
                <input id="email" name="email" type="email" placeholder="student.email@epcet.edu.in"
                  className="flex-1 min-w-0 outline-none bg-transparent text-[#1C1716] placeholder:text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="pw" className="block text-sm font-semibold text-[#1C1716] mb-2">Password</label>
              <div className="flex items-center gap-3 rounded-xl border border-[#E9D2A0] bg-white px-4 py-3.5 focus-within:border-[#EE930D] focus-within:ring-2 focus-within:ring-[#EE930D]/25 transition-colors">
                <input id="pw" name="password" type={showPassword ? 'text' : 'password'} defaultValue="1234" required
                  className="flex-1 min-w-0 outline-none bg-transparent text-[#1C1716] tracking-[0.4em]" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="shrink-0 text-xs font-medium text-[#1C1716]/70 border border-[#E6DFD1] rounded-lg px-3 py-1.5 hover:bg-[#F3EEE3] transition-colors">
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-500">
              <span className="inline-flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#EE930D] shrink-0" aria-hidden="true">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M12 11.2v5"/>
                  <circle cx="12" cy="7.8" r="0.9" fill="currentColor" stroke="none"/>
                </svg>
                Use your college email &middot; <span className="text-[#EE930D] font-medium">OTP</span> if password fails
              </span>
              <a href="#" className="underline underline-offset-2 text-[#1C1716] hover:text-[#EE930D] transition-colors">Forgot password?</a>
            </div>

            <button type="submit" className="w-full bg-[#1C1716] hover:bg-black text-white font-medium text-base sm:text-lg rounded-xl py-4 flex items-center justify-center gap-2 transition-colors mt-2">
              Continue to Student Dashboard
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Need help? &middot; <a href="#" className="underline underline-offset-2 text-[#1C1716] hover:text-[#EE930D] transition-colors">Contact HOD</a>
          </p>

          <p className="text-xs text-gray-400 mt-auto pt-8 text-center sm:text-right">
            Secured with 2FA &middot; <a href="#" className="underline hover:text-[#1C1716] transition-colors">Privacy Policy</a> &middot; <a href="#" className="underline hover:text-[#1C1716] transition-colors">Terms</a>
          </p>
        </section>
      </main>
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
              <span>EPCET</span>
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
