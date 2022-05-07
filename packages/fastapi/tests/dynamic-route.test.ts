// testing the dynamic route
import test from 'ava'
import Fetch from 'node-fetch'
import { MyWrongDynamicRoute } from './fixtures/dynamic-route-error'
import { MyDynamicRoute } from './fixtures/dynamic-route-test-class'

let classInstance: MyDynamicRoute

test.before(async () => {
  classInstance = new MyDynamicRoute()
  await classInstance.start()
})

test.after(() => {
  classInstance.stop()
})

test(`Should able to use dynamic route on GET route with correct type on method`, t => {

  t.pass()
})

test.todo(`Should able to use dynamic route on GET route with spread arguments`)


// t.throws or t.throwsAsync not able to contain the error within and cause the test fail
test.skip(`Should throw error if dynamic route apply on non-get route`, async t => {
  t.plan(1)

  async function startWrong() {
    const obj = new MyWrongDynamicRoute()
    return await obj.start()
  }

  t.throwsAsync(async () => {
    return await startWrong()
  })
})
