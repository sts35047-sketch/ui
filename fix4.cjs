const fs = require('fs');
let lines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');

// Line 169 is index 168.
// 167|        </div>
// 168|      </div>
// 169|      </div>
// 170|    );
// 171|  }

if (lines[168].includes('</div>')) {
  lines.splice(168, 1);
  console.log("Removed from Flow1");
}

fs.writeFileSync('src/App.tsx', lines.join('\n'), 'utf8');
