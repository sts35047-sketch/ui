const fs = require('fs');
let txt = fs.readFileSync('src/App.tsx', 'utf8');

const endReturn = txt.lastIndexOf(');', txt.indexOf('function Flow5'));
const startReturn = txt.lastIndexOf('return (', endReturn);

// Just replace everything from the last </div> before ); to the );
const lastDiv = txt.lastIndexOf('</div>', endReturn);
if (lastDiv !== -1) {
    const replacement = `</div>
    <div className="block md:hidden">
      <StudentMobileApp setActive={setActive} />
    </div>
    </>
  );`;
    txt = txt.substring(0, lastDiv) + replacement + txt.substring(endReturn + 2);
}

fs.writeFileSync('src/App.tsx', txt);
console.log('Fixed end of Flow4');
