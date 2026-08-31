const fs = require('fs');
let txt = fs.readFileSync('public/atelier.html', 'utf8');

// The sidebar active state we already partially changed (Wait, did we?)
// Let's check if there are any remaining `bg-[#111] text-[#fdf8f0] border-[#111]` or similar.
txt = txt.replace(/m\?"bg-\[#111\] text-\[#fdf8f0\] border-\[#111\]/g, 'm?"bg-[#fff7eb] text-[#111] border-[#c45a3c]');

// The new text-white ones:
// m?"bg-[#111] text-white dark:bg-[#f5f1e8] dark:text-black border-[#111]"
txt = txt.replace(/m\?"bg-\[#111\] text-white dark:bg-\[#f5f1e8\] dark:text-black border-\[#111\]/g, 'm?"bg-[#fff7eb] text-[#111] dark:bg-[#333] dark:text-[#f5f1e8] border-[#c45a3c]');

// Another one from the mobile bottom bar:
// m?"bg-[#111] text-white dark:bg-[#2a2926]":"bg-[#111] text-[#fdf8f0]
txt = txt.replace(/m\?"bg-\[#111\] text-white dark:bg-\[#2a2926\]"/g, 'm?"bg-[#fff7eb] text-[#111] dark:bg-[#333]"');

// The STAMP & REVIEW button disabled state
// t?"opacity-40 cursor-not-allowed bg-[#111] text-white dark:bg-[#2a2926]":"bg-[#111] text-[#fdf8f0]
// Wait, the button SHOULD be black, just not cards. The user said "the card".
// "Which term are you leaving notes for?" - these are Sem 1 to Sem 8.
// Let's find exactly the class for Sem 1-8 cards.
// They say "term card".

fs.writeFileSync('public/atelier.html', txt);
console.log('Replaced more active card states.');
