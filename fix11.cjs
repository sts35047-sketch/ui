const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = content.indexOf('function StudentLoginFlow({ setActive }');
const nextFnIdx = content.indexOf('function Flow4', startIdx);
let f = content.substring(startIdx, nextFnIdx);

f = f.replace(/<div className="bg-\[#E9E2D3\] h-\[calc\(100dvh-64px\)\].*?>\s*<main.*?>/, '<div className="bg-white h-[calc(100dvh-64px)] w-full flex flex-col-reverse md:grid md:grid-cols-2 font-sans selection:bg-[#EE930D]/20 overflow-hidden">');

// If there's an extra div because we didn't inject `<div className="hidden">`
// Then the end tags are:
//         </section>
//       </main>
//     </div>
//   );
// }
f = f.replace(/<\/main>\s*<\/div>/, '</div>');

content = content.substring(0, startIdx) + f + content.substring(nextFnIdx);
fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Regex replace done");
