import test from 'ava'
import { createApp, shutdownServer, readJsonAsync, jsonWriter } from '../dist'
// import Fetch from 'node-fetch'
import { HttpResponse } from '../dist/types'

import { sendJson } from './fixtures/send-json'

const port = 9002
const payload = {data: [1,2,3]}
const reply = {OK: true, l: 0}

let listenSocket: any = null
// clean up otherwise ava throw error
test.after(() => {
  shutdownServer(listenSocket)
})

test(`Testing the readJsonAsync method`, async (t) => {
  t.plan(3)

  createApp()
    .post('/*', async (res: HttpResponse) => {
      const result = await readJsonAsync(res)
      // test (1)
      t.deepEqual(result, payload)
      reply.l = payload.data.length
      jsonWriter(res, {'x-server': 'velocejs'})(reply)
    })
    .listen(port, (token: any) => {
      listenSocket = token
      if (!token) {
        console.log(`Start up server failed on`, port)
      }
    })

  // request
  await sendJson(`http://localhost:${port}`, payload, true)
    .then(({json, headers}) => {
      t.is(json.l , 3)
      t.deepEqual(headers['x-server'], ['velocejs'])
    })
})
