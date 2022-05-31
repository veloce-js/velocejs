import test from 'ava'
import { readJsonSync } from 'fs-extra'
import { join } from 'node:path'

import { Validators } from '../src'

let val: Validators

test.before(() => {
  const astMap = readJsonSync(join(__dirname, 'fixtures', 'multi-api-map.json'))
  val = new Validators(astMap)
  val.registerPlugin('MyCoolPlug', {
    main(val: number) {
      return val !== 42
    }
  })
  val.registerPlugin('MyOtherPlug', {
    main(c: string[], v: string) {
      return c.includes(v)
    }
    // the params get auto work out now
  })
  val.addRules('posts', {
    arg1: { plugin: 'MyOtherPlug', c: ['a', 'b', 'c'] },
    arg2: function(val: number) {
      return (val / 2) > 1
    }
  })
  val.addRules('archive', {
    id: { plugin: 'MyCoolPlug'}
  })
  val.addRules('archive', {
    id: { plugin: 'moreThan', num: 40}
  })
})

test(`Should able to export the addValidationRules script`, t => {

  const schema = val.exportAll()
  // console.dir(schema, { depth: null })
  t.truthy(schema)
})

test(`Should able to output the function to a file`, t => {

  const file = val.createScriptFile()

  console.log(file)

  t.truthy(file)
})
