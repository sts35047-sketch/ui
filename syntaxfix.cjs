const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Fix React.useState
content = content.replaceAll('React.useState', 'useState');

// Fix closing tags
content = content.replace('</main>\r\n    </div>', '</div>\r\n    </div>');
content = content.replace('</main>\n    </div>', '</div>\n    </div>');

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Syntax fixed");
