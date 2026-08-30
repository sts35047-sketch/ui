const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the specific text block
content = content.replace(/<span className="text-3xl leading-none" aria-hidden="true">\?\?<\/span>/g, '<img src={logoUrl} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />');
// Wait, sometimes there are weird characters. Let's just use ?? in the regex.
content = content.replace(/<span[^>]*>\?\?<\/span>/g, '<img src={logoUrl} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />');

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Logo replaced using regex.");
