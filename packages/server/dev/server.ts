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
      const body = await bodyParser(res, req)
      console.log(body)

      res.end('get')
    }
  },
  {
    type: 'post',
    path: '/*',
    handler: async (res: HttpResponse, req: HttpRequest) => {
      const body = await bodyParser(res, req)
      console.log(body)

      res.end('post')
    }
  },
  {
    type: 'any',
    path: '/*',
    handler: async (res: HttpResponse, req: HttpRequest) => {
      const body = await bodyParser(res, req)
      console.log(body)

      res.end('any')
    }
  }
])

setTimeout(async () => {
  const res = await Fetch(`http://localhost:${process.env.PORT}/hello`)
  const text = await res.text()

  console.log(text)

}, 500)
