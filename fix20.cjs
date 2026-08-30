const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// CollegeLoginFlow left panel content wrapper
content = content.replace(
  '<div className="hidden md:flex flex-col items-center justify-center bg-[#F2E8DB] relative p-8">',
  '<div className="hidden md:flex flex-col items-center justify-center bg-[#F2E8DB] relative p-8">\n        <div style={{ zoom: 0.95 }} className="flex flex-col items-center justify-center w-full h-full">'
);
content = content.replace(
  '</div>\n      {/* Right Side (Form) */}',
  '</div>\n        </div>\n      {/* Right Side (Form) */}'
);

// CollegeLoginFlow right panel content wrapper
content = content.replace(
  '<div className="flex flex-col px-6 lg:px-16 py-12 justify-center h-full relative overflow-y-auto">',
  '<div className="flex flex-col justify-center h-full relative overflow-y-auto bg-white">\n        <div style={{ zoom: 0.95 }} className="flex flex-col px-6 lg:px-16 py-12 w-full max-w-[600px] mx-auto">'
);
// Match the end of CollegeLoginFlow right panel
content = content.replace(
  '</div>\n    </div>\n  );\n}\n\nfunction HodFacultyLoginFlow',
  '</div>\n        </div>\n    </div>\n  );\n}\n\nfunction HodFacultyLoginFlow'
);

// HodFacultyLoginFlow left panel content wrapper
content = content.replace(
  '<div className="hidden md:flex flex-col items-center justify-center bg-[#F2E8DB] relative p-8">',
  '<div className="hidden md:flex flex-col items-center justify-center bg-[#F2E8DB] relative p-8">\n        <div style={{ zoom: 0.95 }} className="flex flex-col items-center justify-center w-full h-full">'
);
content = content.replace(
  '</div>\n      {/* Right Side (Form) */}',
  '</div>\n        </div>\n      {/* Right Side (Form) */}'
);

// HodFacultyLoginFlow right panel content wrapper
content = content.replace(
  '<div className="flex flex-col px-6 lg:px-16 py-12 justify-center h-full relative overflow-y-auto">',
  '<div className="flex flex-col justify-center h-full relative overflow-y-auto bg-white">\n        <div style={{ zoom: 0.95 }} className="flex flex-col px-6 lg:px-16 py-12 w-full max-w-[600px] mx-auto">'
);
content = content.replace(
  '</div>\n    </div>\n  );\n}\n\nfunction StudentLoginFlow',
  '</div>\n        </div>\n    </div>\n  );\n}\n\nfunction StudentLoginFlow'
);


fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Zoom applied to other login pages");
