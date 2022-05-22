// test server to send back whatever you send it, with a timestamp
import {
  UwsServer,
  jsonWriter
} from '../../dist'
import {
  HttpResponse,
  HttpRequest
} from '../../index'
import bodyParser from '@velocejs/bodyparser'

const app = new UwsServer()
app.autoStart = false
app.run([
  {
    type: 'any',
    path: '/*',
    handler: async (res: HttpResponse, req: HttpRequest) => {
      const result = await bodyParser(res, req)
      // console.log(`got called`, result)
      const payload = result.method === 'get' ? result.queryParams : result.params
      // we only return the result.params
      jsonWriter(res)(payload)
    }
  }
])
// re-export it for use
export default app
