const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Fix Top Navbar Tabs for mobile
content = content.replace(
  '<div className="hidden md:flex items-center gap-1 bg-white/70 backdrop-blur-md border border-[#E7E5E4] rounded-full p-1.5 shadow-sm">',
  '<div className="flex overflow-x-auto no-scrollbar items-center gap-1 bg-white/70 backdrop-blur-md border border-[#E7E5E4] rounded-full p-1 sm:p-1.5 shadow-sm max-w-[50vw] sm:max-w-none mx-2 sm:mx-0">'
);

// 2. Hide "EduFeedback Pro" text on small mobile screens to save space
content = content.replace(
  '<div className="serif text-[16px] font-bold text-[#1C1917] leading-tight">EduFeedback Pro</div>',
  '<div className="serif text-[16px] font-bold text-[#1C1917] leading-tight hidden sm:block">EduFeedback Pro</div>'
);
content = content.replace(
  '<div className="text-[9px] font-bold text-[#A8A29E] tracking-widest flex items-center gap-1.5 mt-0.5 uppercase">',
  '<div className="text-[9px] font-bold text-[#A8A29E] tracking-widest hidden sm:flex items-center gap-1.5 mt-0.5 uppercase">'
);

// 3. Make the main content area responsive width and padding
content = content.replace(
  '<div className="flex-1 w-full max-w-[1100px] mx-auto px-6 py-12 flex flex-col gap-8">',
  '<div className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-12 flex flex-col gap-6 sm:gap-8">'
);

// 4. Reduce title sizes on mobile
content = content.replace(
  '<h1 className="serif text-[40px] text-[#1C1917] leading-tight mb-3 flex items-center gap-3">',
  '<h1 className="serif text-[32px] sm:text-[40px] text-[#1C1917] leading-tight mb-3 flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3">'
);

// 5. Fix bento grid padding and gaps for mobile
content = content.replace(
  '<div className="md:col-span-2 bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-[24px] p-8 shadow-sm flex flex-col sm:flex-row gap-8 hover:-translate-y-0.5 transition-transform duration-300">',
  '<div className="lg:col-span-2 bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row gap-6 sm:gap-8 hover:-translate-y-0.5 transition-transform duration-300">'
);
content = content.replace(
  '<div className="w-32 h-32 rounded-[16px] bg-[#FAFAFA] border border-[#F5F5F0] flex flex-col items-center justify-center shrink-0">',
  '<div className="w-full sm:w-32 h-32 rounded-[16px] bg-[#FAFAFA] border border-[#F5F5F0] flex flex-col items-center justify-center shrink-0">'
);

// 6. Fix Global Filters grid
content = content.replace(
  '<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">',
  '<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 sm:gap-y-6">'
);
content = content.replace(
  '<div className="bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-[24px] p-8 shadow-sm">',
  '<div className="bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 shadow-sm">'
);

// 7. Fix Overview Titles
content = content.replace(
  '<h1 className="serif text-[40px] text-[#1C1917] leading-tight mb-2 flex flex-col">',
  '<h1 className="serif text-[32px] sm:text-[40px] text-[#1C1917] leading-tight mb-2 flex flex-col">'
);
// Fix overview cards padding
content = content.replace(/rounded-\[24px\] p-8/g, "rounded-[20px] sm:rounded-[24px] p-5 sm:p-8");

// 8. Fix gridcols for large cards from md: to lg: if needed (actually grid-cols-1 sm:grid-cols-2 lg:grid-cols-3)
content = content.replace(
  '<div className="grid grid-cols-1 md:grid-cols-3 gap-6">',
  '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">'
);

// 9. Fix Leaderboard table overflow
content = content.replace(
  '<div className="bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-[24px] p-2 sm:p-8 shadow-sm overflow-x-auto">',
  '<div className="bg-white/90 backdrop-blur-sm border border-[#E7E5E4] rounded-[20px] sm:rounded-[24px] p-1 sm:p-8 shadow-sm overflow-x-auto">'
);

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Applied responsive fixes");
