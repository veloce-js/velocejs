// Testing the FastApi with jsonql content wrapping
import test from 'ava'
import Fetch from 'node-fetch'
import { assign } from '@jsonql/utils'
import { DEFAULT_HEADER, CLIENT_KEY, CLIENT_NAME } from '../src/lib/constants'
// import { ValidatorFactory } from '@jsonql/validator'
import { MyApi, msg1, msg2, msg3 } from './fixtures/my-api'
// tmp
declare type JsonqlStruct = { data: any, error: any, meta: any }

// custom fetch
async function fetchClient(url: string, options?: any) {
  const headers = assign(
    DEFAULT_HEADER,
    { [CLIENT_KEY]: CLIENT_NAME }
  )
  const config = { headers }

  return await Fetch(url, assign({}, config, options || {}))
}

let api: MyApi
let hostname: string

test.before(async () => {
  api = new MyApi()
  // start up
  hostname = await api.$start()
  //console.log('start up info', info)
})

test.after(() => {
  api.$stop()
})

test(`Testing the class extends from FastApi`, async (t) => {
  t.plan(1)
  const response = await fetchClient(`${hostname}/some-where`)
  // console.log('HEADERS',  response.headers)
  const json = await response.json() as JsonqlStruct
  t.is(json.data, msg1)
})

test(`Testing the post method handler`, async (t) => {
  t.plan(1)
  const todo = {name: 'John', value: 'something'}
  const endpoint = `${hostname}/submit`

  await fetchClient(endpoint, {
    method: 'POST',
    body: JSON.stringify(todo),
  })
  .then(res => {
    return res.json() as unknown as JsonqlStruct
  })
  .then(text => {
    t.deepEqual(text.data, {msg: `John is doing something`})
  })
})
