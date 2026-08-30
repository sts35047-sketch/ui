const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = content.indexOf('function StudentLoginFlow({ setActive }');
const nextFnIdx = content.indexOf('function Flow4', startIdx);
let fnContent = content.substring(startIdx, nextFnIdx);

// Outer wrapper
fnContent = fnContent.replace(
  'bg-[#E9E2D3] min-h-[calc(100vh-80px)] flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 font-sans selection:bg-[#EE930D]/20',
  'bg-[#E9E2D3] h-[calc(100dvh-64px)] flex font-sans selection:bg-[#EE930D]/20'
);

// Main card height
fnContent = fnContent.replace(
  'w-full max-w-[1400px] bg-white rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_40px_100px_-30px_rgba(28,23,22,0.35)] flex flex-col-reverse md:grid md:grid-cols-2',
  'w-full h-full bg-white flex flex-col-reverse md:grid md:grid-cols-2 overflow-hidden'
);

// Left Panel inner flex centering (so content doesn't stretch too wide on huge screens)
// Replace left section classes
fnContent = fnContent.replace(
  '<section className="relative bg-[#F2E8DB] flex flex-col px-6 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">',
  '<section className="relative bg-[#F2E8DB] flex flex-col items-center h-full">\n          <div className="w-full max-w-[600px] h-full flex flex-col justify-between px-6 py-4 sm:px-8 sm:py-6 lg:px-12 lg:py-6">'
);

// Replace emoji with logo
fnContent = fnContent.replace(
  '<span className="text-3xl leading-none" aria-hidden="true">??</span>',
  '<img src="/logo.png" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />'
);

// Left Panel bottom close
fnContent = fnContent.replace(
  '          <div className="absolute top-0 right-0 w-24 h-24 bg-[#E9E2D3] rounded-bl-[100px] opacity-50 pointer-events-none" aria-hidden="true" />\r\n        </section>',
  '          </div>\r\n          <div className="absolute top-0 right-0 w-24 h-24 bg-[#E9E2D3] rounded-bl-[100px] opacity-50 pointer-events-none" aria-hidden="true" />\r\n        </section>'
);
fnContent = fnContent.replace(
  '          <div className="absolute top-0 right-0 w-24 h-24 bg-[#E9E2D3] rounded-bl-[100px] opacity-50 pointer-events-none" aria-hidden="true" />\n        </section>',
  '          </div>\n          <div className="absolute top-0 right-0 w-24 h-24 bg-[#E9E2D3] rounded-bl-[100px] opacity-50 pointer-events-none" aria-hidden="true" />\n        </section>'
);

// Right Panel inner flex centering
fnContent = fnContent.replace(
  '<section className="relative bg-white flex flex-col px-6 py-6 sm:px-8 sm:py-8 lg:px-14 lg:py-10">',
  '<section className="relative bg-white flex flex-col items-center h-full">\n          <div className="w-full max-w-[500px] h-full flex flex-col justify-between px-6 py-4 sm:px-8 sm:py-6 lg:px-14 lg:py-6">'
);

// Right Panel bottom close
fnContent = fnContent.replace(
  '            <p className="text-xs text-[#1C1716]/50 mt-auto pt-5">Secure College SSO &middot; VTU &middot; Karnataka</p>\r\n        </section>',
  '            <p className="text-xs text-[#1C1716]/50 mt-auto pt-3">Secure College SSO &middot; VTU &middot; Karnataka</p>\r\n          </div>\r\n        </section>'
);
fnContent = fnContent.replace(
  '            <p className="text-xs text-[#1C1716]/50 mt-auto pt-5">Secure College SSO &middot; VTU &middot; Karnataka</p>\n        </section>',
  '            <p className="text-xs text-[#1C1716]/50 mt-auto pt-3">Secure College SSO &middot; VTU &middot; Karnataka</p>\n          </div>\n        </section>'
);

// Shrink margins/paddings for tight fit:
// Illustration container
fnContent = fnContent.replace(
  'flex-1 flex items-center justify-center py-4 md:py-6 min-h-[160px]',
  'flex-1 flex items-center justify-center min-h-0 py-2 sm:py-4'
);
fnContent = fnContent.replace(
  'max-w-[200px] sm:max-w-[240px] lg:max-w-[280px]',
  'max-w-[160px] sm:max-w-[180px] lg:max-w-[220px] max-h-full object-contain'
);
// Tagline
fnContent = fnContent.replace('mb-5 sm:mb-6', 'mb-3 sm:mb-4');
fnContent = fnContent.replace('text-2xl sm:text-3xl', 'text-xl sm:text-2xl');
// Feature Cards themselves:
fnContent = fnContent.replaceAll('p-3 sm:p-4', 'p-2 sm:p-3');
fnContent = fnContent.replaceAll('mb-2 sm:mb-2.5', 'mb-1 sm:mb-2');
fnContent = fnContent.replaceAll('w-10 h-10 sm:w-12 sm:h-12', 'w-8 h-8 sm:w-10 sm:h-10');
// Title
fnContent = fnContent.replace('text-4xl sm:text-5xl lg:text-[56px]', 'text-3xl sm:text-4xl lg:text-[42px]');
fnContent = fnContent.replace('mt-4 sm:mt-5', 'mt-2 sm:mt-3');
fnContent = fnContent.replace('mt-2 text-[#78716C]', 'mt-1 text-[#78716C] text-sm sm:text-base');
// Form
fnContent = fnContent.replace('mt-6 space-y-4 flex-1', 'mt-4 space-y-3 sm:space-y-4 flex-1 flex flex-col justify-center');
fnContent = fnContent.replaceAll('px-4 py-2.5', 'px-3 py-2 sm:px-4 sm:py-2.5');
fnContent = fnContent.replaceAll('mb-1.5', 'mb-1 text-xs sm:text-sm');
fnContent = fnContent.replace('py-3 flex', 'py-2 sm:py-2.5 flex'); 
fnContent = fnContent.replace('mt-4', 'mt-2'); 
fnContent = fnContent.replace('pt-5', 'pt-3'); 
fnContent = fnContent.replace('mt-auto', 'mt-auto pt-3');

content = content.substring(0, startIdx) + fnContent + content.substring(nextFnIdx);
fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('Simple layout applied');
