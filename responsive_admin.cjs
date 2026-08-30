const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = content.indexOf('function CollegeAdminDashboard({ setActive }: any) {');
if (startIdx === -1) {
    console.error("Function not found");
    process.exit(1);
}
// Delete from startIdx to end of file, we will replace it using a separate process
