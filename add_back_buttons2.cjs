const fs = require('fs');
let txt = fs.readFileSync('src/App.tsx', 'utf8');

// For Flow4, let's find the exact block and replace
let flow4Header = txt.indexOf('function Flow4({');
if (flow4Header !== -1) {
    let topNavStart = txt.indexOf('{/* Top Navbar */}', flow4Header);
    let logoEnd = txt.indexOf('<span>EPCET</span>', topNavStart);
    let closingDivs = txt.indexOf('</div>', logoEnd);
    closingDivs = txt.indexOf('</div>', closingDivs + 1);
    closingDivs = txt.indexOf('</div>', closingDivs + 1); // 3 divs
    
    // We want to insert the back button before the 3rd closing div
    if (closingDivs !== -1) {
        let before = txt.substring(0, closingDivs);
        let after = txt.substring(closingDivs);
        
        let backButtonHTML = `\n          </div>\n          <button onClick={() => setActive(0)} className="ml-4 px-3 py-1.5 rounded-full text-[12px] font-medium text-[#57534E] bg-white/50 hover:bg-white transition-colors border border-[#E7E5E4] dark:border-[#27272a] flex items-center gap-1 shadow-sm"><span>&lt;</span> BACK</button>\n        `;
        
        // Let's use a simple string replace for EPCET section
        let toReplace = `<span>EPCET</span>\n            </div>\n          </div>\n        </div>`;
        if (txt.includes(toReplace)) {
            txt = txt.replace(toReplace, `<span>EPCET</span>\n            </div>\n          </div>\n          <button onClick={() => setActive(0)} className="ml-4 px-3 py-1.5 rounded-full text-[12px] font-medium text-[#57534E] bg-white/50 hover:bg-white transition-colors border border-[#E7E5E4] dark:border-[#27272a] flex items-center gap-1 shadow-sm"><span>&lt;</span> BACK</button>\n        </div>`);
        }
    }
}

// Ensure CollegeAdminDashboard BACK goes to 0
txt = txt.replace(/onClick=\{\(\) => setActive\(1\)\} \n\s*className="ml-4 px-3 py-1.5 rounded-full text-\[12px\] font-medium text-\[#57534E\] bg-white\/50 hover:bg-white transition-colors border border-\[#E7E5E4\] dark:border-\[#27272a\] flex items-center gap-1 shadow-sm"\n\s*>\n\s*<span>&lt;<\/span> BACK/g, 'onClick={() => setActive(0)} className="ml-4 px-3 py-1.5 rounded-full text-[12px] font-medium text-[#57534E] bg-white/50 hover:bg-white transition-colors border border-[#E7E5E4] dark:border-[#27272a] flex items-center gap-1 shadow-sm"><span>&lt;</span> BACK');

// Also update StudentLoginFlow
txt = txt.replace(/&lt; Back to Roles/g, '&lt; BACK');

fs.writeFileSync('src/App.tsx', txt);
