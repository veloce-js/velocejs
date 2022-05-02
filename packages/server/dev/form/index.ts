// form
import {
  bodyParser,
  createApp,
  // shutdownServer,
  serveStatic,
  getPort,
} from '../../dist'
import {
  HttpRequest,
  HttpResponse,
} from '../../src/types'
import { join } from 'path'

let listenSocket

createApp()
  .any('/*', serveStatic(join(__dirname, 'httpdocs')))
  .post('/upload', async (res: HttpResponse, req: HttpRequest) => {
      const result = await bodyParser(res, req)
      console.log(result)
      res.end('OK')
  })
  .listen(0, (token: any) => {
    console.log(getPort(token))
  })
