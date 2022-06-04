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

test(`Should able to use addRules in FRP style`, async t => {
  t.plan(1)

  return validators.addRules('archive', {
    id: {
      validate: (value: number) => {
        // console.log('call me with', value)
        return value > 100
      }
    }
  })
  .validate([99])
    .catch((error: JsonqlValidationError) => {
      t.deepEqual(error.detail, [0,1])
    })
})
