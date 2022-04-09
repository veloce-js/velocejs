// the cp works fine but the path are wrong so we need to create a script to do it
const fs = require('fs-extra')
const { join } = require('path')
const file = join(__dirname, 'index.d.ts')

fs.readFile(file, (err, txt) => {
  if (err) {
    console.error('ERROR:', err)
    return
  }
  const output = txt.toString().replace(/\/base\//gi, '/src/base/')
  fs.writeFile(file, output, (err) => {
    if (err) {
      console.error(`Error on write:`, err)
      return
    }
    console.log('done')
  })
})
