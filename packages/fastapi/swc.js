// try to use swc to compile the ts --> js then exeucte the js file
const swc = require("@swc/core")
const fs = require('fs-extra')
const path = require('path')
const args = process.argv
const file = args[2]

/*
 @BUG couldn't transform fail 

*/

swc
  .transform("Run TS File", {
    // Some options cannot be specified in .swcrc
    filename: path.join(__dirname, file),
    sourceMaps: false,
    // Input files are treated as module by default.
    isModule: false,
    // All options below can be configured via .swcrc
    "jsc": {
      "parser": {
        "syntax": "typescript",
        "decorators": true
      },
      "transform": {
        "legacyDecorator": true,
        "decoratorMetadata": true
      },
      "target": "es2022",
      "loose": false,
      "minify": {
        "compress": false,
        "mangle": false
      }
    }
  })
  .then((output) => {
    console.log(output.code) // transformed code
    // output.map; // source map (in string)
  })
