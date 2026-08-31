
'use client';
import { useState, useEffect } from 'react';

type View = 'desk'|'cie'|'ledger'|'notes'|'id';

export default function AtelierPage(){
  const [view,setView]=useState<View>('desk');
  const [dark,setDark]=useState(false);
  const [step,setStep]=useState(1);
  const [sem,setSem]=useState(1);
  useEffect(()=>{document.documentElement.classList.toggle('dark',dark)},[dark]);

  return (
    <div className={`${dark?'bg-[#0f0e0c] text-[#f5f1e8]':'bg-[#fdf8f0] text-[#111]'} min-h-screen antialiased selection:bg-[#c45a3c]/20`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .serif{font-family:'Newsreader',serif} .sans{font-family:Inter,sans-serif} .mono{font-family:'JetBrains Mono',monospace}
        .paper-grain:before{content:'';position:fixed;inset:0;pointer-events:none;opacity:.035;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");}
        .ink-stamp{box-shadow: inset 0 1px 0 rgba(255,255,255,.6), inset 0 -2px 0 rgba(0,0,0,.15), 0 2px 8px rgba(0,0,0,.12)}
        .ink-stamp:active{transform: translateY(1px) scale(.98); box-shadow: inset 0 2px 4px rgba(0,0,0,.2)}
        .index-card{box-shadow: 0 1px 2px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.08)}
        .tape{position:relative}
        .tape:after{content:'';position:absolute;top:-10px;left:50%;width:56px;height:18px;background:rgba(255,255,255,.6);transform:translateX(-50%) rotate(-2deg);backdrop-filter:blur(2px);border-left:1px solid rgba(0,0,0,.05);border-right:1px solid rgba(0,0,0,.05)}
      `}</style>

      {/* FILE RAIL - never seen before nav */}
      <aside className={`hidden lg:flex fixed left-0 top-0 h-full w-[300px] z-20 flex-col pt-8 ${dark?'':' '}`}>
        <div className="px-8 mb-10">
          <div className="serif text-[28px] leading-[0.9] font-[600] tracking-[-0.02em]">EPECT<br/>Student</div>
          <div className="mono text-[10px] tracking-[0.14em] uppercase mt-3 opacity-50">Academic Workspace — Atelier Ed.</div>
        </div>
        <nav className="flex-1 pl-2">
          {[
            {id:'desk', label:'Desk', num:'01', desc:'overview & today', h:'h-[86px]'},
            {id:'cie', label:'CIE Marks', num:'02', desc:'performance ledger', h:'h-[92px]'},
            {id:'ledger', label:'Attendance', num:'03', desc:'ledger & prediction', h:'h-[98px]', live:true},
            {id:'notes', label:'Feedback', num:'04', desc:'faculty notes', h:'h-[86px]'},
            {id:'id', label:'ID Card', num:'05', desc:'academic particulars', h:'h-[80px]'},
          ].map(item=>(
            <button key={item.id} onClick={()=>setView(item.id as View)}
              className={`group relative w-[272px] ${item.h} text-left pl-8 pr-6 flex items-center justify-between border-y -mb-px transition-all
              ${view===item.id? (dark?'bg-[#1c1b18] border-[#2a2825] translate-x-2':'bg-white border-[#e8e0d2] translate-x-2 index-card rotate-[-0.5deg]') : (dark?'border-[#1c1b18] hover:bg-[#1c1b18]/50':'border-transparent hover:bg-white/60')}`}>
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="mono text-[11px] opacity-40">{item.num}</span>
                  <span className={`serif text-[22px] font-[500] tracking-tight ${view===item.id?'':'opacity-80 group-hover:opacity-100'}`}>{item.label}</span>
                </div>
                <div className="mono text-[10px] tracking-wide opacity-40 mt-1 ml-[30px]">{item.desc}</div>
                {view===item.id&&<div className="absolute left-8 -bottom-[1px] w-20 h-[2px] bg-[#111] dark:bg-[#f5f1e8]" style={{borderRadius:'1px', transform:'rotate(-1deg)'}}/>}
              </div>
              {item.live&&<span className="w-2 h-2 rounded-full bg-[#c45a3c] animate-pulse"/>}
            </button>
          ))}
        </nav>
        <div className="p-8">
          <div className={`rounded-[12px] p-3 flex items-center gap-3 border ${dark?'bg-[#1c1b18] border-[#2a2825]':'bg-white border-[#e8e0d2] index-card rotate-[0.5deg]'}`}>
            <div className="w-9 h-9 rounded-[8px] bg-[#111] dark:bg-[#f5f1e8] text-[#fdf8f0] dark:text-[#111] grid place-items-center font-bold serif">S</div>
            <div><div className="sans text-[12px] font-semibold">Student 1</div><div className="mono text-[11px] opacity-60">1EP24CS001</div></div>
          </div>
          <button onClick={()=>setDark(!dark)} className="mt-4 mono text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100">{dark?'Light paper':'Dark ink'} — press</button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="lg:pl-[300px]">
        {/* Top marginalia */}
        <div className="h-[64px] px-6 lg:px-12 flex items-center justify-between border-b border-[#e8e0d2]/60 dark:border-[#2a2825]/60 sticky top-0 backdrop-blur-xl z-10 bg-[#fdf8f0]/80 dark:bg-[#0f0e0c]/80">
          <div className="mono text-[11px] tracking-[0.12em] uppercase opacity-50">
            {view==='desk'&&'Desk — overview & today'}
            {view==='cie'&&'02 — CIE Marks / Performance Ledger'}
            {view==='ledger'&&'03 — Attendance / Ledger & Prediction'}
            {view==='notes'&&'04 — Feedback / Faculty Notes'}
            {view==='id'&&'05 — ID Card / Academic Particulars'}
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline mono text-[11px] px-2.5 py-1 rounded-full border border-[#e8e0d2] dark:border-[#2a2825]">USN — 1EP24CS001 • CSE • Sec A</span>
            <button onClick={()=>setDark(!dark)} className="lg:hidden w-8 h-8 rounded-full border border-[#e8e0d2] dark:border-[#2a2825] grid place-items-center">◑</button>
          </div>
        </div>

        <div className="max-w-[1040px] mx-auto px-6 lg:px-12 py-8 lg:py-12 pb-28">
          {view==='desk'&&(
            <>
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <h1 className="serif text-[44px] lg:text-[56px] leading-[0.9] tracking-[-0.03em] font-[500]">Good morning,<br/>Student 1<span className="align-super text-[16px] ml-2 opacity-40 serif font-[400]">01</span></h1>
                <div className="lg:ml-auto lg:mt-4 mono text-[11px] leading-[1.6] opacity-60 max-w-[220px] border-l border-[#e8e0d2] pl-4 dark:border-[#2a2825]">
                  <div>Here's what's on track today.</div>
                  <div className="mt-1">Attendance live. 5 subjects pending for feedback. No CIE published yet.</div>
                  <div className="mt-2 text-[10px]">→ Start with ledger</div>
                </div>
              </div>

              {/* Ledger book spread - not cards */}
              <div className={`mt-12 rounded-[18px] border grid lg:grid-cols-[320px_1fr] overflow-hidden ${dark?'bg-[#1c1b18] border-[#2a2825]':'bg-white border-[#e8e0d2] index-card'}`}>
                <div className={`p-8 border-b lg:border-b-0 lg:border-r ${dark?'border-[#2a2825] bg-[#1f1e1b]':'border-[#e8e0d2] bg-[#fdf8f0]/60'}`}>
                  <div className="mono text-[10px] uppercase tracking-[0.14em] opacity-50">Attendance Ledger</div>
                  <div className="mt-6 relative w-[160px] h-[160px] mx-auto">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="42" fill="none" stroke={dark?"#2a2825":"#f0e9dd"} strokeWidth="6"/>
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#111" className="dark:stroke-[#f5f1e8]" strokeWidth="6" strokeLinecap="round" strokeDasharray="0 264" strokeDashoffset="0" style={{filter:'url(#wobble)'}}/>
                    </svg>
                    <div className="absolute inset-0 grid place-items-center"><div className="text-center"><div className="serif text-[32px] font-[600] leading-none">0%</div><div className="mono text-[10px] opacity-50 mt-1">0 / 0 classes</div></div></div>
                  </div>
                  <div className="mt-8 space-y-2 mono text-[11px]">
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#111] dark:bg-[#f5f1e8]"/>Present — 0</div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full border border-[#111]/30 dark:border-white/30"/>Absent — 0</div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#c45a3c]/60"/>Late / Medical — 0</div>
                  </div>
                  <button onClick={()=>setView('ledger')} className="mt-8 w-full h-[44px] rounded-full bg-[#111] dark:bg-[#f5f1e8] text-[#fdf8f0] dark:text-[#111] sans text-[13px] font-[500] ink-stamp flex items-center justify-center gap-2">Open ledger <span>↗</span></button>
                </div>
                <div className="p-8">
                  <div className="mono text-[10px] uppercase tracking-[0.14em] opacity-50">Thread of Sessions</div>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {Array.from({length:32}).map((_,i)=><div key={i} className={`w-[14px] h-[14px] rounded-full border ${i<0?'bg-[#111] border-[#111] dark:bg-white dark:border-white':'border-[#e8e0d2] dark:border-[#2a2825]'} ${i%7===3?'rotate-3':''}`} title={`Session ${i+1}`}/>)}
                  </div>
                  <div className="mt-8 mono text-[11px] leading-[1.7] opacity-60 max-w-[420px]">No sessions logged yet for Batch 2024-2028 • Dept CSE • Sem 1 • Sec A. Once faculty logs, this thread fills with ink dots and your eligibility prediction appears.</div>
                  <div className="mt-8 pt-6 border-t border-dashed border-[#e8e0d2] dark:border-[#2a2825] flex gap-3">
                    <button onClick={()=>setView('notes')} className="h-[36px] px-4 rounded-full border border-[#111] dark:border-[#f5f1e8] sans text-[12px] font-[500] flex items-center gap-2">Faculty notes →</button>
                    <button onClick={()=>setView('cie')} className="h-[36px] px-4 rounded-full bg-[#fdf8f0] dark:bg-[#1f1e1b] border border-[#e8e0d2] dark:border-[#2a2825] sans text-[12px]">CIE ledger</button>
                  </div>
                </div>
              </div>

              {/* Quick Stack - fanned index cards */}
              <div className="mt-10">
                <div className="mono text-[10px] uppercase tracking-[0.14em] opacity-50 mb-4">Quick Stack — pull a card</div>
                <div className="relative h-[160px]">
                  {[
                    {id:'notes', title:'Subject Feedback', meta:'5 pending • Sem 1', rot:'-2.5deg', x:0},
                    {id:'cie', title:'CIE Analysis', meta:'No marks yet • Overlay', rot:'1.2deg', x:72},
                    {id:'id', title:'Academic ID', meta:'CSE • 1EP24CS001', rot:'-0.8deg', x:144},
                  ].map(card=>(
                    <button key={card.id} onClick={()=>setView(card.id as View)} style={{transform:`translateX(${card.x}px) rotate(${card.rot})`}} className={`absolute top-0 w-[260px] h-[128px] rounded-[14px] border text-left p-4 index-card hover:rotate-0 hover:z-10 transition-all ${dark?'bg-[#1c1b18] border-[#2a2825]':'bg-white border-[#e8e0d2]'}`}>
                      <div className="mono text-[10px] opacity-40">{card.meta}</div>
                      <div className="serif text-[18px] font-[500] mt-2">{card.title}</div>
                      <div className="absolute bottom-3 right-3 w-6 h-6 rounded-full border border-[#e8e0d2] dark:border-[#2a2825] grid place-items-center text-[12px]">↗</div>
                      <div className="absolute top-3 right-4 w-2 h-2 rounded-full bg-[#c45a3c]"/>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {view==='ledger'&&(
            <div className="space-y-6">
              <div className="flex items-baseline gap-4"><h2 className="serif text-[32px] font-[500]">Attendance Ledger</h2><span className="mono text-[11px] opacity-40">Dept CSE / Batch 2024-2028 / USN 1EP24CS001</span></div>
              <div className={`rounded-[16px] border p-10 text-center ${dark?'bg-[#1c1b18] border-[#2a2825]':'bg-white border-[#e8e0d2] index-card'}`}>
                <div className="serif text-[20px]">No attendance recorded yet for Semester 1</div>
                <div className="mono text-[11px] opacity-60 mt-2">There are currently no sessions logged.</div>
              </div>
            </div>
          )}

          {view==='notes'&&(
            <div className={`rounded-[18px] border p-8 max-w-[720px] ${dark?'bg-[#1c1b18] border-[#2a2825]':'bg-white border-[#e8e0d2] index-card'}`}>
              <div className="flex gap-8">
                <div className="hidden md:block mono text-[11px] leading-[2.2] opacity-40">
                  <div className={`${step>=1?'opacity-100 font-bold':''}`}>01 — choose term</div>
                  <div className={`${step>=2?'opacity-100 font-bold':''}`}>02 — choose subject</div>
                  <div className={`${step>=3?'opacity-100 font-bold':''}`}>03 — evaluate</div>
                </div>
                <div className="flex-1">
                  {step===1&&<><div className="serif text-[20px]">Select term</div><div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">{[1,2,3,4,5,6,7,8].map(n=><button key={n} onClick={()=>setStep(2)} className={`h-[64px] rounded-[12px] border text-left px-4 ${dark?'border-[#2a2825] bg-[#1f1e1b] hover:bg-[#2a2825]':'border-[#e8e0d2] bg-[#fdf8f0] hover:bg-white'} sans text-[13px]`}><span className="mono text-[10px] opacity-40">TERM</span><br/>Sem {n}</button>)}</div></>}
                  {step===2&&<><button onClick={()=>setStep(1)} className="mono text-[11px] opacity-60">← back to terms</button><div className="grid md:grid-cols-2 gap-3 mt-4">{[['21CS51','Teacher 1'],['21CS52','Teacher 4'],['21CS53','Teacher 7'],['21CS54','Teacher 6'],['21CS55','abcd123']].map(([c,f])=><button key={c} onClick={()=>setStep(3)} className={`rounded-[12px] border p-4 text-left ${dark?'bg-[#1f1e1b] border-[#2a2825]':'bg-[#fdf8f0] border-[#e8e0d2]'} hover:rotate-[0.3deg] transition`}><div className="mono text-[10px] opacity-40">{c}</div><div className="serif text-[16px] font-[500]">{c}</div><div className="mono text-[11px] opacity-60 mt-2">Faculty: {f}</div></button>)}</div></>}
                  {step===3&&<><button onClick={()=>setStep(2)} className="mono text-[11px] opacity-60">← back to subjects</button><div className="mt-6 p-10 rounded-[12px] border border-dashed text-center mono text-[11px] opacity-50">No evaluation criteria configured for this session.</div></>}
                </div>
              </div>
            </div>
          )}

          {view==='id'&&(
            <div className="max-w-[640px]">
              <div className={`tape rounded-[16px] border p-8 ${dark?'bg-[#1c1b18] border-[#2a2825]':'bg-white border-[#e8e0d2] index-card rotate-[-0.4deg]'}`}>
                <div className="flex gap-4"><div className="w-14 h-14 rounded-[12px] bg-[#111] dark:bg-[#f5f1e8] text-[#fdf8f0] dark:text-[#111] grid place-items-center serif font-bold text-xl">S</div><div><div className="serif text-[22px] font-[600]">Student 1</div><div className="mono text-[12px]">1EP24CS001</div><div className="mono text-[10px] opacity-50 mt-1">EPECT DEMO • CSE • 2024-2028</div></div></div>
                <div className="mt-8 grid grid-cols-2 gap-4 mono text-[11px]"><div><div className="opacity-40 uppercase tracking-wide text-[10px]">Department</div><div className="mt-1 font-[500]">CSE</div></div><div><div className="opacity-40 uppercase text-[10px]">Batch</div><div className="mt-1">2024-2028</div></div><div><div className="opacity-40 uppercase text-[10px]">Section</div><div className="mt-1">A</div></div><div><div className="opacity-40 uppercase text-[10px]">Email</div><div className="mt-1">1ep24cs001@gmail.com</div></div></div>
              </div>
            </div>
          )}

          {view==='cie'&&(
            <div className={`rounded-[16px] border p-12 text-center ${dark?'bg-[#1c1b18] border-[#2a2825]':'bg-white border-[#e8e0d2] index-card'}`}>
              <div className="serif text-[18px]">No Published Marks</div><div className="mono text-[11px] opacity-60 mt-2">Semester 1 — no assessments published yet.</div>
            </div>
          )}
        </div>

        {/* Mobile file rail */}
        <div className={`lg:hidden fixed bottom-0 left-0 right-0 border-t flex justify-around p-2 z-20 ${dark?'bg-[#0f0e0c] border-[#2a2825]':'bg-[#fdf8f0] border-[#e8e0d2]'}`}>
          {[
            {id:'desk', l:'Desk'},
            {id:'ledger', l:'Ledger'},
            {id:'notes', l:'Notes'},
            {id:'id', l:'ID'},
          ].map(b=><button key={b.id} onClick={()=>setView(b.id as View)} className={`mono text-[11px] px-4 h-10 rounded-full ${view===b.id?'bg-[#111] text-[#fdf8f0] dark:bg-[#f5f1e8] dark:text-[#111]':'opacity-50'}`}>{b.l}</button>)}
        </div>
      </main>
      <svg width="0" height="0"><filter id="wobble"><feTurbulence baseFrequency="0.01" numOctaves="2"/><feDisplacementMap in="SourceGraphic" scale="1"/></filter></svg>
    </div>
  )
}
