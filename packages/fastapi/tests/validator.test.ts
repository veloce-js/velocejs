// Testing the validator
import test from 'ava'
import Fetch from 'node-fetch'
import { MyExample } from './fixtures/my-example'
import { ValidatorFactory } from '@jsonql/validator'

let myExampleObj: MyExample
const port = 30338
const hostname = `http://localhost:${port}`
const logigEndpoint = `${hostname}/login`
test.before(async () => {
  myExampleObj = new MyExample()
  await myExampleObj.$start(port)
})

test.after(() => {
  myExampleObj.$stop()
})

test(`Re-test the spread style method here to see what cause the problem with dynamic route`, async t => {
  t.plan(1)
  const astMap = {
    archive: [
      {
        name: 'dates',
        required: true,
        tstype: 'RestElement',
        type: 'array',
        types: 'number',
        typeParams: [Object]
      }
    ]
  }
  const val = new ValidatorFactory(astMap.archive)
  return val.validate([2022, 5, 19])
            .then((result: number[]) => {
              t.truthy(result)
            })
})

test(`Validation with Decorator and @jsonql/validator`, async t => {
  t.plan(1)
  const login = {username: 'John', password: '123456'}

  return Fetch(logigEndpoint, {
    method: 'POST',
    body: JSON.stringify(login),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(json => {
    t.deepEqual(json, {username: 'john'})
  })
})

test(`Validation with Decorator and @jsonql/validator another success to call api repeatly`, async t => {
  t.plan(1)
  const login = {username: 'Doe', password: '654321'}

  return Fetch(logigEndpoint, {
    method: 'POST',
    body: JSON.stringify(login),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(json => {
    t.deepEqual(json, {username: 'doe'})
  })
})

test(`Validation with wrong property to cause a throw`, async t => {
  const login = {username: 'John', password: '123'}
  t.plan(2)
  return Fetch(logigEndpoint, {
    method: 'POST',
    body: JSON.stringify(login),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => {
    t.is(res.status, 417)
    // console.log('server status -->', res.status)
    return res.json()
  })
  .then((json: any) => {
    // console.log('json', json)
    t.truthy(json.errors)
  })
  /*
  .catch((error: any) => {
    // should get a non 200 respond
    // console.log('catch server error here', error)
    t.pass()
  })
  */
})
