// util cli to upgrade the packages recursively
const { join } = require('node:path')
const glob = require('glob')

const pkgsDir = join(__dirname, 'packages')
// loop through the top level of packages folder
glob(join(pkgsDir, '*'), (err, files) => {
  if (err) {
    return console.error('ERROR:', err)
  }
  // we want to run them one after the other 
  files.forEach(cmd => {



  })

  console.log(files)



})
// change the cmd to that packages root then run `ncu -u`

// exit and back to the project root

// run pnpm install

// done
