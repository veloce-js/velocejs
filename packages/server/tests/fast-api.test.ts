// Testing the FastApi
import test from 'ava'
import { FastApi, GET, ABORTED, PREPARE, UwsServer } from '../src'
import Fetch from 'node-fetch'

const msg1 = `doing the route handling thing`

// @ts-nocheck
class MyApi extends FastApi {

  @GET('/some-where')
  myFunc() {
    return msg1
  }
  /*
  @ABORTED('get', '/some-where')
  myFuncOnAborted() {
    console.log(`Just log something`)
  }
  */

  @PREPARE
  anything(...args: any[]) {
    Reflect.apply(super.run, this, args)
  }
}

let api: MyApi
let app: UwsServer
const port = 30331

test.before(() => {
  app = new UwsServer()
  // set the port number here
  app.portNum = port

  api = new MyApi(app)
})

test.after(() => {
  app.shutdown()
})

test(`Testing the class extends from FastApi`, async (t) => {
  t.plan(1)
  // start up
  api.anything()

  const response = await Fetch(`http://localhost:${port}/some-where`)
  const text = await response.text()

  t.is(text, msg1)
})
