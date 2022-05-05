// setup a dummy API for test

import { HttpResponse } from '@velocejs/server/src/types'
import { FastApi, Get, Post, Raw, Aborted, Rest } from '../../src'

export const msg1 = `doing the route handling thing`
export const msg2 = `Here is my own message`
export const msg3 = `Hello this is completely raw handler`

@Rest
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
  myCustomFunc(): void {

    this.res.end(msg2)
  }

  @Post('/submit')
  myPostFunc(name: string, value: string) {

    console.log('myPostFunc', name, value)

    // console.log('hanlder got call with', params)
    return {msg: `${name} is doing ${value}`}
  }

  @Raw('any', '/fall-back-route')
  myFallbackRoute(res: HttpResponse) {

    res.end(msg3)
  }
}
