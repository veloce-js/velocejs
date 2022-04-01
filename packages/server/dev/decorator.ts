// @ts-nocheck

import {
  FastApi,
  GET,
  POST,
  ABORTED,
  PREPARE,
  UwsServer,
  UwsParsedResult,
  RouteMetaInfo
} from '../src'

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

  @POST('/some-where-else')
  myOtherFunc(params: UwsParsedResult) {
    console.log(`this is the other func for other route`, params)

    return `this is the other func for other route`
  }

  @PREPARE
  anything(...args: RouteMetaInfo[]) {
    Reflect.apply(super.run, this, args)
  }
}

const app = new UwsServer()
const api = new MyApi(app)

api.anything()
