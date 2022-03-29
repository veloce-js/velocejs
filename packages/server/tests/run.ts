// this is not part of the test but just testing the server setup

// import uWS from 'uWebSockets.js'
import {
  createApp,
  shutdownServer,
  getPort,
  handleUpload,
  writeBufferToFile
} from '../src'

import { HttpResponse, HttpRequest } from 'uWebSockets.js'
// import Fetch from 'node-fetch'
import { sendFile } from './fixtures/send-file'
import { join } from 'path'
import rimraf from 'rimraf'

let connectedSocket: any
let port: number
let serverUrl: string
// const fileName = 'test.txt'
const outFile = join(__dirname, 'fixtures', 'tmp', 'test.txt')

createApp()
  .any('/*', async (res: HttpResponse, req: HttpRequest) => {
    const url = req.getUrl()

    console.log(`Calling ${url}\n`)
    req.forEach((k, v) => {
      console.log(`${k} = ${v}\n`)
    })

    if (url === '/upload') {
      handleUpload(
        res,
        (buffer) => {
          if (writeBufferToFile(buffer, outFile)) {
            console.log(`Got an upload`, buffer.toString())
          } else {
            console.error(`Failed to create file`)
          }
          res.end(`done`)
        },
        () => {
          console.log(`Server aborted`)
        }
      )
    } else {
      res.end('Hello')
    }
  })
  .listen(0, async (token: any) => {
    if (token) {
      connectedSocket = token
      port = getPort(token)
      serverUrl = `http://localhost:${port}`
      console.log(`Server is running on ${serverUrl}`)
      // const response = await Fetch(serverUrl)
      // const txt = await response.text()
      // console.log(port, txt)
    }
  })

setTimeout(async () => {
  await sendFile(
    serverUrl + '/upload',
    join(__dirname, 'fixtures', 'test.txt')
  )
},600)

setTimeout(() => {
  console.log(`shutdown now`)
  rimraf(outFile, () => console.log(`file remove`))
  shutdownServer(connectedSocket)
},2000)
