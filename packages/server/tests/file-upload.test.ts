// testing the file upload related methods
import test from 'ava'
import * as fs from 'fs'
import { join } from 'path'
import FormData from 'form-data'
import { sendFile } from './fixtures/send-file'
import {
  createServer,
  shutdownServer,
  handleUpload,
  writeBufferToFile
} from '../src'
import { TemplatedApp, HttpResponse } from 'uWebSockets.js'

let listenSocket: any = null

const port = 9004
const fileName = 'test.txt'
const outFile = './fixtures/tmp/test.txt'

test.before(()=>{
  createServer()
    .post('/upload', async (res: HttpResponse) => {

      handleUpload(
        res,
        buffer => {
          writeBufferToFile(buffer, outFile)
        },
        () => console.log(`Server aborted!`)
      )

      res.end('OK')
    })
    .listen(port, (token) => {
      listenSocket = token
    })
})

test.after(()=>{
  shutdownServer(listenSocket)
})



test(`should able to capture the uploaded file and write to dist`, async (t) => {
  t.plan(1)
  const result = await sendFile()

  console.log('RESPONSE', result)

  t.true(fs.existsSync(outFile))

})
