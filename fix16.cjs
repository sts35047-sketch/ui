const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  '<main className={active === 6 || active === 5 ? "" : "max-w-[1200px] mx-auto"}>',
  '<main className={active === 6 || active === 5 || active === 3 ? "" : "max-w-[1200px] mx-auto"}>'
);

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Max width removed for Student Login");
