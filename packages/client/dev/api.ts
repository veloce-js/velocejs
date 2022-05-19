import {
  FastApi,
  Rest,
  Get,
  Post,
  ServeStatic,
  Websocket,
  arrayBufferToString
} from '@velocejs/fastapi'
import type {
  WebSocket
} from '@velocejs/server/index'
import { join } from 'node:path'
import chokidar from 'chokidar'

@Rest
export class DevApi extends FastApi {

  // static folder
  @Get('/simple')
  public simple() {

    this.$json({ Hello: 'World' })
  }

  @Get('/update/:id')
  public update(id: string) {

    this.$json({ msg: `You send ${id} to fetch update` })
  }

  @Post('/test')
  public testPost(id: number, title: string, content?: string) {

    this.$json({
      id, title, content
    })
  }

  @Websocket('/cheapo-hmr')
  get socketConfig() {

    return {
      open: function(ws: WebSocket) {
        // test out the pub sub
        // ws.subscribe('hmr/file-change') //nothing happens

        // super simple dev reload server
        chokidar.watch(join(__dirname, 'httpdocs'))
                .on('change', (path: string /*, evt: Event */) => {
                  console.log('file change')
                  ws.send(path)
                })
      },
      message: function(ws: WebSocket, message: ArrayBuffer) {
        ws.send(`Reply from server: ` + arrayBufferToString(message))
      },
      close: function() {
        console.log('connection closed???')
      }
    }
  }

  @ServeStatic('/*')
  get httpdocs() {
    return join(__dirname, 'httpdocs')
  }
}
