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
    handler: function(res: HttpResponse, req: HttpRequest) {

    }
  },
  {
    type: 'post',
    path: '/*',
    handler: function(res: HttpResponse, req: HttpRequest) {

    }
  },
  {
    type: 'any',
    path: '/*',
    handler: function(res: HttpResponse, req: HttpRequest) {

    }
  }
])
