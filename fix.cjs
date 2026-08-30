const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
const flow5Start = content.indexOf('function Flow5');
const insertPos = content.lastIndexOf('  );\n}', flow5Start);
if (insertPos !== -1) {
  content = content.substring(0, insertPos) + '    </div>\r\n' + content.substring(insertPos);
  fs.writeFileSync('src/App.tsx', content, 'utf8');
  console.log("Fixed");
} else {
  // Try with \r\n
  const insertPos2 = content.lastIndexOf('  );\r\n}', flow5Start);
  if (insertPos2 !== -1) {
    content = content.substring(0, insertPos2) + '    </div>\r\n' + content.substring(insertPos2);
    fs.writeFileSync('src/App.tsx', content, 'utf8');
    console.log("Fixed with \\r\\n");
  } else {
    console.log("Not found");
  }
}
