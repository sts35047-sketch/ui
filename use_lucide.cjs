const fs = require('fs');

// 1. App.tsx
let appTsx = fs.readFileSync('src/App.tsx', 'utf8');

// Update lucide-react import
const importLucide = "import { Users, GraduationCap, BarChart2, Link2, LineChart, Star, ShieldCheck, Mail, Lock, Home, CheckCircle2, FileText, User, MessageSquare, Menu, MoreVertical, Target, ChevronRight, ChevronDown, Check, Circle, AlertCircle, Info, ArrowLeft, ArrowRight, Bell, Settings, LogOut, ChevronLeft } from 'lucide-react';";
appTsx = appTsx.replace(/import \{.*?\} from 'lucide-react';/, importLucide);

// Replace unicode icons with Lucide components
// Sidebar
appTsx = appTsx.replace(/<span className="text-\[14px\]">⌂<\/span>/g, '<Home size={16} />');
appTsx = appTsx.replace(/<span className="text-\[14px\]">◉<\/span>/g, '<CheckCircle2 size={16} />');
appTsx = appTsx.replace(/<span className="text-\[14px\]">▣<\/span>/g, '<FileText size={16} />');
appTsx = appTsx.replace(/<span className="text-\[14px\]">👤<\/span>/g, '<User size={16} />');
appTsx = appTsx.replace(/<span className="text-\[14px\]">💬<\/span>/g, '<MessageSquare size={16} />');
appTsx = appTsx.replace(/<span className="text-\[14px\]">📫<\/span>/g, '<Mail size={16} />');

// Top nav Dashboard view
appTsx = appTsx.replace(/<span className="text-\[14px\]">⌕<\/span>/g, '<Target size={14} />');
appTsx = appTsx.replace(/<span className="text-\[14px\]">⌘K<\/span>/g, '<span className="text-[12px] opacity-70">⌘K</span>');

// "Welcome back" card icon
appTsx = appTsx.replace(/<span className="text-\[18px\]">👋<\/span>/g, ''); 
// Just remove waving hand if it breaks, or let it be. Emojis usually work. 
// "all icons r not working" implies the ones I just created as unicode shapes.

// Quick action buttons
appTsx = appTsx.replace(/<span className="w-8 h-8 rounded-full bg-\[\#F5F5F0\] flex items-center justify-center">◧<\/span>/g, '<span className="w-8 h-8 rounded-full bg-[#F5F5F0] flex items-center justify-center"><CheckCircle2 size={16} className="text-[#1C1917]" /></span>');

fs.writeFileSync('src/App.tsx', appTsx);

// 2. StudentMobileApp.jsx
let mob = fs.readFileSync('src/StudentMobileApp.jsx', 'utf8');

// Add lucide-react import
if (!mob.includes('lucide-react')) {
    mob = mob.replace('import React', 'import { Home, CheckCircle2, FileText, Menu, ArrowLeft, MoreVertical, User, MessageSquare, Mail, Target, BarChart2 } from "lucide-react";\nimport React');
}

// Replace items array icons
mob = mob.replace(/\["home", "Home", "⌂"\]/, '["home", "Home", <Home size={20} />]');
mob = mob.replace(/\["attendance", "Attendance", "◉"\]/, '["attendance", "Attendance", <CheckCircle2 size={20} />]');
mob = mob.replace(/\["marks", "CIE Marks", "▣"\]/, '["marks", "CIE Marks", <FileText size={20} />]');
mob = mob.replace(/\["menu", "Menu", "☰"\]/, '["menu", "Menu", <Menu size={20} />]');

// Quick access grid icons
mob = mob.replace(/<span>🎯<\/span>Attendance/g, '<Target size={24} className="mb-2 text-[#57534E]" />Attendance');
mob = mob.replace(/<span>📊<\/span>CIE Marks/g, '<BarChart2 size={24} className="mb-2 text-[#57534E]" />CIE Marks');
mob = mob.replace(/<span>💬<\/span>Feedback/g, '<MessageSquare size={24} className="mb-2 text-[#57534E]" />Feedback');
mob = mob.replace(/<span>👤<\/span>Profile/g, '<User size={24} className="mb-2 text-[#57534E]" />Profile');

// Menu list
mob = mob.replace(/<span>⌂<\/span>Dashboard/g, '<Home size={18} />Dashboard');
mob = mob.replace(/<span>◉<\/span>Academic Attendance/g, '<CheckCircle2 size={18} />Academic Attendance');
mob = mob.replace(/<span>▣<\/span>CIE Marks/g, '<FileText size={18} />CIE Marks');
mob = mob.replace(/<span>💬<\/span>Subject Feedback/g, '<MessageSquare size={18} />Subject Feedback');
mob = mob.replace(/<span>📫<\/span>Suggestion Box/g, '<Mail size={18} />Suggestion Box');

// Header
mob = mob.replace(/<button className="icon-btn" onClick={onBack} aria-label="Back"><<\/button>/g, '<button className="icon-btn" onClick={onBack} aria-label="Back"><ArrowLeft size={20} /></button>');
mob = mob.replace(/<button className="icon-btn">⋮<\/button>/g, '<button className="icon-btn"><MoreVertical size={20} /></button>');

fs.writeFileSync('src/StudentMobileApp.jsx', mob);

console.log('Replaced symbols with Lucide icons');
