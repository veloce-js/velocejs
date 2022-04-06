import test from 'ava'
import { createApp, shutdownServer } from '../dist'
import { TemplatedApp, HttpResponse } from '../dist/types'
import Fetch from 'node-fetch'

let app: TemplatedApp
const port = 9001
const msg = `Hello`
let listenSocket: any = null

test.before(() => {
  app = createApp()
})
// clean up
test.after(() => {
  shutdownServer(listenSocket)
})

test(`testing the createApp method`, async (t) => {
  t.plan(2)
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
