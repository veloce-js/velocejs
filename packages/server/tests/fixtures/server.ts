// test server to send back whatever you send it, with a timestamp
import {
  bodyParser,
  UwsServer,
  jsonWriter
} from '../../dist'
import {
  HttpResponse,
  HttpRequest
} from '../../'

const app = new UwsServer()
app.autoStart = false
app.run([
  {
    type: 'any',
    path: '/*',
    handler: async (res: HttpResponse, req: HttpRequest) => {
      const result = await bodyParser(res, req)
      // console.log(`got called`, result)
      const { params } = result
      // we only return the result.params
      jsonWriter(res)(params)
    }
  }
])
// re-export it for use
export default app
