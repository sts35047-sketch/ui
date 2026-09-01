const fs = require('fs');
let appTsx = fs.readFileSync('src/App.tsx', 'utf8');

// Replace React.useState with useState
appTsx = appTsx.replace(/React\.useState/g, 'useState');

// Let's also check if there is any other `React.`
appTsx = appTsx.replace(/React\.useEffect/g, 'useEffect');
appTsx = appTsx.replace(/React\.useRef/g, 'useRef');

fs.writeFileSync('src/App.tsx', appTsx);
console.log('Fixed React.useState');
