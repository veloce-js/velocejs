// testign the bodyParser core
import test from 'ava'
import fetch from 'node-fetch'
import app from './fixtures/server'
import { sendJson } from './fixtures/send-json'
const testResultParam = { a: '1', b: '2', c: '3' }
let url = 'http://localhost:'

test.before(() => {
  app.start()
  url = url + app.getPortNum()
  // console.log(`server started on ${url}`)
})

test.after(() => {
  app.shutdown()
})

test('Testing the GET url param', async (t) => {

  t.true(app.running)
  const result = await fetch(`${url}/some-end-point?a=1&b=2&c=3`)
  const json = await result.json()

  t.deepEqual(json, testResultParam)
})

test(`Testing the POST json`, async (t) => {
  const payload = {hello: 'world'}
  const json = await sendJson(`${url}/some-json-end-point`, payload)

  t.deepEqual(json, payload)
})


test('Testing the POST form-data', async (t) => {

  const params = new URLSearchParams()
  params.append('a', '1')
  params.append('b', '2')
  params.append('c', '3')

  const result = await fetch(`${url}/some-form-end-point`, {
    method: 'POST',
    body: params
  })
  const json = await result.json()
  t.deepEqual(json, testResultParam)

})
