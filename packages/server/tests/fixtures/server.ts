// test server to send back whatever you send it, with a timestamp
import {
  bodyParser,
  UwsServer,
  writeJson
} from '../../dist'
import {
  HttpResponse,
  HttpRequest
} from '../../'

const app = new UwsServer()

app.run([
  {
    type: 'any',
    path: '/*',
    handler: async (res: HttpResponse, req: HttpRequest) => {
      const result = await bodyParser(res, req)
      const { params } = result
      // we only return the result.params
      writeJson(res, params)
    }
  }
])
// re-export it for use
export default app
