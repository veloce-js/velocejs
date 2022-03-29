// for developing the bodyParser
import {
  UwsServer,
  bodyParser
} from '../src'
import { HttpRequest, HttpResponse } from 'uWebSockets.js'
import Fetch from 'node-fetch'
const app: UwsServer = new UwsServer()

app.run([
  {
    type: 'get',
    path: '/*',
    handler: async (res: HttpResponse, req: HttpRequest) => {

      res.onAborted(() => {
        console.log(`Aborted? GET`)
      })

      const body = await bodyParser(res, req)
      console.log(body)

      res.end('get')
    }
  },
  {
    type: 'post',
    path: '/*',
    handler: async (res: HttpResponse, req: HttpRequest) => {

      res.onAborted(() => {
        console.log(`Aborted? POST`)
      })

      const body = await bodyParser(res, req)
      console.log(body, body.payload.toString())

      res.end('post')
    }
  },
  {
    type: 'any',
    path: '/*',
    handler: async (res: HttpResponse, req: HttpRequest) => {

      res.onAborted(() => {
        console.log(`Aborted? ANY`)
      })

      const body = await bodyParser(res, req)
      console.log(body)

      res.end('any')
    }
  }
])
