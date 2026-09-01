const fs = require('fs');
let appTsx = fs.readFileSync('src/App.tsx', 'utf8');

const svgIllustration = `
        {/* Illustration */}
        <div className="w-full flex justify-center items-center mt-2 mb-6">
          <svg width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Tilted Cap */}
            <g transform="translate(50, 20) rotate(-12)">
              <path d="M0,20 L40,5 L80,20 L40,35 Z" fill="#064E3B" />
              <path d="M20,27 L20,45 C30,55 50,55 60,45 L60,27" fill="none" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M40,20 L75,35 L75,50" fill="none" stroke="#064E3B" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M72,50 L78,50 L76,60 L74,60 Z" fill="#064E3B" />
            </g>

            {/* Open Book */}
            <g transform="translate(85, 55) rotate(8)">
              <path d="M0,20 C10,15 25,15 35,20 C45,15 60,15 70,20 L65,30 C55,25 45,25 35,30 C25,25 15,25 5,30 Z" fill="none" stroke="#064E3B" strokeWidth="2" strokeLinejoin="round" />
              <path d="M35,20 L35,30" stroke="#064E3B" strokeWidth="2" strokeLinecap="round" />
              <path d="M10,23 C18,20 25,20 30,23" stroke="#064E3B" strokeWidth="1" strokeLinecap="round" />
              <path d="M12,26 C18,23 25,23 30,26" stroke="#064E3B" strokeWidth="1" strokeLinecap="round" />
              <path d="M40,23 C45,20 52,20 60,23" stroke="#064E3B" strokeWidth="1" strokeLinecap="round" />
              <path d="M40,26 C45,23 52,23 60,26" stroke="#064E3B" strokeWidth="1" strokeLinecap="round" />
            </g>

            {/* Shadows/Surface Lines */}
            <path d="M60,95 L120,85" stroke="#064E3B" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M80,102 L105,98" stroke="#064E3B" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M115,108 L130,105" stroke="#064E3B" strokeWidth="1.5" strokeLinecap="round" />

            {/* Stars/Dots */}
            <circle cx="45" cy="75" r="1.5" fill="#064E3B" />
            <circle cx="150" cy="30" r="1.5" fill="#064E3B" />
            <circle cx="130" cy="70" r="1.5" fill="#064E3B" />
            <circle cx="75" cy="15" r="1" fill="#064E3B" />
            
            {/* Sparkle */}
            <path d="M130,20 L132,24 L136,26 L132,28 L130,32 L128,28 L124,26 L128,24 Z" fill="#059669" opacity="0.6" />
          </svg>
        </div>
`;

// Replace `h-[600px]` with `h-auto lg:h-[720px]` in left and right column
appTsx = appTsx.replace(/h-\[600px\]/g, 'h-auto lg:h-[720px]');

// Find `<div className="space-y-6 mb-12">` and replace with `<div className="space-y-4 mb-4">`
appTsx = appTsx.replace(/<div className="space-y-6 mb-12">/, '<div className="space-y-4 mb-4">');

// Find `{/* Floating Mini Cards */}` and inject SVG right above it
appTsx = appTsx.replace(/{ \/\* Floating Mini Cards \*\/ }/g, '{/* Floating Mini Cards */}'); // Normalize if needed
appTsx = appTsx.replace(/\{\/\* Floating Mini Cards \*\/\}/, svgIllustration + '\n        {/* Floating Mini Cards */}');

// Also adjust mb-10 and mb-8 in Left column to be smaller so it fits nicely
appTsx = appTsx.replace(/mb-10/g, 'mb-6');
appTsx = appTsx.replace(/mb-8/g, 'mb-6');

fs.writeFileSync('src/App.tsx', appTsx);
console.log('Done injecting SVG illustration');
