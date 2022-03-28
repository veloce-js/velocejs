import test from 'ava'
import UwsServer from '../src/'
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
  t.plan(2)
  const msg = `Hello`
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

  const response = await Fetch(`http://localhost:${port}`)
  const txt = await response.text()

  t.is(txt, msg)
  
})
