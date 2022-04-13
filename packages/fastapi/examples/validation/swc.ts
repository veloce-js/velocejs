import { astParser } from '../../src/server/lib/ts-ast-parser'
import { join } from 'path'

const infile = join(__dirname, 'MyApi.ts')

astParser(infile)
  .then(result => {
    console.dir(result, { depth: null })
  })
