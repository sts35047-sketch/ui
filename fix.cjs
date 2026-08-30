const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
const search = `      {/* Top Linear-like Segmented Control */}
            <span>&lt;</span> BACK
          </button>
        )}`;
const replacement = `      {/* Top Linear-like Segmented Control */}
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
`;
content = content.replace(search, replacement);

const search2 = `        </div>
      </div>

      <main className="max-w-[1200px] mx-auto">`;
const replacement2 = `        </div>
      </div>
      )}

      <main className={active === 6 ? "" : "max-w-[1200px] mx-auto"}>`;
content = content.replace(search2, replacement2);
fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Fixed successfully");
