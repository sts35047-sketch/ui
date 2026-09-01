const fs = require('fs');
let txt = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add Back button to Flow4 Top Navbar
const flow4Find = `<span>EPCET</span>
            </div>
          </div>
        </div>`;
const flow4Replace = `<span>EPCET</span>
            </div>
          </div>
          <button 
            onClick={() => setActive(0)} 
            className="ml-4 px-3 py-1.5 rounded-full text-[12px] font-medium text-[#57534E] bg-white/50 hover:bg-white transition-colors border border-[#E7E5E4] dark:border-[#27272a] flex items-center gap-1 shadow-sm"
          >
            <span>&lt;</span> BACK
          </button>
        </div>`;

if (txt.includes(flow4Find)) {
  txt = txt.replace(flow4Find, flow4Replace);
  console.log("Added to Flow4");
}

// 2. Add Back button to CollegeAdminDashboard if it's missing or update it to go to setActive(0)
const adminFind = `onClick={() => setActive(1)} 
            className="ml-4 px-3 py-1.5 rounded-full text-[12px] font-medium text-[#57534E] bg-white/50 hover:bg-white transition-colors border border-[#E7E5E4] dark:border-[#27272a] flex items-center gap-1 shadow-sm"
          >
            <span>&lt;</span> BACK`;
const adminReplace = `onClick={() => setActive(0)} 
            className="ml-4 px-3 py-1.5 rounded-full text-[12px] font-medium text-[#57534E] bg-white/50 hover:bg-white transition-colors border border-[#E7E5E4] dark:border-[#27272a] flex items-center gap-1 shadow-sm"
          >
            <span>&lt;</span> BACK`;
if (txt.includes(adminFind)) {
  txt = txt.replace(adminFind, adminReplace);
  console.log("Updated CollegeAdminDashboard Back button to go to roles (0)");
}


// Let's also check if Flow1, Flow2, Flow3, StudentLoginFlow have back buttons.
// Flow1 doesn't need one because it's the root/landing page (Role Selection).
// Flow2 (College Login):
const flow2Find = `<button onClick={() => setActive(0)} className="mono text-[12px] text-[#78716C] hover:text-[#1C1917] inline-flex items-center gap-1.5">Back to roles</button>`;
const flow2Replace = `<button onClick={() => setActive(0)} className="mb-4 px-3 py-1.5 rounded-full text-[12px] font-medium text-[#57534E] bg-white/50 hover:bg-white transition-colors border border-[#E7E5E4] dark:border-[#27272a] inline-flex items-center gap-1 shadow-sm self-start">
            <span>&lt;</span> BACK
          </button>`;
if (txt.includes(flow2Find)) {
  txt = txt.replace(flow2Find, flow2Replace);
  console.log("Updated Flow2 (College Login) Back button");
}

// Flow3 (HOD & Faculty Login):
const flow3Find = `<button onClick={() => setActive(0)} className="mono text-[12px] text-[#78716C] hover:text-[#1C1917] inline-flex items-center gap-1.5">&lt; Back to roles</button>`;
const flow3Replace = `<button onClick={() => setActive(0)} className="mb-4 px-3 py-1.5 rounded-full text-[12px] font-medium text-[#57534E] bg-white/50 hover:bg-white transition-colors border border-[#E7E5E4] dark:border-[#27272a] inline-flex items-center gap-1 shadow-sm self-start">
            <span>&lt;</span> BACK
          </button>`;
if (txt.includes(flow3Find)) {
  txt = txt.replace(flow3Find, flow3Replace);
  console.log("Updated Flow3 (HOD Login) Back button");
}

fs.writeFileSync('src/App.tsx', txt);
