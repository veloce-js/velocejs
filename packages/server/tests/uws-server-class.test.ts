import test from 'ava'
import { UwsServer } from '../dist'
import { HttpResponse, HttpRequest } from '../dist/types'

import Fetch from 'node-fetch'

let app: UwsServer = null

test.before(() => {
  app = new UwsServer()
})

test.after(() => {
  app.shutdown()
})

test(`Should able to create the server and handle request`, async t => {
  t.plan(3)

  const msg = `Hello`

  app.onStart = () => {
    if (process.env.DEBUG) {
      console.info(`Try to overload the onStart method`)
    }
  }

  // we run it without assign a port
  app.run([{
    type: 'any',
    path: '/*',
    handler: async (res: HttpResponse, req: HttpRequest) => {

      t.is( req.getMethod(), 'get')

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

test(`Should throw error if the route is not in the support list`, t => {
  const app1 = new UwsServer()
  const error = t.throws(() => {
    app1.run([{type: 'delete', path: '/delete', handler: () => {}}])
  }, {instanceOf: Error})

  t.truthy(error.message.indexOf('not support'))

})
