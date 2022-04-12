// the cp works fine but the path are wrong so we need to create a script to do it
// cp ./src/types.d.ts ./index.d.ts && cp ./src/types.d.ts ./dist/types.d.ts && pnpm fix:index
const fs = require('fs-extra')
const { join } = require('path')

const src = join(__dirname, 'src', 'type.d.ts')
const file = join(__dirname, 'index.d.ts')

fs.copy(src, join(__dirname, 'dist', 'type.d.ts'))
  .then(() => fs.copy(src, file))
  .then(() => {
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
  })
