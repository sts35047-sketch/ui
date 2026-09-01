const fs = require('fs');
let txt = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /<\/div>\s*<\/div>\s*<\/div>\s*\);\s*}\s*function CollegeAdminDashboard/m;

const replacement = `      </div>
      </div>
    </div>
    <div className="block md:hidden">
      <StudentMobileApp setActive={setActive} />
    </div>
    </>
  );
}

function CollegeAdminDashboard`;

txt = txt.replace(regex, replacement);
fs.writeFileSync('src/App.tsx', txt);
console.log("Fixed Flow4 end.");
