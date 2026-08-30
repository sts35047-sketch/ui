const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = content.indexOf('function StudentLoginFlow({ setActive }');
const nextFnIdx = content.indexOf('function Flow4', startIdx);
let fnContent = content.substring(startIdx, nextFnIdx);

// Outer wrapper & main tag -> single full-bleed grid
fnContent = fnContent.replace(
  '<div className="bg-[#E9E2D3] h-[calc(100dvh-64px)] w-full flex items-center justify-center p-2 sm:p-3 md:p-6 lg:p-6 font-sans selection:bg-[#EE930D]/20">\r\n      <main className="w-full max-w-[1400px] h-full bg-white rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_40px_100px_-30px_rgba(28,23,22,0.35)] flex flex-col-reverse md:grid md:grid-cols-2">',
  '<div className="h-[calc(100dvh-64px)] w-full font-sans selection:bg-[#EE930D]/20 flex flex-col-reverse md:grid md:grid-cols-2 overflow-hidden bg-white">'
);
// Fallback if \n
fnContent = fnContent.replace(
  '<div className="bg-[#E9E2D3] h-[calc(100dvh-64px)] w-full flex items-center justify-center p-2 sm:p-3 md:p-6 lg:p-6 font-sans selection:bg-[#EE930D]/20">\n      <main className="w-full max-w-[1400px] h-full bg-white rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_40px_100px_-30px_rgba(28,23,22,0.35)] flex flex-col-reverse md:grid md:grid-cols-2">',
  '<div className="h-[calc(100dvh-64px)] w-full font-sans selection:bg-[#EE930D]/20 flex flex-col-reverse md:grid md:grid-cols-2 overflow-hidden bg-white">'
);


// Section left
fnContent = fnContent.replace(
  '<section className="relative bg-[#F2E8DB] flex flex-col px-6 py-4 sm:px-8 sm:py-6 lg:px-10 lg:py-6 h-full justify-between">',
  '<section className="relative bg-[#F2E8DB] flex flex-col items-center h-full">\n          <div className="w-full max-w-[600px] px-6 py-4 sm:px-8 sm:py-6 lg:px-10 lg:py-6 h-full flex flex-col justify-between">'
);

// Section right
fnContent = fnContent.replace(
  '<section className="relative bg-white flex flex-col px-6 py-4 sm:px-8 sm:py-6 lg:px-12 lg:py-6 h-full flex flex-col justify-between">',
  '<section className="relative bg-white flex flex-col items-center h-full">\n          <div className="w-full max-w-[500px] px-6 py-4 sm:px-8 sm:py-6 lg:px-12 lg:py-6 h-full flex flex-col justify-between">'
);

// End tags
// Right now it ends with:
//         </section>
//       </main>
//     </div>
//   );
// }
fnContent = fnContent.replace(
  '        </section>\r\n      </main>\r\n    </div>\r\n  );\r\n}',
  '          </div>\r\n        </section>\r\n    </div>\r\n  );\r\n}'
);
fnContent = fnContent.replace(
  '        </section>\n      </main>\n    </div>\n  );\n}',
  '          </div>\n        </section>\n    </div>\n  );\n}'
);


// Replace emoji with logo
fnContent = fnContent.replace(
  '<span className="text-3xl leading-none" aria-hidden="true">??</span>',
  '<img src={logoUrl} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />'
);

// We need to also close the Left panel inner div.
// The left panel ended at:
//           {/* Decorative corner element */}
//           <div className="absolute top-0 right-0 w-24 h-24 bg-[#E9E2D3] rounded-bl-[100px] opacity-50 pointer-events-none" aria-hidden="true" />
//         </section>
fnContent = fnContent.replace(
  '          <div className="absolute top-0 right-0 w-24 h-24 bg-[#E9E2D3] rounded-bl-[100px] opacity-50 pointer-events-none" aria-hidden="true" />\r\n        </section>',
  '          </div>\r\n          <div className="absolute top-0 right-0 w-24 h-24 bg-[#E9E2D3] rounded-bl-[100px] opacity-50 pointer-events-none" aria-hidden="true" />\r\n        </section>'
);
fnContent = fnContent.replace(
  '          <div className="absolute top-0 right-0 w-24 h-24 bg-[#E9E2D3] rounded-bl-[100px] opacity-50 pointer-events-none" aria-hidden="true" />\n        </section>',
  '          </div>\n          <div className="absolute top-0 right-0 w-24 h-24 bg-[#E9E2D3] rounded-bl-[100px] opacity-50 pointer-events-none" aria-hidden="true" />\n        </section>'
);


content = content.substring(0, startIdx) + fnContent + content.substring(nextFnIdx);
fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('Split layout applied');
