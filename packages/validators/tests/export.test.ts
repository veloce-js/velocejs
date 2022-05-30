import test from 'ava'
import { readJsonSync } from 'fs-extra'
import { join } from 'node:path'

import { Validators } from '../src'

let val: Validators

test.before(() => {
  const astMap = readJsonSync(join(__dirname, 'fixtures', 'multi-api-map.json'))
  val = new Validators(astMap)
})

test(`Should able to export the addValidationRules script`, t => {

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


  const schema = val.exportAll()

  // console.dir(schema, { depth: null })

  t.truthy(schema)

})
