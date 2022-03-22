import test from 'ava'
import { createApp } from '../src/index'
import { TemplatedApp, HttpResponse } from 'uWebSockets.js'
import Fetch from 'node-fetch'

let app: TemplatedApp
const port = 9001
const msg = `Hello`

test.before(() => {
  app = createApp()
})

test(`testing the createApp method`, t => {
  t.plan(1)
  app.get('/*', (res: HttpResponse) => {
    res.end(msg)
  }).listen(port, async (token) => {
    if (token) {
      t.truthy(token, `When the app init and we should able to get a token back`)
    }
  })
})

test(`Testing the connection`, async t => {
  // If I call this in the listen then it never run
  const res = await Fetch(`http://localhost:${port}`)
  const body = await res.text()

  t.is(body, msg)
})
