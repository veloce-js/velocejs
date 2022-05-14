// after the build we could grab all the types stuff and put them into the index.d.ts with the declare module
const args = process.argv.slice(2)
const { join } = require('path')
const fs = require('fs-extra')
const glob = require('glob')
const pkgsDir = join(__dirname, 'packages')
const pkgDir = args[0]
if (!pkgDir) {
  console.error(`pacakge directory is required!`)
  return
}
const pkgName = `@velocejs/${args[1] ? args[1] : pkgDir}`
const projectDir = join(pkgsDir, pkgDir)

glob(join(projectDir, 'dist', '**', '*.d.ts'), function(err, files) {
  if (err) {
    return console.error('ERROR:', err)
  }
  const ctn = files.length
  let output = `declare module "${pkgName}" {\n`
  for (let i = 0; i < ctn; ++i) {
    const content = fs.readFileSync(files[i])
    output += content
  }
  output += '\n}\n'
  // write it out
  console.log(output)
})
