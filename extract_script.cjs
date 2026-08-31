const fs = require('fs');
const html = fs.readFileSync('atelier_raw.html', 'utf-8');
const scriptMatch = html.match(/<script type="module">([\s\S]*?)<\/script>/);
if (scriptMatch) {
    fs.writeFileSync('script_block.js', scriptMatch[1], 'utf-8');
    console.log('Saved script_block.js');
} else {
    // If it's a raw string starting with <!DOCTYPE html> but maybe script is not type="module"
    const scriptMatch2 = html.match(/<script>([\s\S]*?)<\/script>/);
    if (scriptMatch2) {
        fs.writeFileSync('script_block.js', scriptMatch2[1], 'utf-8');
        console.log('Saved script_block.js (no module)');
    } else {
        console.log('Could not find script block');
    }
}
