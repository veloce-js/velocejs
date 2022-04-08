// Testing the FastApi
import test from 'ava'
import { UwsServer } from '@velocejs/server/src'
import { HttpResponse,  UwsParsedResult } from '@velocejs/server/src/types'
import { FastApi, Get, Post, Raw, Aborted, Main } from '../dist'

import Fetch from 'node-fetch'

const msg1 = `doing the route handling thing`
const msg2 = `Here is my own message`
const msg3 = `Hello this is completely raw handler`

class MyApi extends FastApi {

  @Get('/some-where')
  myFunc() {
    return msg1
  }
  @Aborted('get', '/some-where')
  myFuncOnAborted() {
    console.log(`Just log something`)
  }

  // here we handle the result ourself
  @Get('/custom-handler')
  myCustomFunc(params: UwsParsedResult): void {
    const { res } = params

    res.end(msg2)
  }


  @Post('/submit')
  myPostFunc(params: UwsParsedResult) {
    // const json = JSON.parse(params.payload.toString())
    // 0.3.1 test the parsed json return
    const { json } = params

    return `${json.name} is doing ${json.value}`
  }


  @Raw('any', '/fall-back-route')
  myFallbackRoute(res: HttpResponse) {

    res.end(msg3)
  }


  @Main
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

test(`Should able to respond with their own custom method`, async (t) => {
  t.plan(1)

  const response = await Fetch(`${hostname}/custom-handler`)
  const text = await response.text()

  t.is(text, msg2)
})


test.only(`Testing the post method handler`, async (t) => {
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

test(`Test the RAW decorator`, async (t) => {
  t.plan(1)

  const response = await Fetch(`${hostname}/fall-back-route`, { method: 'PUT'})
  const text = await response.text()

  t.is(text, msg3)

})
