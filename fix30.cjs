const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Section paddings
content = content.replace('section className="relative bg-[#F2E8DB] flex flex-col px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12"', 
                          'section className="relative bg-[#F2E8DB] flex flex-col px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-8 short:lg:py-6 overflow-hidden"');

content = content.replace('section className="relative bg-white flex flex-col px-6 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-12"',
                          'section className="relative bg-white flex flex-col px-6 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-8 short:lg:py-6 min-h-0"');

// Illustration block
content = content.replace('className="flex-1 flex items-center justify-center py-6 md:py-8 min-h-[220px]"',
                          'className="flex-1 flex items-center justify-center py-4 md:py-6 min-h-[160px] short:min-h-[120px]"');
content = content.replace('className="w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[330px] h-auto"',
                          'className="w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[280px] short:lg:max-w-[220px] h-auto"');

// Form min-h-0 and spacing
content = content.replace('className="mt-8 space-y-5 flex-1"',
                          'className="mt-6 short:mt-4 space-y-4 short:space-y-3 flex-1 min-h-0 overflow-y-auto pr-2"');

// Tagline
content = content.replace('className="text-gray-500 text-base sm:text-lg leading-relaxed mt-2 max-w-md"',
                          'className="text-gray-500 text-sm sm:text-base leading-relaxed mt-2 short:mt-1 max-w-md mb-4 short:mb-2"');

// H1 size
content = content.replace('className="serif text-5xl sm:text-6xl lg:text-[64px] text-[#1C1716] leading-[1.05] mt-6 sm:mt-8"',
                          'className="serif text-4xl sm:text-5xl lg:text-5xl short:text-4xl text-[#1C1716] leading-[1.05] mt-4 sm:mt-6"');

// Feature items bottom (secure college sso, etc)
// They use space-y-3, we can change to space-y-2
content = content.replace('className="mt-6 sm:mt-8 space-y-3 relative z-10"',
                          'className="mt-4 short:mt-2 space-y-2 relative z-10"');

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Changes applied to StudentLoginFlow");
