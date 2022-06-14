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
import { ORG_ROUTE_REF } from '../../src'

const app = new UwsServer()
app.autoStart = false
app.run([
  {
    type: 'get',
    path: '/some-path/*', // here is the problem
    handler: async (res: HttpResponse, req: HttpRequest) => {

      res.onAborted(() => {
        console.log(`Connection aborted`)
      })

      const result = await bodyParser(res, req, {
        config: {
          [ORG_ROUTE_REF]: '/some-path/:id(/:optional)'
        }
      })
      // console.log(`got called here`, result)
      const { params } = result
      // we only return the result.params
      jsonWriter(res)(params)
    }
  },
  {
    type: 'any',
    path: '/*',
    handler: async (res: HttpResponse, req: HttpRequest) => {
      res.onAborted(() => {
        console.log(`Connection aborted`)
      })
      const result = await bodyParser(res, req)
      // console.log(`got called here with result --->`, result)
      const payload = (result.method === 'get') ?
        result.queryParams : result.params
      // we only return the result.params
      jsonWriter(res)(payload)
    }
  }
])
// re-export it for use
export default app
