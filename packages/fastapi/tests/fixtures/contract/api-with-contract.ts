import { FastApi, Rest, Get, Post, ServeStatic, Websocket } from '../../../src'
import { join } from 'node:path'

@Rest
export class ApiWithContract extends FastApi {

  @Get('/news')
  news() {
    return "some news"
  }

  @Post('/post')
  post(title: string, content: string, date: number = Date.now()) {
    return {
      title,
      content,
      date
    }
  }

  // testing the dynamic route with spread
  // also the converter
  @Get('/archive/:year/:month/:day')
  archive(...dates: number[]) {
    this.$text(dates.join('-'))
  }

  @Get('/not-here-route', { excluded: true })
  youDontSeeMeOnContract() {
    return 'you shouldnt able to see me in the contract'
  }

  @ServeStatic('/*')
  get httpdocs() {
    return join(__dirname, 'httpdocs')
  }

  @Websocket('/realtime')
  get socket() {
    return {
      open: function(ws: WebSocket) {
        ws.send('Hello World')
      }
    }
  }

}
