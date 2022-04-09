import test from 'ava'
import { createApp, shutdownServer, readJsonAsync, writeJson } from '../dist'
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
  t.plan(2)

  createApp()
    .post('/*', async (res: HttpResponse) => {
      const result = await readJsonAsync(res)
      // test (1)
      t.deepEqual(result, payload)

      reply.l = payload.data.length

      writeJson(res, reply)
    })
    .listen(port, (token: any) => {
      listenSocket = token
      if (!token) {
        console.log(`Start up server failed on`, port)
      }
    })

  // request
  await sendJson(`http://localhost:${port}`, payload)
    .then(res => res.json())
    .then(json => {
      t.is(json.l , 3)
    })
})
