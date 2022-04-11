// Testing the FastApi
import test from 'ava'

import Fetch from 'node-fetch'
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
  const text = await response.text()

  t.is(text, msg1)
})

test(`Should able to respond with their own custom method`, async (t) => {
  t.plan(1)

  const response = await Fetch(`${hostname}/custom-handler`)
  const text = await response.text()

  t.is(text, msg2)
})

test(`Testing the post method handler`, async (t) => {
  t.plan(1)
  const todo = {name: 'John', value: 'something'}
  const endpoint = `${hostname}/submit`

  await Fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(text => {
    t.deepEqual(text, {msg: `John is doing something`})
  })
})

test(`Test the RAW decorator`, async (t) => {
  t.plan(1)

  const response = await Fetch(`${hostname}/fall-back-route`, { method: 'PUT'})
  const text = await response.text()

  t.is(text, msg3)
})
