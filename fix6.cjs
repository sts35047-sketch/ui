const fs = require('fs');
let text = fs.readFileSync('src/App.tsx', 'utf8');
text = text.replace('  );\r\n    </div>\r\n}', '    </div>\r\n  );\r\n}');
text = text.replace('  );\n    </div>\n}', '    </div>\n  );\n}');
fs.writeFileSync('src/App.tsx', text, 'utf8');
