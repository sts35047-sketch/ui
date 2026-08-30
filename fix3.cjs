const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(
`        </div>\r
      </div>\r
    </div>\r
  );\r
}`,
`        </div>\r
      </div>\r
    </div>\r
    </div>\r
  );\r
}`
);
fs.writeFileSync('src/App.tsx', content, 'utf8');
