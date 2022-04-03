const path = require('path')
const args = process.argv
const { spawn } = require('child_process')
const fs = require('fs')

const tsFile = path.join(__dirname, args[2])
const newFileName = path.basename(tsFile).replace('.ts', '.js')

const logStream = fs.createWriteStream(path.join(__dirname, 'tmp', newFileName), {flags: 'a'});

const ls  = spawn('swc', [tsFile])

ls.stdout.pipe(logStream)

ls.on('close', function (code) {



  console.log('child process exited with code ' + code)
})



// try to use swc to compile the ts --> js then exeucte the js file
// const swc = require("@swc/core")
// const fs = require('fs-extra')
// const path = require('path')


/*
 @BUG couldn't transform fail

*/
/*
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
  */
