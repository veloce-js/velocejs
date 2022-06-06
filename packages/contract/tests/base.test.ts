import test from 'ava'
import { routeForContract, astMap } from './fixtures/route-for-contract'
import { Contract } from '../src'
import { Validators } from '@velocejs/validators'

let con: Contract
let val: Validators

test.before(()=> {

  val = new Validators(astMap)

  val.addRules('posts', {
    'content': {
      plugin: 'moreThan', num: 50
    }
  })

  con = new Contract(routeForContract, val)

})


test(`Testing the exportAll with validation info`, t => {

  const contract = con.generate()

  console.dir(contract, {depth: null})

  t.truthy(contract)

})
