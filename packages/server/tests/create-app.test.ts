import test from 'ava'
import { createServer,shutdownServer } from '../src'
import { TemplatedApp, HttpResponse } from 'uWebSockets.js'
import Fetch from 'node-fetch'

let app: TemplatedApp
const port = 9001
const msg = `Hello`
let listenSocket: any = null

test.before(() => {
  app = createServer()
})
// clean up
test.after(() => {
  shutdownServer(listenSocket)
})

test(`testing the createServer method`, async (t) => {
  t.plan(1)
  app.get('/*', (res: HttpResponse) => {
    res.end(msg)
  }).listen(port, async (token) => {
    listenSocket = token
    if (token) {
      t.truthy(token, `When the app init and we should able to get a token back`)
    }
  })

  // If I call this in the listen then it never run
  const res = await Fetch(`http://localhost:${port}`)
  const body = await res.text()

  t.is(body, msg)

})
