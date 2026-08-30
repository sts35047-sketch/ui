const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add Dark Mode Button to Header
// We find the "Help" button area and inject the dark mode toggle before it.
const helpRegex = /<span className="text-\[\#78716C\] hover:text-\[\#1C1917\] cursor-pointer">Help<\/span>/;
const darkToggleBtn = `
            <button onClick={() => setDarkMode(!darkMode)} className="text-[#78716C] hover:text-[#1C1917] dark:hover:text-white transition-colors flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" title="Toggle Dark Mode">
              {darkMode ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>
            <span className="text-[#78716C] hover:text-[#1C1917] dark:text-[#A8A29E] dark:hover:text-white cursor-pointer">Help</span>`;

content = content.replace(helpRegex, darkToggleBtn);

// Fix Navbar bg
content = content.replace(/bg-\[\#FCFCF9\]\/80 border-b border-\[\#E7E5E4\]/g, 'bg-[#FCFCF9]/80 dark:bg-[#09090b]/80 border-b border-[#E7E5E4] dark:border-[#27272a]');
content = content.replace(/bg-\[\#FCFCF9\] text-\[\#1C1917\] antialiased/g, 'bg-[#FCFCF9] dark:bg-[#09090b] text-[#1C1917] dark:text-[#F5F5F0] antialiased');

// Update StudentLoginFlow dark mode classes
// Only target the StudentLoginFlow function body
const startIdx = content.indexOf('function StudentLoginFlow');
const endIdx = content.indexOf('function Flow4', startIdx);
let flowText = content.substring(startIdx, endIdx);

flowText = flowText.replace(/bg-\[\#D1FAE5\]/g, 'bg-[#D1FAE5] dark:bg-[#064E3B]');
flowText = flowText.replace(/bg-white\/70 border border-white\/50/g, 'bg-white/70 dark:bg-black/20 border border-white/50 dark:border-white/10');
flowText = flowText.replace(/text-\[\#064E3B\] mb-4/g, 'text-[#064E3B] dark:text-[#A7F3D0] mb-4');
flowText = flowText.replace(/text-\[\#064E3B\]\/80/g, 'text-[#064E3B]/80 dark:text-[#A7F3D0]/80');
flowText = flowText.replace(/bg-white rounded-\[16px\]/g, 'bg-white dark:bg-[#18181b] rounded-[16px]');
flowText = flowText.replace(/text-\[\#1C1917\] mb-1/g, 'text-[#1C1917] dark:text-[#F5F5F0] mb-1');

flowText = flowText.replace(/bg-white h-full relative/g, 'bg-white dark:bg-[#09090b] h-full relative');
flowText = flowText.replace(/bg-\[\#F5F5F0\] text-\[\#1C1917\]/g, 'bg-[#F5F5F0] dark:bg-[#18181b] text-[#1C1917] dark:text-[#F5F5F0]');
flowText = flowText.replace(/text-\[\#1C1917\] leading-tight/g, 'text-[#1C1917] dark:text-[#F5F5F0] leading-tight');
flowText = flowText.replace(/font-semibold text-\[\#1C1917\]/g, 'font-semibold text-[#1C1917] dark:text-[#F5F5F0]');
flowText = flowText.replace(/bg-\[\#F5F5F0\] px-4 py-3\.5/g, 'bg-[#F5F5F0] dark:bg-[#18181b] px-4 py-3.5');
flowText = flowText.replace(/border-\[\#E7E5E4\]/g, 'border-[#E7E5E4] dark:border-[#27272a]');
flowText = flowText.replace(/text-\[\#1C1917\] text-\[15px\]/g, 'text-[#1C1917] dark:text-[#F5F5F0] text-[15px]');
flowText = flowText.replace(/bg-\[\#FEF3C7\]/g, 'bg-[#FEF3C7] dark:bg-[#78350F]/20');
flowText = flowText.replace(/border-\[\#FDE68A\]/g, 'border-[#FDE68A] dark:border-[#92400E]/30');
flowText = flowText.replace(/text-\[\#D97706\]/g, 'text-[#D97706] dark:text-[#FBBF24]');
flowText = flowText.replace(/text-\[\#92400E\] flex flex-col/g, 'text-[#92400E] dark:text-[#FDE68A] flex flex-col');
flowText = flowText.replace(/text-\[\#92400E\] underline/g, 'text-[#92400E] dark:text-[#FDE68A] underline');
flowText = flowText.replace(/bg-\[\#1C1917\] hover:bg-black text-white/g, 'bg-[#1C1917] hover:bg-black dark:bg-[#F5F5F0] dark:hover:bg-white dark:text-[#1C1917] text-white');

content = content.substring(0, startIdx) + flowText + content.substring(endIdx);

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Applied correctly.");
