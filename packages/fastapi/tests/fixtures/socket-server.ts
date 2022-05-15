import { FastApi, Rest, ServeStatic, Websocket } from '../../src'
import { WebSocket } from '@velocejs/server/index'
import { arrayBufferToString } from '@velocejs/server'
import { join } from 'node:path'
// main
@Rest
export class WebsocketServer extends FastApi {

  @Websocket('/realtime/*')
  get realtime() {
    return {
      open: function(ws: WebSocket) {
        ws.send('Hello')
      },
      message: function(ws: WebSocket, message: ArrayBuffer) {
        const msg = arrayBufferToString(message)
        ws.send(`Got your message: ${msg}`)
      }
    }
  }

  @ServeStatic('/*')
  get httpdocs() {
    return join(__dirname, 'httpdocs')
  }
}
