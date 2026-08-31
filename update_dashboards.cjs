const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const applyDarkAndAnim = (startToken, endToken) => {
    let startIdx = content.indexOf(startToken);
    let endIdx = content.indexOf(endToken, startIdx);
    if (startIdx === -1 || endIdx === -1) return;
    
    let block = content.substring(startIdx, endIdx);
    
    // Backgrounds
    block = block.replace(/bg-\[\#F5F1E8\]/g, 'bg-[#F5F1E8] dark:bg-[#09090b]');
    block = block.replace(/bg-\[\#F5F5F0\]/g, 'bg-[#F5F5F0] dark:bg-[#18181b]');
    block = block.replace(/bg-white/g, 'bg-white dark:bg-[#18181b]');
    
    // Text colors
    block = block.replace(/text-\[\#1C1917\]/g, 'text-[#1C1917] dark:text-[#F5F5F0]');
    block = block.replace(/text-\[\#78716C\]/g, 'text-[#78716C] dark:text-[#A8A29E]');
    block = block.replace(/text-\[\#57534E\]/g, 'text-[#57534E] dark:text-[#A8A29E]');
    
    // Borders
    block = block.replace(/border-\[\#E7E5E4\]/g, 'border-[#E7E5E4] dark:border-[#27272a]');
    block = block.replace(/border-transparent/g, 'border-transparent dark:border-[#27272a]');
    
    // Specific elements for dashboard cards
    block = block.replace(/rounded-\[16px\] p-6/g, 'rounded-[16px] p-6 animate-slide-up');
    block = block.replace(/rounded-\[20px\] border/g, 'rounded-[20px] border animate-slide-up');
    
    // SVG icons inside cards that are black
    block = block.replace(/text-\[\#1C1716\]/g, 'text-[#1C1716] dark:text-white');
    
    content = content.substring(0, startIdx) + block + content.substring(endIdx);
};

// Flow4 (Student Dashboard) -> ends at Flow5 (NoteHub)
applyDarkAndAnim('function Flow4', 'function CollegeAdminDashboard');

// CollegeAdminDashboard -> ends at end of file (or we can just replace to EOF)
applyDarkAndAnim('function CollegeAdminDashboard', 'export default function App');

// Remove any doubled dark classes just in case
content = content.replace(/dark:bg-\[\#18181b\] dark:bg-\[\#18181b\]/g, 'dark:bg-[#18181b]');
content = content.replace(/dark:border-\[\#27272a\] dark:border-\[\#27272a\]/g, 'dark:border-[#27272a]');

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Updated dashboards with dark mode and animations.");
