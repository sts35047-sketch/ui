const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Global navbar - Live
content = content.replace(
  '<span className="mono text-[10px] px-2 py-0.5 rounded-full bg-[#F5F5F0] border border-[#E7E5E4] text-[#78716C] hidden sm:inline-flex items-center gap-1">\r\n              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" /> Live\r\n            </span>',
  ''
);
content = content.replace(
  '<span className="mono text-[10px] px-2 py-0.5 rounded-full bg-[#F5F5F0] border border-[#E7E5E4] text-[#78716C] hidden sm:inline-flex items-center gap-1">\n              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" /> Live\n            </span>',
  ''
);

// Global navbar - Operational
content = content.replace(
  '<span className="inline-flex items-center gap-1.5 mono text-[11px]"><span className="w-2 h-2 rounded-full bg-[#059669]" /> Operational</span>',
  ''
);

// Flow4 Student Dashboard navbar - Live
content = content.replace(
  '<span className="mono text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#E7E5E4] text-[#78716C] hidden sm:inline-flex items-center gap-1 shadow-sm">\r\n            <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" /> Live\r\n          </span>',
  ''
);
content = content.replace(
  '<span className="mono text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#E7E5E4] text-[#78716C] hidden sm:inline-flex items-center gap-1 shadow-sm">\n            <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" /> Live\n          </span>',
  ''
);


fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Removed Live and Operational badges");
