const fs = require('fs');
let txt = fs.readFileSync('public/atelier.html', 'utf8');

const regex = /h\("h1",\{className:"font-serif[^}]*?",children:\["Good morning,",c\("br",\{\}\),h\("span",\{className:"relative inline-block",children:\["Karunya A\.",c\("span",\{className:".*?",children:"1EP24CS001"\}\)\]\}\)\]\}\)/;
const match = txt.match(regex);
if (match) {
    console.log('Found block:', match[0]);
    // Replace it with the new small font block
    const newBlock = `h("div",{className:"font-mono text-[14px] md:text-[16px] tracking-wide",children:["Student 1", c("span", {className:"ml-3 opacity-50"}, "1EP24CS0001")]})`;
    txt = txt.replace(regex, newBlock);
    fs.writeFileSync('public/atelier.html', txt);
    console.log('Successfully replaced header.');
} else {
    console.log('Could not find the header block!');
}
