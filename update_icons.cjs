const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add Lucide imports if not there
if (!content.includes('import { Users, GraduationCap, BarChart2, Link2, LineChart, Star, ShieldCheck }')) {
  // Find where react is imported
  const importMatch = content.match(/import React.*?from 'react';/);
  if (importMatch) {
    content = content.replace(
      importMatch[0],
      `${importMatch[0]}\nimport { Users, GraduationCap, BarChart2, Link2, LineChart, Star, ShieldCheck } from 'lucide-react';`
    );
  }
}

// 2. Remove 'Faculty Login' from tabs
content = content.replace(
  "{['Faculty Login', 'Admin Setup', 'Overview', 'Leaderboard', 'Activity'].map(tab => (",
  "{['Admin Setup', 'Overview', 'Leaderboard', 'Activity'].map(tab => ("
);
content = content.replace(
  "onClick={() => { if(tab !== 'Faculty Login') setNavTab(tab); }}",
  "onClick={() => setNavTab(tab)}"
);

// 3. Replace large card icons
content = content.replace(
  '<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center text-lg sm:text-xl">👥</div>',
  '<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center"><Users className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} /></div>'
);

content = content.replace(
  '<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#DCFCE7] text-[#059669] flex items-center justify-center text-lg sm:text-xl">🎓</div>',
  '<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#DCFCE7] text-[#059669] flex items-center justify-center"><GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} /></div>'
);

content = content.replace(
  '<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center text-lg sm:text-xl">📊</div>',
  '<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center"><BarChart2 className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} /></div>'
);

// 4. Replace mini card emojis with lucide icons
// Previous map:
// {[
//   { icon: "🔗", title: "ACTIVE BATCHES", val: "3", sub: "2024-28 running" },
//   { icon: "📈", title: "RESPONSE RATE", val: "78%", sub: "This month" },
//   { icon: "⭐", title: "AVG RATING", val: "4.2", sub: "★ across depts" },
//   { icon: "🛡️", title: "VERIFIED TODAY", val: "12", sub: "New logs" }
// ]

const oldMiniCards = `{[
                { icon: "🔗", title: "ACTIVE BATCHES", val: "3", sub: "2024-28 running" },
                { icon: "📈", title: "RESPONSE RATE", val: "78%", sub: "This month" },
                { icon: "⭐", title: "AVG RATING", val: "4.2", sub: "★ across depts" },
                { icon: "🛡️", title: "VERIFIED TODAY", val: "12", sub: "New logs" }
              ].map((card, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-sm border border-[#E7E5E4] rounded-[16px] p-4 sm:p-5 shadow-sm flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-bold text-[#A8A29E] tracking-widest uppercase mb-2 sm:mb-3 whitespace-nowrap">
                    <span>{card.icon}</span> <span className="truncate">{card.title}</span>
                  </div>`;

const newMiniCards = `{[
                { icon: <Link2 className="w-3.5 h-3.5" strokeWidth={2} />, title: "ACTIVE BATCHES", val: "3", sub: "2024-28 running" },
                { icon: <LineChart className="w-3.5 h-3.5" strokeWidth={2} />, title: "RESPONSE RATE", val: "78%", sub: "This month" },
                { icon: <Star className="w-3.5 h-3.5" strokeWidth={2} />, title: "AVG RATING", val: "4.2", sub: "★ across depts" },
                { icon: <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2} />, title: "VERIFIED TODAY", val: "12", sub: "New logs" }
              ].map((card, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-sm border border-[#E7E5E4] rounded-[16px] p-4 sm:p-5 shadow-sm flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-bold text-[#A8A29E] tracking-widest uppercase mb-2 sm:mb-3 whitespace-nowrap">
                    <span className="text-[#78716C]">{card.icon}</span> <span className="truncate">{card.title}</span>
                  </div>`;

content = content.replace(oldMiniCards, newMiniCards);

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Updated icons and removed faculty login");
