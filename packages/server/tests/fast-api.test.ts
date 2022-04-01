// Testing the FastApi
import test from 'ava'
import { FastApi, GET, POST, ABORTED, PREPARE, UwsServer, UwsParsedResult } from '../src'

import Fetch from 'node-fetch'

const msg1 = `doing the route handling thing`
const msg2 = `Here is my own message`

class MyApi extends FastApi {

  @GET('/some-where')
  myFunc() {
    return msg1
  }
  /*
  @ABORTED('get', '/some-where')
  myFuncOnAborted() {
    console.log(`Just log something`)
  } */

  // here we handle the result ourself
  @GET('/custom-handler')
  myCustomFunc(params: UwsParsedResult): void {
    const { res } = params

    res.end(msg2)
  }


  @POST('/submit')
  myPostFunc(params: UwsParsedResult) {
    const json = JSON.parse(params.payload.toString())

    return `${json.name} is doing ${json.value}`
  }

  @PREPARE
  anything(...args: any[]) {
    Reflect.apply(super.run, this, args)
  }
}

let api: MyApi
let app: UwsServer
const port = 30331
const hostname = `http://localhost:${port}`

test.before(() => {
  app = new UwsServer()
  // set the port number here
  app.portNum = port

  api = new MyApi(app)
  // start up
  api.anything()
})

test.after(() => {
  app.shutdown()
})

test(`Testing the class extends from FastApi`, async (t) => {
  t.plan(1)

  const response = await Fetch(`${hostname}/some-where`)
  const text = await response.text()

  t.is(text, msg1)
})

test(`Should able to respond their own custom method`, async (t) => {
  t.plan(1)

  const response = await Fetch(`${hostname}/custom-handler`)
  const text = await response.text()

  t.is(text, msg2)
})


test(`Testing the post method handler`, async (t) => {

  t.plan(1)

  const todo = {name: 'John', value: 'something'}

  return Fetch(`${hostname}/submit`, {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.text())
  .then(text => {

    t.is(text, `John is doing something`)
  })


})