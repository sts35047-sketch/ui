const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Fix duplicate classes
content = content.replaceAll('flex-1 flex items-center justify-center flex-1 flex items-center justify-center min-h-0 py-2 sm:py-4', 'flex-1 flex items-center justify-center min-h-0 py-2 sm:py-4');

// Ensure left and right panels are correctly flex cols that stretch
// The right panel had: px-6 py-4 sm:px-8 sm:py-6 lg:px-12 lg:py-6 h-full flex flex-col
content = content.replace('px-6 py-4 sm:px-8 sm:py-6 lg:px-12 lg:py-6 h-full flex flex-col', 'px-6 py-4 sm:px-8 sm:py-6 lg:px-12 lg:py-6 h-full flex flex-col justify-between');

fs.writeFileSync('src/App.tsx', content, 'utf8');
