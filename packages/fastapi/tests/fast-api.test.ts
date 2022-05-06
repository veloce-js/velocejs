// Testing the FastApi
import test from 'ava'

import Fetch from 'node-fetch'
import { ValidatorFactory } from '@jsonql/validator'
import { MyApi, msg1, msg2, msg3 } from './fixtures/my-api'

let api: MyApi
const port = 30331
const hostname = `http://localhost:${port}`

test.before(async () => {
  api = new MyApi()
  // start up
  await api.start(port)
})

test.after(() => {
  api.stop()
})

test(`Testing the class extends from FastApi`, async (t) => {
  t.plan(1)

  const response = await Fetch(`${hostname}/some-where`)

  console.log('HEADERS',  response.headers)

  const text = await response.text()

  t.is(text, msg1)
})

test(`Should able to respond with their own custom method`, async (t) => {
  t.plan(1)

  const response = await Fetch(`${hostname}/custom-handler`)
  const text = await response.text()

  t.is(text, msg2)
})

/*
test(`Take out the validator to test it alone with the method`, async (t) => {
  const validateObj = new ValidatorFactory([
    {name: 'name', type: 'string', required: true},
    { name: 'value', type: 'string', required: true}
  ])

  validateObj.

})
*/

test(`Testing the post method handler`, async (t) => {
  t.plan(1)
  const todo = {name: 'John', value: 'something'}
  const endpoint = `${hostname}/submit`

  await Fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => {
    console.log(res.status)
    return res.json()
  })
  .then(text => {

      console.log(text)

    t.deepEqual(text, {msg: `John is doing something`})
  })
})

test(`Test the RAW decorator`, async (t) => {
  t.plan(1)

  const response = await Fetch(`${hostname}/fall-back-route`, { method: 'PUT'})
  const text = await response.text()

  t.is(text, msg3)
})
