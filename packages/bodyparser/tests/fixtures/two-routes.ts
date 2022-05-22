// set up a new server to test out the dynamic route and normal route
import {
  UwsServer,
  jsonWriter
} from '@velocejs/server'
import {
  HttpResponse,
  HttpRequest
} from '@velocejs/server/index'
import bodyParser, {
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
      const result = await bodyParser(res, req)
      jsonWriter(res)(result[QUERY_PARAM])
    }
  },
  {
    type: 'get',
    path: '/dynamic/*',
    handler: async (res: HttpResponse, req: HttpRequest) => {
      const obj = new UrlPattern('/dynamic/:key1/:key2')
      const result = await bodyParser(res, req, {
        config: {
          [URL_PATTERN_OBJ]: obj
        }
      })
      jsonWriter(res)(result.params)
    }
  }
])

export default app
