const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr1 = '<div className="bg-[#E9E2D3] min-h-[calc(100vh-80px)] flex items-center justify-center p-3 sm:p-6 md:p-10 font-sans selection:bg-[#EE930D]/20">\n      <main className="w-full max-w-[1400px] bg-white rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_40px_100px_-30px_rgba(28,23,22,0.35)] grid grid-cols-1 md:grid-cols-2">';
const targetStr2 = '<div className="bg-[#E9E2D3] min-h-[calc(100vh-80px)] flex items-center justify-center p-3 sm:p-6 md:p-10 font-sans selection:bg-[#EE930D]/20">\r\n      <main className="w-full max-w-[1400px] bg-white rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_40px_100px_-30px_rgba(28,23,22,0.35)] grid grid-cols-1 md:grid-cols-2">';

const replacementStr = '<div className="grid grid-cols-1 lg:grid-cols-[40%_60%] border-x border-b border-[#E7E5E4] bg-white dark:bg-[#18181b] rounded-b-[16px] overflow-hidden mx-4 sm:mx-6 font-sans selection:bg-[#EE930D]/20">';

if (content.includes(targetStr1)) {
    content = content.replace(targetStr1, replacementStr);
    console.log("Replaced target1");
} else if (content.includes(targetStr2)) {
    content = content.replace(targetStr2, replacementStr);
    console.log("Replaced target2");
} else {
    console.log("Could not find start");
}

const endStr1 = '          </div>\n    </div>\n  );\n}\n\nfunction Flow4';
const endStr2 = '          </div>\r\n    </div>\r\n  );\r\n}\r\n\nfunction Flow4';
const endStr3 = '        </div>\n      </div>\n    </main>\n  </div>\n  );\n}\n\nfunction Flow4';
const endStr4 = '</main>\n    </div>\n  );\n}\n\nfunction Flow4';
const endStr5 = '</main>\r\n    </div>\r\n  );\r\n}\r\n\r\nfunction Flow4';

// Let's just find "function Flow4" and replace the preceding </main></div>.
content = content.replace(/<\/main>[\s\r\n]*<\/div>[\s\r\n]*\)\;[\s\r\n]*\}[\s\r\n]*function Flow4/, '</div>\n  );\n}\n\nfunction Flow4');


fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Done");
