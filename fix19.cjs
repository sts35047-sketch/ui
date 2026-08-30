const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Revert the previous zoom on the wrapper
content = content.replace(
  '<div className="bg-white h-[calc(100dvh-64px)] w-full flex flex-col-reverse md:grid md:grid-cols-2 font-sans selection:bg-[#EE930D]/20 overflow-hidden" style={{ zoom: 0.67 }}>',
  '<div className="bg-white h-[calc(100dvh-64px)] w-full flex flex-col-reverse md:grid md:grid-cols-2 font-sans selection:bg-[#EE930D]/20 overflow-hidden">'
);
content = content.replace(
  '<div className="bg-white min-h-[calc(100dvh-64px)] w-full flex flex-col-reverse md:grid md:grid-cols-2 font-sans selection:bg-[#EE930D]/20" style={{ zoom: 0.95 }}>',
  '<div className="bg-white min-h-[calc(100dvh-64px)] w-full flex flex-col-reverse md:grid md:grid-cols-2 font-sans selection:bg-[#EE930D]/20">'
);
content = content.replace(
  '<div className="bg-white min-h-[calc(100dvh-64px)] flex flex-col-reverse md:grid md:grid-cols-2 font-sans selection:bg-[#EE930D]/20" style={{ zoom: 0.95 }}>',
  '<div className="bg-white min-h-[calc(100dvh-64px)] flex flex-col-reverse md:grid md:grid-cols-2 font-sans selection:bg-[#EE930D]/20">'
);

// Instead, apply zoom to the content containers inside

// StudentLoginFlow left panel content wrapper
content = content.replace(
  '<div className="hidden md:flex flex-col items-center justify-center bg-[#F2E8DB] relative p-4 lg:p-8">',
  '<div className="hidden md:flex flex-col items-center justify-center bg-[#F2E8DB] relative p-4 lg:p-8">\n          <div style={{ zoom: 0.67 }} className="flex flex-col items-center justify-center w-full h-full">'
);
content = content.replace(
  '</div>\n      </div>\n      {/* Right Side (Form) */}',
  '</div>\n          </div>\n      </div>\n      {/* Right Side (Form) */}'
);

// StudentLoginFlow right panel content wrapper
content = content.replace(
  '<div className="flex flex-col px-4 sm:px-6 lg:px-12 py-8 lg:py-12 justify-center h-full relative overflow-y-auto">',
  '<div className="flex flex-col justify-center h-full relative overflow-y-auto bg-white">\n          <div style={{ zoom: 0.67 }} className="flex flex-col px-4 sm:px-6 lg:px-12 py-8 lg:py-12 w-full max-w-[600px] mx-auto">'
);
// Match the end of the right panel
content = content.replace(
  '</div>\n    </div>\n  );\n}\n\nfunction Flow4',
  '</div>\n          </div>\n    </div>\n  );\n}\n\nfunction Flow4'
);

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Zoom applied to inner wrappers");
