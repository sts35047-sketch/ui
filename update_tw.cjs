const fs = require('fs');
let config = fs.readFileSync('tailwind.config.js', 'utf8');

const newExtend = `{ 
      screens: { 'short': { 'raw': '(max-height: 820px)' } },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }`;

config = config.replace(`{ screens: { 'short': { 'raw': '(max-height: 820px)' } } }`, newExtend);
fs.writeFileSync('tailwind.config.js', config, 'utf8');
console.log("Tailwind config updated with animations.");
