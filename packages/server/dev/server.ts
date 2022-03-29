// for developing the bodyParser
import { UwsServer, bodyParser } from '../src'
import { HttpRequest, HttpResponse } from 'uWebSockets.js'

const app: UwsServer = new UwsServer()

app.run([
  {
    type: 'get',
    path: '/',
    handler: 'static'
  },
  {
    type: 'get',
    path: '/*',
    handler: async function(res: HttpResponse, req: HttpRequest) {
      const body = await bodyParser(res, req)
      console.log(body)

      res.end('get')
    }
  },
  {
    type: 'post',
    path: '/*',
    handler: async function(res: HttpResponse, req: HttpRequest) {
      const body = await bodyParser(res, req)
      console.log(body)

      res.end('post')
    }
  },
  {
    type: 'any',
    path: '/*',
    handler: async function(res: HttpResponse, req: HttpRequest) {
      const body = await bodyParser(res, req)
      console.log(body)

      res.end('any')
    }
  }
])
