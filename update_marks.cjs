const fs = require('fs');

let txt = fs.readFileSync('src/App.tsx', 'utf8');

txt = txt.replace("{ id: 1, name: 'Database Systems', code: 'CS501', i1: 18, i2: 19, a: 9, t: 46 }", "{ id: 1, name: 'Database Systems', code: 'CS501', i1: 20, i2: 19, a: 10, t: 49 }");
txt = txt.replace("{ id: 2, name: 'Operating Systems', code: 'CS502', i1: 16, i2: 17, a: 8, t: 41 }", "{ id: 2, name: 'Operating Systems', code: 'CS502', i1: 19, i2: 19, a: 10, t: 48 }");
txt = txt.replace("{ id: 3, name: 'Computer Networks', code: 'CS503', i1: 19, i2: 18, a: 10, t: 47 }", "{ id: 3, name: 'Computer Networks', code: 'CS503', i1: 20, i2: 20, a: 10, t: 50 }");
txt = txt.replace("{ id: 4, name: 'Software Engineering', code: 'CS504', i1: 15, i2: 16, a: 9, t: 40 }", "{ id: 4, name: 'Software Engineering', code: 'CS504', i1: 19, i2: 19, a: 10, t: 48 }");
txt = txt.replace("{ id: 5, name: 'AI Foundations', code: 'CS505', i1: 17, i2: 18, a: 8, t: 43 }", "{ id: 5, name: 'AI Foundations', code: 'CS505', i1: 20, i2: 19, a: 10, t: 49 }");

fs.writeFileSync('src/App.tsx', txt);
console.log('Desktop marks updated');
