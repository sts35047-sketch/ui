const fs = require('fs');

let mob = fs.readFileSync('src/StudentMobileApp.jsx', 'utf8');

mob = mob.replace(/<span>\?\?<\/span>Attendance/g, '<Target size={24} className="mb-2 text-[#57534E]" />Attendance');
mob = mob.replace(/<span>\?\?<\/span>CIE Marks/g, '<BarChart2 size={24} className="mb-2 text-[#57534E]" />CIE Marks');
mob = mob.replace(/<span>\?\?<\/span>Feedback/g, '<MessageSquare size={24} className="mb-2 text-[#57534E]" />Feedback');
mob = mob.replace(/<span>\?\?<\/span>Profile/g, '<User size={24} className="mb-2 text-[#57534E]" />Profile');
mob = mob.replace(/<span>★<\/span>Attendance/g, '<Target size={24} className="mb-2 text-[#57534E]" />Attendance');
mob = mob.replace(/<span>★<\/span>CIE Marks/g, '<BarChart2 size={24} className="mb-2 text-[#57534E]" />CIE Marks');
mob = mob.replace(/<span>★<\/span>Feedback/g, '<MessageSquare size={24} className="mb-2 text-[#57534E]" />Feedback');
mob = mob.replace(/<span>★<\/span>Profile/g, '<User size={24} className="mb-2 text-[#57534E]" />Profile');

fs.writeFileSync('src/StudentMobileApp.jsx', mob);
console.log('Fixed quick grid');
