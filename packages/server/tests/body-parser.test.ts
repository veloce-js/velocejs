// testign the bodyParser core
import test from 'ava'
import fetch from 'node-fetch'
import app from './fixtures/server'
import { sendJson } from './fixtures/send-json'

let url = 'http://localhost:'

test.before(() => {
  app.start()
  url = url + app.getPortNum()
  console.log(`server started on ${url}`)
})

test.after(() => {
  app.shutdown()
})

test('Testing the GET url param', async (t) => {

  t.true(app.running)
  const result = await fetch(`${url}/some-end-point?a=1&b=2&c=3`)
  const json = await result.json()

  t.deepEqual(json, { a: '1', b: '2', c: '3' })
})

test(`Testing the POST json`, async (t) => {
  const payload = {hello: 'world'}
  const json = await sendJson(`${url}/some-json-end-point`, payload)

  t.deepEqual(json, payload)

})

/*
test.skip('Testing the POST param', t => {
  t.pass()
})


*/
