const fs = require('fs');
let txt = fs.readFileSync('src/App.tsx', 'utf8');

const target = `              <span>EPCET</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div className="flex items-center gap-4">`;
const replace = `              <span>EPCET</span>\r\n            </div>\r\n          </div>\r\n          <button onClick={() => setActive(0)} className="ml-4 px-3 py-1.5 rounded-full text-[12px] font-medium text-[#57534E] bg-white/50 hover:bg-white transition-colors border border-[#E7E5E4] dark:border-[#27272a] flex items-center gap-1 shadow-sm">\r\n            <span>&lt;</span> BACK\r\n          </button>\r\n        </div>\r\n        <div className="flex items-center gap-4">`;

if (txt.includes(target)) {
    txt = txt.replace(target, replace);
    fs.writeFileSync('src/App.tsx', txt);
    console.log("Replaced successfully!");
} else {
    console.log("Could not find target string.");
}
