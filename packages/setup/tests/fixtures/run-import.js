
import { join } from 'path'
import { importPlopfile } from '../../src/import-plopfile.js'
import getDirname from '../../src/dirname.js'

const __dirname = getDirname(import.meta.url)

importPlopfile(join(__dirname, '..', '..', 'templates'))
  .then(fns => {

    if (!fns) {
      return console.log(`Got nothing`, fns)
    }


    fns.forEach(fn => {

      console.log(fn)

      console.log(typeof fn.default)

      Reflect.apply(fn.default, null, [])

    })
  })
