const fs = require('fs');
let config = fs.readFileSync('tailwind.config.js', 'utf8');

config = config.replace('theme: { extend: {} }', `theme: { extend: { screens: { 'short': { 'raw': '(max-height: 820px)' } } } }`);

fs.writeFileSync('tailwind.config.js', config, 'utf8');
