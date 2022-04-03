import test from 'ava'
import { createApp, shutdownServer, readJsonAsync, writeJson } from '../src'
import Fetch from 'node-fetch'
import { HttpResponse } from '../src/types'

const port = 9002
const payload = {data: [1,2,3]}
const reply = {OK: true}

let listenSocket: any = null
// clean up otherwise ava throw error
test.after(() => {
  shutdownServer(listenSocket)
})

test(`Testing the readJsonAsync method`, async (t) => {
  t.plan(1)

  createApp()
    .post('/*', async (res: HttpResponse) => {
      const result = await readJsonAsync(res)
      // test (1)
      t.deepEqual(result, payload)
      writeJson(res, reply)
    })
    .listen(port, (token: any) => {
      listenSocket = token
      if (!token) {
        console.log(`Start up server failed on`, port)
      }
    })
  await Fetch(`http://localhost:${port}`, {
    method: 'post',
    body: JSON.stringify(payload),
    headers: {'Content-Type': 'application/json'}
  })
})
