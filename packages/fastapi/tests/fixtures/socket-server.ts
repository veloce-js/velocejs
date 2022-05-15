import { FastApi, Rest, ServeStatic, Websocket } from '../../src'
import { WebSocket } from '@velocejs/server/index'
import { arrayBufferToString } from '@velocejs/server'
import { join } from 'node:path'

let count = 0

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
        ++count
        ws.send(`Got your message: ${msg} ${count}`)
        console.log(`${msg} ${count}`)
      },
      close: (_: WebSocket, code: number) => {
        console.log('connection is closed', code)
      }
    }
  }

  @ServeStatic('/*')
  get httpdocs() {
    return join(__dirname, 'httpdocs')
  }
}
