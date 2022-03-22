import test from 'ava'
import uWS, { createApp, readJsonAsync, writeJson } from '../src/index'
import Fetch from 'node-fetch'
import { HttpResponse } from 'uWebSockets.js'

const port = 9002
const payload = {data: [1,2,3]}
const reply = {OK: true}

let listenSocket: any = null
// clean up otherwise ava throw error 
test.after(() => {
  uWS.us_listen_socket_close(listenSocket)
})

test(`Testing the readJsonAsync method`, async (t) => {
  t.plan(2)
  createApp()
    .post('/*', async (res: HttpResponse) => {
      const result = await readJsonAsync(res)
      // test (1)
      t.deepEqual(result, payload)
      writeJson(res, reply)
    })
    .listen(port, token => {
      listenSocket = token
      if (!token) {
        console.log(`Start up server failed on`, port)
      }
    })

    const response = await Fetch(`http://localhost:${port}`, {
        method: 'post',
	      body: JSON.stringify(payload),
	      headers: {'Content-Type': 'application/json'}
      })
    const jsonReply = response.json()
    // test (2)
    t.deepEqual(jsonReply, reply)

})
