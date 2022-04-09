// setup a dummy API for test

import { HttpResponse,  UwsParsedResult } from '@velocejs/server/src/types'
import { FastApi, Get, Post, Raw, Aborted, Main } from '../../src'

export class MyApi extends FastApi {

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
  myPostFunc(result: UwsParsedResult) {
    // const json = JSON.parse(params.payload.toString())
    // 0.3.1 test the parsed json return
    const { params } = result

    return `${params.name} is doing ${params.value}`
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
