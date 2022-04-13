import { astParser } from '../../src/server/lib/ts-ast-parser'
import { join } from 'path'

const infile = join(__dirname, 'MyApi.ts')

astParser(infile)
  /*
  .then(ast => {
    ast[0].body.map(body => {
      body.function.params.map(b => {
        console.log(b.pat.value)
        console.log(b.pat.typeAnnotation)
      })
    })
  })
  */
