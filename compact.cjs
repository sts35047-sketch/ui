const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = content.indexOf('function StudentLoginFlow({ setActive }: { setActive: (val: number) => void }) {');
const nextFnIdx = content.indexOf('function Flow4', startIdx);

let fnContent = content.substring(startIdx, nextFnIdx);

// Outer padding
fnContent = fnContent.replace('min-h-[calc(100vh-80px)] flex items-center justify-center p-3 sm:p-6 md:p-10', 'min-h-[calc(100vh-80px)] flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8');

// Container
fnContent = fnContent.replace('max-w-[1400px] bg-white rounded-[28px] sm:rounded-[36px]', 'max-w-[1400px] bg-white rounded-[24px] sm:rounded-[32px]');

// Left panel padding
fnContent = fnContent.replace('px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12', 'px-6 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10');

// Illustration padding and size
fnContent = fnContent.replace('py-6 md:py-8 min-h-[220px]', 'py-4 md:py-6 min-h-[160px]');
fnContent = fnContent.replace('max-w-[260px] sm:max-w-[300px] lg:max-w-[330px]', 'max-w-[200px] sm:max-w-[240px] lg:max-w-[280px]');

// Tagline margin
fnContent = fnContent.replace('mb-7 sm:mb-8', 'mb-5 sm:mb-6');
fnContent = fnContent.replace('text-3xl sm:text-4xl', 'text-2xl sm:text-3xl');

// Feature cards
fnContent = fnContent.replace('p-3.5 sm:p-5', 'p-3 sm:p-4');
fnContent = fnContent.replace('w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2.5 sm:mb-3', 'w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-2.5');

// Right panel padding
fnContent = fnContent.replace('px-6 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-12', 'px-6 py-6 sm:px-8 sm:py-8 lg:px-14 lg:py-10');

// Title margin and size
fnContent = fnContent.replace('text-5xl sm:text-6xl lg:text-[64px]', 'text-4xl sm:text-5xl lg:text-[56px]');
fnContent = fnContent.replace('mt-6 sm:mt-8', 'mt-4 sm:mt-5');

// Form margin and gap
fnContent = fnContent.replace('mt-8 space-y-5 flex-1', 'mt-6 space-y-4 flex-1');

// Input padding
fnContent = fnContent.replaceAll('px-4 py-3.5', 'px-4 py-2.5');

// Form texts
fnContent = fnContent.replaceAll('mb-2', 'mb-1.5');
fnContent = fnContent.replace('py-4 flex', 'py-3 flex'); // submit button
fnContent = fnContent.replace('mt-6', 'mt-4'); // Need help
fnContent = fnContent.replace('pt-8', 'pt-5'); // Secured with 2FA

content = content.substring(0, startIdx) + fnContent + content.substring(nextFnIdx);
fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Compacted StudentLoginFlow successfully");
