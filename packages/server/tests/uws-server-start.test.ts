// testing the UwsServer start stop methods
import test from 'ava'
import { UwsServer, bodyParser, writeJson } from '../dist'
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

      // res.end(JSON.stringify(result.params))
      writeJson(res, result.params)
    }
  }])
})

test.after(() => {
  app.shutdown()
})

test(`It shouldn't be running if we don't manually call start`, t => {

  t.false(app.running)
})

test(`After we call start then it should able to take request`, async (t) => {
  app.start()

  t.true(app.running)

  const result = await Fetch(`http://localhost:${app.getPortNum()}/thing?value=whatever`)
  const text = await result.json()

  // console.log(text)

  t.deepEqual(text, {value: 'whatever'})

})
