const fs = require('fs');
let txt = fs.readFileSync('src/App.tsx', 'utf8');

txt = txt.replace('return (\n    <div className="hidden md:flex min-h-screen', 'return (\n    <>\n    <div className="hidden md:flex min-h-screen');
txt = txt.replace('return (\r\n    <div className="hidden md:flex min-h-screen', 'return (\r\n    <>\r\n    <div className="hidden md:flex min-h-screen');
txt = txt.replace('return (\n    <div className="min-h-screen', 'return (\n    <>\n    <div className="hidden md:flex min-h-screen');
txt = txt.replace('return (\r\n    <div className="min-h-screen', 'return (\r\n    <>\r\n    <div className="hidden md:flex min-h-screen');

fs.writeFileSync('src/App.tsx', txt);
console.log('Fixed top fragment');
