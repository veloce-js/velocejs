import test from 'ava'
import { routeForContract } from './fixtures/route-for-contract'
import { Contract } from '../src'
import { Validators } from '@velocejs/validators'

let con: Contract
let val: Validators

test.before(()=> {

  val = new Validators(routeForContract)
  con = new Contract(routeForContract, val)
  

})


test.todo(`You need to write some test`)
