const fs = require('fs');
let txt = fs.readFileSync('src/App.tsx', 'utf8');
txt = txt.replace(
  "import { Users, GraduationCap, BarChart2, Link2, LineChart, Star, ShieldCheck } from 'lucide-react';",
  "import { Users, GraduationCap, BarChart2, Link2, LineChart, Star, ShieldCheck, Mail, Lock } from 'lucide-react';"
);
fs.writeFileSync('src/App.tsx', txt);
