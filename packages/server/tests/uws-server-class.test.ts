import test from 'ava'
import { UwsServer } from '../src/'
import { HttpResponse } from 'uWebSockets.js'
import Fetch from 'node-fetch'

let app: UwsServer = null

test.before(() => {
  app = new UwsServer()
})

test.after(() => {
  app.shutdown()
})


test(`Should able to create the server and handle request`, async t => {
  // t.plan()
  const msg = `Hello`

  app.onStart = () => {
    console.info(`Try to overload the onStart method`)
  }

  // we run it without assign a port
  app.run([{
    type: 'any',
    path: '/*',
    handler: (res: HttpResponse) => {
      res.end(msg)
    }
  }])
  const port: number = app.getPortNum()

  t.true(port > 0)

  const url = `http://localhost:${port}`
  const response = await Fetch(url)
  const txt = await response.text()

  t.is(txt, msg)

})
