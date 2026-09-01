const fs = require('fs');

// Read App_old which is probably utf-16le
let buf = fs.readFileSync('src/App_old.tsx');
let str = buf.toString('utf16le');

if (str.includes('lucide-react')) {
    // it was indeed utf-16le
    fs.writeFileSync('src/App.tsx', str, 'utf8');
    console.log("Converted successfully using utf16le");
} else {
    // maybe it was utf8 already?
    str = buf.toString('utf8');
    fs.writeFileSync('src/App.tsx', str, 'utf8');
    console.log("Copied as utf8");
}
