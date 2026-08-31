const fs = require('fs');
let txt = fs.readFileSync('src/App.tsx', 'utf8');

const oldFlow4Regex = /function Flow4\(\{ setActive \}: any\) \{\s*return \(\s*<div className="fixed inset-0 w-full h-full z-\[100\] bg-black">\s*<iframe src="\/atelier\.html" className="w-full h-full border-0" \/>\s*<button[\s\S]*?<\/button>\s*<\/div>\s*\);\s*\}/;

const newFlow4 = `function Flow4({ setActive }: any) {
  React.useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data === 'LOGOUT') setActive(0);
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [setActive]);

  return (
    <div className="fixed inset-0 w-full h-full z-[100] bg-black">
      <iframe src="/atelier.html" className="w-full h-full border-0" />
      <button 
        onClick={() => setActive(0)}
        className="absolute top-6 left-6 z-[200] mono text-[12px] text-[#78716C] hover:text-[#1C1917] bg-white/80 backdrop-blur px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm border border-[#E7E5E4]"
      >
        &lt; Back to roles
      </button>
    </div>
  );
}`;

if (txt.match(oldFlow4Regex)) {
  txt = txt.replace(oldFlow4Regex, newFlow4);
  fs.writeFileSync('src/App.tsx', txt);
  console.log('Replaced Flow4 successfully.');
} else {
  console.log('Could not find Flow4 with regex.');
}
