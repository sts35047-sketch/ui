const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// For StudentLoginFlow
content = content.replace(
  '<div className="bg-white h-[calc(100dvh-64px)] w-full flex flex-col-reverse md:grid md:grid-cols-2 font-sans selection:bg-[#EE930D]/20 overflow-hidden">',
  '<div className="bg-white h-[calc(100dvh-64px)] w-full flex flex-col-reverse md:grid md:grid-cols-2 font-sans selection:bg-[#EE930D]/20 overflow-hidden" style={{ zoom: 0.67 }}>'
);

// For CollegeLoginFlow
content = content.replace(
  '<div className="bg-white min-h-[calc(100dvh-64px)] w-full flex flex-col-reverse md:grid md:grid-cols-2 font-sans selection:bg-[#EE930D]/20">',
  '<div className="bg-white min-h-[calc(100dvh-64px)] w-full flex flex-col-reverse md:grid md:grid-cols-2 font-sans selection:bg-[#EE930D]/20" style={{ zoom: 0.95 }}>'
);

// For HodFacultyLoginFlow
content = content.replace(
  '<div className="bg-white min-h-[calc(100dvh-64px)] flex flex-col-reverse md:grid md:grid-cols-2 font-sans selection:bg-[#EE930D]/20">',
  '<div className="bg-white min-h-[calc(100dvh-64px)] flex flex-col-reverse md:grid md:grid-cols-2 font-sans selection:bg-[#EE930D]/20" style={{ zoom: 0.95 }}>'
);

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Zoom applied");
