const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const search = `        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1C1917] rounded-[12px] flex items-center justify-center text-[18px]">🎓</div>
          <div>
            <div className="font-bold text-[16px] text-[#1C1917] leading-tight">EduFeedback Pro</div>
            <div className="text-[9px] font-bold text-[#A8A29E] tracking-widest flex items-center gap-1.5 mt-0.5 uppercase">
              <span>WARM</span> <span>•</span> <span>HUMAN</span> <span>•</span> <span>EPCET</span>
            </div>
          </div>
        </div>`;

const replace = `        <div className="flex items-center gap-3">
          <img src={logoUrl} alt="Logo" className="w-10 h-10 object-contain" />
          <div>
            <div className="serif text-[16px] font-bold text-[#1C1917] leading-tight">EduFeedback Pro</div>
            <div className="text-[9px] font-bold text-[#A8A29E] tracking-widest flex items-center gap-1.5 mt-0.5 uppercase">
              <span>WARM</span> <span>•</span> <span>HUMAN</span> <span>•</span> <span>EPCET</span>
            </div>
          </div>
          <button 
            onClick={() => setActive(1)} 
            className="ml-4 px-3 py-1.5 rounded-full text-[12px] font-medium text-[#57534E] bg-white/50 hover:bg-white transition-colors border border-[#E7E5E4] flex items-center gap-1 shadow-sm"
          >
            <span>&lt;</span> BACK
          </button>
        </div>`;

content = content.replace(search, replace);
fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Updated logo and added back button");
