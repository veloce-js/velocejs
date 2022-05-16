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
