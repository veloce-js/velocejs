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
    type: 'get',
    path: '/some-path/*', // here is the problem
    handler: async (res: HttpResponse, req: HttpRequest) => {
      const result = await bodyParser(res, req, {
        config: {
          originalRouteDef: '/some-path/:id(/:optional)'
        }
      })
      console.log(`got called`, result)
      const { params } = result
      // we only return the result.params
      jsonWriter(res)(params)
    }
  },
  {
    type: 'any',
    path: '/*',
    handler: async (res: HttpResponse, req: HttpRequest) => {
      const result = await bodyParser(res, req)
      // console.log(`got called here --->`, result)
      const payload =  (result.method === 'get') ?
        result.queryParams : result.params
      // we only return the result.params
      jsonWriter(res)(payload)
    }
  }
])
// re-export it for use
export default app
