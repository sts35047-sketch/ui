const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = content.indexOf('function StudentLoginFlow({ setActive }');
const nextFnIdx = content.indexOf('function Flow4', startIdx);
let f = content.substring(startIdx, nextFnIdx);

// First let's put it back to normal (I'll just pull it from git? Not available).
// Let's just fix the HTML tree.
// Problem 1: D:/imgs of website/erp/best-ui-original-before-theme/best-ui-original-before-theme/src/App.tsx:732:10: ERROR: Unexpected closing "section" tag does not match opening "div" tag
// Meaning left section is missing a </div>.
// Let's find "Secure College SSO &middot; VTU &middot; Karnataka</p>"
f = f.replace(
  '<p className="text-xs text-[#1C1716]/50 mt-auto pt-3">Secure College SSO &middot; VTU &middot; Karnataka</p>\r\n        </section>',
  '<p className="text-xs text-[#1C1716]/50 mt-auto pt-3">Secure College SSO &middot; VTU &middot; Karnataka</p>\r\n        </div>\r\n        </section>'
);
f = f.replace(
  '<p className="text-xs text-[#1C1716]/50 mt-auto pt-3">Secure College SSO &middot; VTU &middot; Karnataka</p>\n        </section>',
  '<p className="text-xs text-[#1C1716]/50 mt-auto pt-3">Secure College SSO &middot; VTU &middot; Karnataka</p>\n        </div>\n        </section>'
);

// Problem 2: D:/imgs of website/erp/best-ui-original-before-theme/best-ui-original-before-theme/src/App.tsx:825:6: ERROR: Unexpected closing "div" tag does not match opening "section" tag
// Right section has no </div> closing the inner div before </section>? Or missing </section>?
// At the end of the component:
f = f.replace(
  '        </section>\r\n    </div>\r\n  );\r\n}',
  '        </div>\r\n        </section>\r\n    </div>\r\n  );\r\n}'
);
f = f.replace(
  '        </section>\n    </div>\n  );\n}',
  '        </div>\n        </section>\n    </div>\n  );\n}'
);
// Also maybe the `</main>` is still there? Let's remove `</main>` if it exists:
f = f.replace('</main>\r\n', '');
f = f.replace('</main>\n', '');

content = content.substring(0, startIdx) + f + content.substring(nextFnIdx);
fs.writeFileSync('src/App.tsx', content, 'utf8');
