const fs = require('fs');

const oldTxt = fs.readFileSync('src/App_old.tsx', 'utf16le');
const startOld = oldTxt.indexOf('function Flow4({ setActive');
const endOld = oldTxt.indexOf('function Flow5');
const flow4Original = oldTxt.substring(startOld, endOld);

const currentTxt = fs.readFileSync('src/App.tsx', 'utf8');
const startCur = currentTxt.indexOf('function Flow4({ setActive');
const endCur = currentTxt.indexOf('function Flow5');

const newTxt = currentTxt.substring(0, startCur) + flow4Original + currentTxt.substring(endCur);
fs.writeFileSync('src/App.tsx', newTxt, 'utf8');
console.log('Successfully reverted Flow4 to original design. startCur:', startCur, 'endCur:', endCur);
