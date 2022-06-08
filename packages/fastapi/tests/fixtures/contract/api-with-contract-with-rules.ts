import { FastApi, Rest, Get, Post, ServeStatic, Websocket, Validate } from '../../../src'
import { join } from 'node:path'
// @NOTE something weird the Date.now() inline never create a value that pass to generator
const NOW = Date.now()

@Rest
export class ApiWithContract extends FastApi {

  @Get('/news')
  news() {
    return "some news"
  }
  // @NOTE because we read this script and parse as ast
  // therefore the NOW is a string and not the value we expected!
  @Post('/post')
  @Validate({
    date: { plugin: 'moreThan', num: 1000}
  })
  post(title: string, content: string, date = 1000) {
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
