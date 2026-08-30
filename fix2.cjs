const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// The extra div was injected at 825 in StudentLoginFlow, let's remove it.
content = content.replace(
`        </main>
      </div>
    </div>
    </div>
  );
}`,
`        </main>
      </div>
    </div>
  );
}`
);

content = content.replace(
`        </main>
      </div>
    </div>
  );
}`,
`        </main>
      </div>
  );
}`
);


// And let's find the end of Flow4 and make sure it has the right number of closing divs
// Flow4 should end with 
/*
        </div>
      </div>
    </div>
  );
}
*/
const flow4EndStr = `            </div>
          )}

        </div>
      </div>
    </div>
  );
}

function Flow5`;

const flow4CorrectEnd = `            </div>
          )}

        </div>
      </div>
    </div>
    </div>
  );
}

function Flow5`;

content = content.replace(flow4EndStr, flow4CorrectEnd);

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Fixed manually");
