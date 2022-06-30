// testing the UwsServer start stop methods
import test from 'ava'
import { UwsServer, jsonWriter } from '@velocejs/server'
import { bodyParser } from '../src'
import { HttpResponse, HttpRequest } from '../dist/types'
import Fetch from 'node-fetch'

const app = new UwsServer()
app.autoStart = false

test.before(() => {
  app.run([{
    type: 'get',
    path: '/*',
    handler: async (res: HttpResponse, req: HttpRequest) => {
      const result = await bodyParser(res, req)
      // console.log(result)
      jsonWriter(res)(result.queryParams)
    }
  }])
})

test.after(() => {
  app.shutdown()
})

test.serial(`It shouldn't be running if we don't manually call start`, t => {
  t.false(app.running)
})

test.serial(`After we call start then it should able to take request`, async (t) => {
  t.plan(2)
  return new Promise(resolve => {
    app.start()
    t.true(app.running)
    Fetch(`http://localhost:${app.getPortNum()}/thing?value=whatever`)
      .then(res => res.json())
      .then(text => {
        t.deepEqual(text, {value: 'whatever'})
        resolve()
      })
  })

})
