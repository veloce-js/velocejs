import test from 'ava'
import { UwsServer, bodyParser } from '../src'
import { HttpResponse, HttpRequest } from '../src/types'
import Fetch from 'node-fetch'

let app: UwsServer = null

test.before(() => {
  app = new UwsServer()
  // set a hostname
  app.hostName = '0.0.0.0'
})

test.after(() => {
  app.shutdown()
})

test(`Should able to create the server and handle request with hostname`, async t => {
  t.plan(3)

  const msg = `Hello with hostname`

  app.onStart = () => {
    console.info(`Try to overload the onStart method`)
  }

  // we run it without assign a port
  app.run([{
    type: 'any',
    path: '/*',
    handler: async (res: HttpResponse, req: HttpRequest) => {

      const result = await bodyParser(res, req)
      t.is(result.method, 'get')

      res.end(msg)
    }
  }])
  const port: number = app.getPortNum()

  t.true(port > 0)

  const url = `http://${app.hostName}:${port}`
  const response = await Fetch(url)
  const txt = await response.text()

  t.is(txt, msg)

})

test(`Should throw error if the route is not in the support list with hostname`, t => {
  const app1 = new UwsServer()
  const error = t.throws(() => {
    app1.run([{type: 'delete', path: '/delete', handler: () => {}}])
  }, {instanceOf: Error})

  t.truthy(error.message.indexOf('not support'))

})
