// testign the bodyParser core
import type { UwsStringPairObj } from '../src/types'
import test from 'ava'
import fetch from 'node-fetch'
import app from './fixtures/server'
import { isJson } from '../src/utils'
import { DEFAULT_HEADERS } from '../src/constants'
const testResultParam = { a: '1', b: '2', c: '3' }
let url = 'http://localhost:'

function getHeaders(headers: UwsStringPairObj) {
  const output = {}
  for (const name in headers) {
    output[name.toLowerCase()] = headers[name]
  }
  return output
}

test.before(() => {
  app.start()
  url = url + app.getPortNum()
})

test.after(() => {
  app.shutdown()
})

test('test the isJson method can understand the jsonql headers', t => {
  // mimic the getHeaders method
  const headers = getHeaders(DEFAULT_HEADERS)
  const res = isJson(headers)
  
  t.true(res)

  t.true(headers['content-type'].indexOf('; ') > -1)
})

test('Testing the GET url param with a jsonql header', async (t) => {

  t.true(app.running)
  const result = await fetch(`${url}/some-end-point?a=1&b=2&c=3`, { headers: DEFAULT_HEADERS })
  const json = await result.json()

  t.deepEqual(json, testResultParam)
})
