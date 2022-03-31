// @ts-nocheck

import { FastApi, GET, ABORTED, PREPARE, UwsServer } from '../src'

class MyApi extends FastApi {

  @GET('/some-where')
  myFunc() {
    console.log(`doing the route handling thing`)
    return `Doing the route handling thing`
  }
  @ABORTED('get', '/some-where')
  myFuncOnAborted() {
    console.log(`Just log something`)
  }

  @GET('/some-where-else')
  myOtherFunc() {
    console.log(`this is the other func for other route`)
    return `this is the other func for other route`
  }

  @PREPARE
  anything(...args: any[]) {
    Reflect.apply(super.run, this, args)
  }
}

const app = new UwsServer()
const api = new MyApi(app)

api.anything()
