import test from 'ava'
import MultiApi from './fixtures/multi-api'
import { readJsonSync } from 'fs-extra'
import { join } from 'node:path'
import { Validators } from '../src'


let api: MultiApi
let validators: Validators
test.before(() => {
  const astMap = readJsonSync(join(__dirname, 'fixtures', 'multi-api.json'))

  api = new MultiApi()
  validators = new Validators(astMap)
})




test(`Should able to get a validator but name and pass the validation`, async t => {


  

})
