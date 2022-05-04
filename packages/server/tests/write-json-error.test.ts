// reply with a different status
import test from 'ava'
import { createApp, shutdownServer, jsonWriter } from '../src'
import Fetch from 'node-fetch'
import { HttpResponse } from '../dist/types'

const port = 9003
const payload = {data: [1,2,3]}
const reply = { OK: false }

async function throwSomething() {
  throw new Error('something')
}

let listenSocket: any = null
test.before(() => {
  createApp()
    .post('/*', (res: HttpResponse) => {

      throwSomething()
        .catch(() => {
          jsonWriter(res)(reply, 417)
        })
    })
    .listen(port, (token: any) => {
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
  t.plan(2)

  return Fetch(`http://localhost:${port}`, {
      method: 'post',
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
      t.is(res.status, 417)
      return res.json()
    })
    .then(json => {
      t.deepEqual(json, reply)
    })
})
