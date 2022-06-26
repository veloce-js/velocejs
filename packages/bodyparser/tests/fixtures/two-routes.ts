// set up a new server to test out the dynamic route and normal route
import {
  UwsServer,
  jsonWriter
} from '@velocejs/server'
import {
  HttpResponse,
  HttpRequest
} from '@velocejs/server/index'
import {
  bodyParser,
  UrlPattern,
  URL_PATTERN_OBJ,
  QUERY_PARAM
} from '../../src'

const app = new UwsServer()
app.autoStart = false
app.run([
  {
    type: 'get',
    path: '/standard-get-route',
    handler: async (res: HttpResponse, req: HttpRequest) => {
      res.onAborted(() => {
        console.log(`Connection aborted`)
      })
      const result = await bodyParser(res, req)
      jsonWriter(res)(result[QUERY_PARAM])
    }
  },
  {
    type: 'get',
    path: '/dynamic/*',
    handler: async (res: HttpResponse, req: HttpRequest) => {
      res.onAborted(() => {
        console.log(`Connection aborted`)
      })
      const obj = new UrlPattern('/dynamic/:key1/:key2')
      const result = await bodyParser(res, req, {
        config: {
          [URL_PATTERN_OBJ]: obj
        }
      })
      const json = result.params
      json.names = obj.names
      jsonWriter(res)(json)
    }
  }
])

export default app
