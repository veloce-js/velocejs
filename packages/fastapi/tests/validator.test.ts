// Testing the validator
import test from 'ava'
import Fetch from 'node-fetch'
import { MyExample } from './fixtures/my-example'

let myExampleObj: MyExample
const port = 30338
const hostname = `http://localhost:${port}`
const loginEndpoint = `${hostname}/login`
test.before(async () => {
  myExampleObj = new MyExample()
  await myExampleObj.$start(port)
})

test.after(() => {
  myExampleObj.$stop()
})

test(`Validation with Decorator and @jsonql/validator`, async t => {
  t.plan(1)
  const login = {username: 'John', password: '123456'}

  return Fetch(loginEndpoint, {
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

  return Fetch(loginEndpoint, {
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
  return Fetch(loginEndpoint, {
    method: 'POST',
    body: JSON.stringify(login),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => {
    t.is(res.status, 417)
    return res.json()
  })
  .then((json: any) => {
    t.truthy(json.errors)
  })
})
