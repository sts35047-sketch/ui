const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = content.indexOf('function StudentLoginFlow({ setActive }');
const nextFnIdx = content.indexOf('function Flow4', startIdx);
let f = content.substring(startIdx, nextFnIdx);

// Remove the extra closing div
f = f.replace(
  '        </div>\r\n      </div>\r\n    );\r\n  }',
  '      </div>\r\n    );\r\n  }'
);
f = f.replace(
  '        </div>\n      </div>\n    );\n  }',
  '      </div>\n    );\n  }'
);

content = content.substring(0, startIdx) + f + content.substring(nextFnIdx);
fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Removed extra div");
