const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the end of Overview to include the new cards
const overviewSearch = `              <div className="bg-white/80 backdrop-blur-sm border border-[#E7E5E4] rounded-[16px] p-5 shadow-sm">
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#A8A29E] tracking-widest uppercase mb-3">
                  <span>🛡️</span> VERIFIED TODAY
                </div>
                <div className="text-[24px] font-serif text-[#1C1917] mb-1">12</div>
                <div className="text-[11px] text-[#78716C] mono">New logs</div>
              </div>
            </div>
          </div>
        )}`;

const overviewReplace = `              <div className="bg-white/80 backdrop-blur-sm border border-[#E7E5E4] rounded-[16px] p-5 shadow-sm">
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
              <div className="lg:col-span-3 bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-[24px] p-8 shadow-sm flex flex-col">
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
              <div className="lg:col-span-2 bg-[#1C1917] rounded-[24px] p-8 shadow-xl flex flex-col relative overflow-hidden group">
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
        )}`;

content = content.replace(overviewSearch, overviewReplace);


// Replace Leaderboard Placeholder
const leaderboardSearch = `        {/* Placeholder for Leaderboard */}
        {navTab === 'Leaderboard' && (
          <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full justify-center items-center text-center py-20">
             <div className="text-[40px] opacity-30 mb-4">🏆</div>
             <h2 className="serif text-[28px] text-[#1C1917]">Department Leaderboard</h2>
             <p className="text-[#78716C] mt-2 max-w-sm">Rankings will appear here once the first feedback cycle completes.</p>
          </div>
        )}`;

const leaderboardReplace = `        {navTab === 'Leaderboard' && (
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

            <div className="bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-[24px] p-2 sm:p-8 shadow-sm overflow-x-auto">
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
        )}`;

content = content.replace(leaderboardSearch, leaderboardReplace);

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Injected Leaderboard and Overview Insights sections.");
