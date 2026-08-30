const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

if (!content.includes('import { Users, GraduationCap, BarChart2, Link2, LineChart, Star, ShieldCheck }')) {
  content = "import { Users, GraduationCap, BarChart2, Link2, LineChart, Star, ShieldCheck } from 'lucide-react';\n" + content;
  fs.writeFileSync('src/App.tsx', content, 'utf8');
}
console.log("Added import");
