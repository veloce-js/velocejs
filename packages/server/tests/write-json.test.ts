import test from 'ava'
import { createServer, shutdownServer, writeJson } from '../src/index'
import Fetch from 'node-fetch'
import { HttpResponse } from 'uWebSockets.js'

const port = 9003
const payload = {data: [1,2,3]}
const reply = {OK: true}

let listenSocket: any = null
test.before(() => {
  createServer()
    .post('/*', async (res: HttpResponse) => {
      // const result = await readJsonAsync(res)
      writeJson(res, reply)
    })
    .listen(port, token => {
      listenSocket = token
      if (!token) {
        console.log(`Start up server failed on`, port)
      }
    })
})
// clean up otherwise ava throw error
test.after(() => {
  shutdownServer(listenSocket)
})

test(`Testing the writeJson method`, async (t) => {
  t.plan(1)

  const response = await Fetch(`http://localhost:${port}`, {
      method: 'post',
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'}
    })
  const json = await response.json()

  t.deepEqual(json, reply)
})
