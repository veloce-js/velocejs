// this is not part of the test but just testing the server setup

// import uWS from 'uWebSockets.js'
import {
  createServer,
  shutdownServer,
  getPort,
  handleUpload,
  writeBufferToFile
} from '../src'

import { HttpResponse, HttpRequest } from 'uWebSockets.js'
import Fetch from 'node-fetch'
import { sendFile } from './fixtures/send-file'
import { join } from 'path'

let connectedSocket: any
let port: number
let serverUrl: string
const fileName = 'test.txt'
const outFile = './fixtures/tmp/test.txt'

createServer()
  .any('/*', async (res: HttpResponse, req: HttpRequest) => {
    const url = req.getUrl()

    console.log(`Calling ${url}\n`)
    req.forEach((k, v) => {
      res.write(k)
      res.write(' = ')
      res.write(v)
      res.write("\n")
    })


    if (url === '/upload') {
      const buffer = await returnUploadBuffer(res)
      console.log(`Got a file`, buffer.toString())
    }

    res.end('Hello')
  })
  .listen(0, async (token) => {
    if (token) {

      connectedSocket = token

      port = getPort(token)
      serverUrl = `http://localhost:${port}`
      const response = await Fetch(serverUrl)
      const txt = await response.text()

      console.log(port, txt)
    }
  })



setTimeout(async () => {
  await sendFile(
    serverUrl + '/upload',
    join(__dirname, 'fixtures', 'test.txt'),
    'text/plain'
  )
},600)

/*
setTimeout(() => {
  console.log(`shutdown now`)
  shutdownServer(connectedSocket)
},2000)
*/
