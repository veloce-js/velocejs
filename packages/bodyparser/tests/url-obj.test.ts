import test from 'ava'
import fetch from 'node-fetch'
import server from './fixtures/two-routes'

let url = 'http://localhost:'

test.before(() => {
  server.start()
  url = url + server.getPortNum()
  // console.log(`server started on ${url}`)
})

test.after(() => {
  server.shutdown()
})

test(`First test the normal get route with query params`, async t => {
  t.plan(1)
  const res = await fetch(`${url}/standard-get-route?a=1&b=2&_cb=${Date.now()}`)
  const json = await res.json()
  t.deepEqual(json, {a: '1', b: '2'})
})

test(`Second test with a dynamic route`, async t => {
  t.plan(1)
  const res = await fetch(`${url}/dynamic/1001/y`)
  const json = await res.json()
  t.deepEqual(json, {key1: '1001', key2: 'y', names: ['key1','key2']})
})
