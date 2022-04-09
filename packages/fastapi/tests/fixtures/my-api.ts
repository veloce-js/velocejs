// setup a dummy API for test

import { HttpResponse,  UwsParsedResult } from '@velocejs/server/src/types'
import { FastApi, Get, Post, Raw, Aborted, Main } from '../../src'

export const msg1 = `doing the route handling thing`
export const msg2 = `Here is my own message`
export const msg3 = `Hello this is completely raw handler`

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
  myCustomFunc( /* params: UwsParsedResult */ ): void {

    this.res.end(msg2)
  }


  @Post('/submit')
  myPostFunc(params: UwsParsedResult) {
    // console.log('hanlder got call with', params)
    return {msg: `${params.name} is doing ${params.value}`}
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
