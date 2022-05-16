import {
  FastApi,
  Rest,
  Get,
  Post,
  ServeStatic,
  Websocket,
  arrayBufferToString
} from '@velocejs/fastapi'
import { join } from 'node:path'
import chokidar from 'chokidar'

@Rest
export class DevApi extends FastApi {

  // static folder

  @Get('/simple')
  public simple() {
    return {Hello: 'World'}
  }

  @Get('/update/:id')
  public update(id: string) {
    return {msg: `You send ${id} to fetch update`}
  }

  @Post('/test')
  public testPost(id: number, title: string, content?: string) {

    return {
      id, title, content
    }
  }

  @Websocket('/cheapo-hmr')
  get socketConfig() {
    return {
      open: function(ws: WebSocket) {
        console.log('connected')
        // super simple dev reload server
        chokidar.watch(join(__dirname, 'httpdocs'))
                .on('change', (evt: Event, path: string) => {
                  console.log('file change', evt)
                  ws.send(path)
                })
      },
      message: function(ws: WebSocket, message: ArrayBuffer) {
        ws.send(`Reply from server: ` + arrayBufferToString(message))
      }
    }
  }


  @ServeStatic('/*')
  get httpdocs() {
    return join(__dirname, 'httpdocs')
  }



}
