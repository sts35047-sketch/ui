const fs = require('fs');

// 1. App.tsx
let appTsx = fs.readFileSync('src/App.tsx', 'utf8');

// Update lucide-react import
const lucideImport = "import { Users, GraduationCap, BarChart2, Link2, LineChart, Star, ShieldCheck, Mail, Lock, Home, CheckCircle2, FileText, User, MessageSquare, Menu, MoreVertical, Target, ChevronRight, ChevronDown, Check, Circle, AlertCircle, Info, ArrowLeft, ArrowRight, Bell, Settings, LogOut, ChevronLeft, Search, Layers, Trophy, Medal, Box, AlertTriangle, Play, MousePointerClick } from 'lucide-react';";
appTsx = appTsx.replace(/import \{.*?\} from 'lucide-react';/, lucideImport);

// Search and replace literal unicode characters
appTsx = appTsx.replace(/←/g, '<ArrowLeft size={16} className="inline mr-1" />');
appTsx = appTsx.replace(/↗/g, '<ArrowRight size={14} className="inline ml-1 rotate-[-45deg]" />');
appTsx = appTsx.replace(/⌕/g, '<Search size={16} className="inline" />');
appTsx = appTsx.replace(/◧/g, '<Layers size={16} />');
appTsx = appTsx.replace(/◈/g, '<BarChart2 size={16} />');
appTsx = appTsx.replace(/◎/g, '<Target size={16} />');
appTsx = appTsx.replace(/⧉/g, '<FileText size={16} />');
appTsx = appTsx.replace(/ℹ/g, '<Info size={16} />');
appTsx = appTsx.replace(/⚠️/g, '<AlertTriangle size={16} />');
appTsx = appTsx.replace(/🛡️/g, '<ShieldCheck size={16} />');
appTsx = appTsx.replace(/🏆/g, '<Trophy size={16} />');
appTsx = appTsx.replace(/🥇/g, '<Medal size={16} />');
appTsx = appTsx.replace(/🥈/g, '<Medal size={16} className="opacity-80" />');
appTsx = appTsx.replace(/🥉/g, '<Medal size={16} className="opacity-60" />');
appTsx = appTsx.replace(/🧊/g, '<Box size={40} />');
appTsx = appTsx.replace(/📁/g, '<FileText size={16} className="inline mr-1" />');
appTsx = appTsx.replace(/🕒/g, '<Target size={16} className="inline mr-1" />'); // Using target as placeholder for clock
appTsx = appTsx.replace(/✉/g, '<Mail size={16} className="inline mr-1" />');

// 2. Fix the roles array icons to use Lucide components
const rolesRegex = /icon:"([^"]+)"/g;
appTsx = appTsx.replace(rolesRegex, (match, icon) => {
    if (icon === '🏛️') return 'icon:<Layers size={24} className="text-[#D97706]" />';
    if (icon === '👥') return 'icon:<Users size={24} className="text-[#DB2777]" />';
    if (icon === '🎓') return 'icon:<GraduationCap size={24} className="text-[#2563EB]" />';
    if (icon === '📝') return 'icon:<FileText size={24} className="text-[#059669]" />';
    return match;
});

// Since roles icon is now a JSX element, we need to make sure it's rendered as `{role.icon}` instead of just a string if it was rendered as a string somewhere.
appTsx = appTsx.replace(/<div className="text-\[40px\] leading-none mb-4 group-hover:scale-110 transition-transform origin-left">\{role\.icon\}<\/div>/, '<div className="text-[40px] leading-none mb-4 group-hover:scale-110 transition-transform origin-left flex items-center">{role.icon}</div>');
appTsx = appTsx.replace(/<div className="text-\[24px\] leading-none mr-3">\{r\.icon\}<\/div>/, '<div className="text-[24px] leading-none mr-3 flex items-center">{r.icon}</div>');

fs.writeFileSync('src/App.tsx', appTsx);

// 3. StudentMobileApp.jsx
let mob = fs.readFileSync('src/StudentMobileApp.jsx', 'utf8');

if (!mob.includes('lucide-react')) {
    mob = mob.replace('import React', 'import { Home, CheckCircle2, FileText, Menu, ArrowLeft, MoreVertical, User, MessageSquare, Mail, Target, BarChart2 } from "lucide-react";\nimport React');
}

// Ensure the item array icons are actual JSX components
mob = mob.replace(/\["home", "Home", "⌂"\]/, '["home", "Home", <Home size={20} />]');
mob = mob.replace(/\["attendance", "Attendance", "◉"\]/, '["attendance", "Attendance", <CheckCircle2 size={20} />]');
mob = mob.replace(/\["marks", "CIE Marks", "▣"\]/, '["marks", "CIE Marks", <FileText size={20} />]');
mob = mob.replace(/\["menu", "Menu", "☰"\]/, '["menu", "Menu", <Menu size={20} />]');

// The `Icon` component might need to just render children directly if they are JSX
mob = mob.replace(/<span className="mf-icon" aria-hidden="true">\{children\}<\/span>/, '<span className="mf-icon flex items-center justify-center" aria-hidden="true">{children}</span>');

fs.writeFileSync('src/StudentMobileApp.jsx', mob);

console.log('Fixed all unicode icons to use Lucide React');
