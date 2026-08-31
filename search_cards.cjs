const fs = require('fs');
const txt = fs.readFileSync('public/atelier.html', 'utf8');

// The active card in light mode often turns black, e.g. bg-[#111] text-[#fdf8f0]
let matches = txt.match(/(bg-\[#111\].*?text-\[#fdf8f0\]|bg-black.*?text-white)/g) || [];
console.log('Matches:', matches);

// Let's also find where the semester catalog cards are defined
let index = txt.indexOf('Semester Catalog');
if (index !== -1) {
    console.log('Context around Semester Catalog:', txt.substring(index - 100, index + 500));
}

// Let's find context around "pull a card"
let index2 = txt.indexOf('pull a card');
if (index2 !== -1) {
    console.log('Context around pull a card:', txt.substring(index2 - 100, index2 + 1000));
}
