const fs = require('fs');
let txt = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `        </div>
      </div>
    </div>
    </div>
  );
}

function Flow5`;

const replaceStr = `        </div>
      </div>
    </div>
    </div>
    <div className="block md:hidden">
      <StudentMobileApp setActive={setActive} />
    </div>
    </>
  );
}

function Flow5`;

if (txt.includes(targetStr)) {
    txt = txt.replace(targetStr, replaceStr);
} else {
    // try different CRLF
    const targetStrCRLF = `        </div>\r\n      </div>\r\n    </div>\r\n    </div>\r\n  );\r\n}\r\n\r\nfunction Flow5`;
    const replaceStrCRLF = `        </div>\r\n      </div>\r\n    </div>\r\n    </div>\r\n    <div className="block md:hidden">\r\n      <StudentMobileApp setActive={setActive} />\r\n    </div>\r\n    </>\r\n  );\r\n}\r\n\r\nfunction Flow5`;
    txt = txt.replace(targetStrCRLF, replaceStrCRLF);
}

fs.writeFileSync('src/App.tsx', txt);
console.log('Fixed end of Flow4 properly!');
