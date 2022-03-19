// use fs-extra to clean folder instead of command line makes it cross platform

const fsx = require('fs-extra')
const { join } = require('path')
const dirs = ['dist', 'build']

dirs.forEach(dir => {
  fsx.removeSync(join(__dirname, dir))
})

// add one more action just copy the README.md to README.en.md

fsx.remove('./README.en.md', () => {
  fsx.copy('./README.md', './README.en.md')
})

// also need to copy over the tpl files

fsx.copy('./src/tpl', './dist/tpl')
