const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Restore the StudentLoginFlow wrapper to the floating card layout with responsive height constraints
const newWrapper = `<div className="bg-[#E9E2D3] min-h-[calc(100vh-64px)] flex items-center justify-center p-3 sm:p-6 md:p-8 font-sans selection:bg-[#EE930D]/20 md:h-[calc(100dvh-64px)] md:overflow-hidden">
      <main className="w-full max-w-[1400px] bg-white rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_40px_100px_-30px_rgba(28,23,22,0.35)] grid grid-cols-1 md:grid-cols-2 md:h-full md:max-h-[calc(100dvh-128px)]">`;
const currentWrapper = '<div className="grid grid-cols-1 lg:grid-cols-[40%_60%] border-x border-b border-[#E7E5E4] bg-white dark:bg-[#18181b] rounded-b-[16px] overflow-hidden mx-4 sm:mx-6 font-sans selection:bg-[#EE930D]/20">';

content = content.replace(currentWrapper, newWrapper);
content = content.replace('</div>\n  );\n}\n\nfunction Flow4', '</main>\n    </div>\n  );\n}\n\nfunction Flow4');

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Restored wrapper.");
