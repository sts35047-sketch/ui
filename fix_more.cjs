const fs = require('fs');
let mob = fs.readFileSync('src/StudentMobileApp.jsx', 'utf8');

mob = mob.replace(/>\?</g, '>★<');
mob = mob.replace(/<span>★<\/span>Suggestion Box/g, '<span>📫</span>Suggestion Box');
mob = mob.replace(/<button className="icon-btn">★<\/button>/g, '<button className="icon-btn">⋮</button>');

fs.writeFileSync('src/StudentMobileApp.jsx', mob);
console.log('Fixed more emojis');
