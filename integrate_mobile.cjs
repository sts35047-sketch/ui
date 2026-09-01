const fs = require('fs');
let txt = fs.readFileSync('src/App.tsx', 'utf8');

// Add import if not present
if (!txt.includes('import StudentMobileApp')) {
    txt = txt.replace('import React', 'import StudentMobileApp from "./StudentMobileApp";\nimport React');
}

// Wrap Flow4 start
const startPattern = `  return (\r\n    <div className="min-h-screen bg-[#F5F1E8] font-sans selection:bg-[#D97706]/20 flex flex-col pb-4">`;
const startReplace = `  return (\r\n    <>\r\n    <div className="hidden md:flex flex-col min-h-screen bg-[#F5F1E8] font-sans selection:bg-[#D97706]/20 pb-4">`;

if (txt.includes(startPattern)) {
    txt = txt.replace(startPattern, startReplace);
} else {
    // try fallback with unix newlines
    const startPatternLF = `  return (\n    <div className="min-h-screen bg-[#F5F1E8] font-sans selection:bg-[#D97706]/20 flex flex-col pb-4">`;
    const startReplaceLF = `  return (\n    <>\n    <div className="hidden md:flex flex-col min-h-screen bg-[#F5F1E8] font-sans selection:bg-[#D97706]/20 pb-4">`;
    txt = txt.replace(startPatternLF, startReplaceLF);
}

// Wrap Flow4 end - Only match 4 closing divs this time
const endPattern = `        </div>\r\n      </div>\r\n    </div>\r\n    </div>\r\n  );\r\n}\r\n\r\nfunction Flow5`;
const endReplace = `        </div>\r\n      </div>\r\n    </div>\r\n    </div>\r\n    <div className="block md:hidden">\r\n      <StudentMobileApp setActive={setActive} />\r\n    </div>\r\n    </>\r\n  );\r\n}\r\n\r\nfunction Flow5`;

if (txt.includes(endPattern)) {
    txt = txt.replace(endPattern, endReplace);
} else {
    // try fallback with unix newlines
    const endPatternLF = `        </div>\n      </div>\n    </div>\n    </div>\n  );\n}\n\nfunction Flow5`;
    const endReplaceLF = `        </div>\n      </div>\n    </div>\n    </div>\n    <div className="block md:hidden">\n      <StudentMobileApp setActive={setActive} />\n    </div>\n    </>\n  );\n}\n\nfunction Flow5`;
    txt = txt.replace(endPatternLF, endReplaceLF);
}

fs.writeFileSync('src/App.tsx', txt);
console.log('Mobile UI integrated successfully.');
