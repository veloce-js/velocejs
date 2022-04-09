// Testing the FastApi
import test from 'ava'
import { UwsServer } from '@velocejs/server/src'
import Fetch from 'node-fetch'
import { MyApi, msg1, msg2, msg3 } from './fixtures/my-api'

let api: MyApi
let app: UwsServer
const port = 30331
const hostname = `http://localhost:${port}`

test.before(async () => {
  app = new UwsServer()
  // set the port number here
  app.portNum = port
  api = new MyApi(app)
  // start up
  await api.anything()
})

test.after(() => {
  app.shutdown()
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
