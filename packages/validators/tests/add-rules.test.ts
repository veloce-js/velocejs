// testing several situation adding rules or setting up plugins
import test from 'ava'
import { Validators } from '../src'
// import MultiApi from './fixtures/multi-api'
import { readJsonSync } from 'fs-extra'
import { join } from 'node:path'
import { JsonqlValidationError } from '@jsonql/errors'

// let api: MultiApi
let validators: Validators
test.before(() => {
  const astMap = readJsonSync(join(__dirname, 'fixtures', 'multi-api-map.json'))

  //  api = new MultiApi()
  validators = new Validators(astMap)
})

test(`Should able to add inline validate rule`, async t => {

  const validator = validators.getValidator('archive')

  validator.addValidationRules({
    id: {
      validate: (value: number) => {
        // console.log('call me with', value)
        return value > 100
      }
    }
  })

  return validator.validate([101])
                  .then((result: Array<number>) => {
                    t.deepEqual(result, [101])
                  })
})

test(`Super simple plugin to see if it working correct`, async t => {

  validators.registerPlugin('myOwnRuleSimple', {
    main: function(v: string) {
      const x = 'hello'
      return !(v.indexOf(x) > -1)
    }
  })

  const validator = validators.getValidator('posts')

  validator.addValidationRules({
    arg1: {plugin: 'myOwnRuleSimple', params: []}
  })

  const value = ['hellothere', 201]

  return validator.validate(value)
                  .then((result: Array<string|number>) => {
                    t.deepEqual(result, value)
                  })
                  .catch((error: JsonqlValidationError) => {
                    t.deepEqual(error.detail, [0,1])
                  })
})



test(`Should able to register a plugin and call it`, async t => {

  validators.registerPlugin('myOwnRule', {
    main: function(x: string, v: string) {
      return !(v.indexOf(x) > -1)
    },
    params: ['x']
  })

  const validator = validators.getValidator('posts')

  validator.addValidationRules({
    arg1: {plugin: 'myOwnRule', x: 'hello'}
  })

  const value = ['helloworld', 101]

  return validator.validate(value)
                  .then((result: Array<string|number>) => {
                    t.deepEqual(result, value)
                  })
                  .catch((error: JsonqlValidationError) => {

                    t.deepEqual(error.detail, [0,1])
                  })
})
