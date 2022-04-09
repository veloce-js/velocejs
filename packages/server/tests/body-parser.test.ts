// testign the bodyParser core
import test from 'ava'
import fetch from 'node-fetch'
import app from './fixtures/server'
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

test(`Testing the json`, async (t) => {

  

})

/*
test.skip('Testing the POST param', t => {
  t.pass()
})


*/
