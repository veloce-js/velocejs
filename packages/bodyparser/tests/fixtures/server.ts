// test server to send back whatever you send it, with a timestamp
import {
  UwsServer,
  jsonWriter
} from '@velocejs/server'
import {
  HttpResponse,
  HttpRequest
} from '@velocejs/server/index'
import bodyParser from '../../src'

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
