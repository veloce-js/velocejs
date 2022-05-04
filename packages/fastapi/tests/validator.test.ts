// Testing the validator
import test from 'ava'
import Fetch from 'node-fetch'
import { MyExample } from './fixtures/my-example'

let myExampleObj: MyExample
const port = 30338
const hostname = `http://localhost:${port}`

test.before(async () => {
  myExampleObj = new MyExample()
  await myExampleObj.start(port)
})

test.after(() => {
  myExampleObj.stop()
})

test(`Validation with Decorator and @jsonql/validator`, async t => {

  const endpoint = `${hostname}/login`
  const login = {username: 'John', password: '123456'}

  return Fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(login),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(json => {
    t.deepEqual(json, {username: 'John'})
  })
})
