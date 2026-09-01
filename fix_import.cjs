const fs = require('fs');
let txt = fs.readFileSync('src/App.tsx', 'utf8');
if (!txt.includes('import StudentMobileApp')) {
    txt = 'import StudentMobileApp from "./StudentMobileApp";\n' + txt;
    fs.writeFileSync('src/App.tsx', txt);
    console.log('Fixed import');
} else {
    console.log('Already imported');
}
