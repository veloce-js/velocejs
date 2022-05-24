import test from 'ava'
import MultiApi from './fixtures/multi-api'
import { readJsonSync } from 'fs-extra'
import { join } from 'node:path'
import { Validators } from '../src'


let api: MultiApi
let validators: Validators
test.before(() => {
  const astMap = readJsonSync(join(__dirname, 'fixtures', 'multi-api-map.json'))

  api = new MultiApi()
  validators = new Validators(astMap)
})


test(`Should able to get a validator but name and pass the validation`, async t => {
  t.plan(2)

  const V = validators.getValidator('archive')

  return V.validate([1])
      .then((result: Array<number>) => {
        t.deepEqual(result, [1])
        const txt = Reflect.apply(api.archive, api, result)
        t.is(txt, 'Return with no.1')
      })
})
