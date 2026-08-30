const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = content.indexOf('function StudentLoginFlow({ setActive }');
const nextFnIdx = content.indexOf('function Flow4', startIdx);
let fnContent = content.substring(startIdx, nextFnIdx);

// Outer wrapper
fnContent = fnContent.replace(
  'min-h-[calc(100vh-80px)] flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8',
  'h-[calc(100dvh-64px)] w-full flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-6'
);

// Main card height
fnContent = fnContent.replace(
  'w-full max-w-[1400px] bg-white rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_40px_100px_-30px_rgba(28,23,22,0.35)] flex flex-col-reverse md:grid md:grid-cols-2',
  'w-full max-w-[1400px] h-full bg-white rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_40px_100px_-30px_rgba(28,23,22,0.35)] flex flex-col-reverse md:grid md:grid-cols-2'
);

// Left Panel
fnContent = fnContent.replace(
  'px-6 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10',
  'px-6 py-4 sm:px-8 sm:py-6 lg:px-10 lg:py-6 h-full justify-between'
);

// Illustration container
fnContent = fnContent.replace(
  'py-4 md:py-6 min-h-[160px]',
  'flex-1 flex items-center justify-center min-h-0 py-2 sm:py-4'
);

// Illustration size
fnContent = fnContent.replace(
  'max-w-[200px] sm:max-w-[240px] lg:max-w-[280px]',
  'max-w-[160px] sm:max-w-[180px] lg:max-w-[220px] max-h-full object-contain'
);

// Tagline
fnContent = fnContent.replace('mb-5 sm:mb-6', 'mb-3 sm:mb-4');
fnContent = fnContent.replace('text-2xl sm:text-3xl', 'text-xl sm:text-2xl');

// Feature Cards Container
// Need to find the div wrapping the feature cards to give it tighter gap if any.
// Feature Cards themselves:
fnContent = fnContent.replaceAll('p-3 sm:p-4', 'p-2 sm:p-3');
fnContent = fnContent.replaceAll('mb-2 sm:mb-2.5', 'mb-1 sm:mb-2');
fnContent = fnContent.replaceAll('w-10 h-10 sm:w-12 sm:h-12', 'w-8 h-8 sm:w-10 sm:h-10');

// Right Panel
fnContent = fnContent.replace(
  'px-6 py-6 sm:px-8 sm:py-8 lg:px-14 lg:py-10',
  'px-6 py-4 sm:px-8 sm:py-6 lg:px-12 lg:py-6 h-full flex flex-col'
);

// Title
fnContent = fnContent.replace(
  'text-4xl sm:text-5xl lg:text-[56px]',
  'text-3xl sm:text-4xl lg:text-[42px]'
);
fnContent = fnContent.replace('mt-4 sm:mt-5', 'mt-2 sm:mt-3');
fnContent = fnContent.replace('mt-2 text-[#78716C]', 'mt-1 text-[#78716C] text-sm sm:text-base');

// Form
fnContent = fnContent.replace(
  'mt-6 space-y-4 flex-1',
  'mt-4 space-y-3 sm:space-y-4 flex-1 flex flex-col justify-center'
);

// Input padding
fnContent = fnContent.replaceAll('px-4 py-2.5', 'px-3 py-2 sm:px-4 sm:py-2.5');

// Labels
fnContent = fnContent.replaceAll('mb-1.5', 'mb-1 text-xs sm:text-sm');

// Form texts
fnContent = fnContent.replace('py-3 flex', 'py-2 sm:py-2.5 flex'); // submit button
fnContent = fnContent.replace('mt-4', 'mt-2'); // Need help
fnContent = fnContent.replace('pt-5', 'pt-3'); // Secured with 2FA
fnContent = fnContent.replace('mt-auto', 'mt-auto pt-3');

content = content.substring(0, startIdx) + fnContent + content.substring(nextFnIdx);
fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('Compacted successfully for exact fit');
