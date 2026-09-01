const fs = require('fs');

let mob = fs.readFileSync('src/StudentMobileApp.jsx', 'utf8');

mob = mob.replace('import { Home, CheckCircle2, FileText, Menu, ArrowLeft, MoreVertical, User, MessageSquare, Mail, Target, BarChart2 } from "lucide-react";', 'import { Home as HomeIcon, CheckCircle2, FileText, Menu as MenuIcon, ArrowLeft, MoreVertical, User, MessageSquare, Mail, Target, BarChart2 } from "lucide-react";');

mob = mob.replace(/<Home size=/g, '<HomeIcon size=');
mob = mob.replace(/<Menu size=/g, '<MenuIcon size=');

fs.writeFileSync('src/StudentMobileApp.jsx', mob);
console.log('Fixed component name collision');
