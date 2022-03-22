// testing the file upload related methods
import test from 'ava'
import * as fs from 'fs'
// import { join } from 'path'
import FormData from 'form-data'

import {
  createApp,
  shutdownApp,
  returnUploadBuffer,
  writeBufferToFile
} from '../src'
import { TemplatedApp, HttpResponse } from 'uWebSockets.js'


const port = 9004
let app: TemplatedApp
let listenSocket: any = null
const fileName = 'test.txt'
const outFile = './fixtures/tmp/test.txt'

test.before(()=>{
  app = createApp()
})

test.after(()=>{
  shutdownApp(listenSocket)
})

// from https://stackoverflow.com/questions/44021538/how-to-send-a-file-in-request-node-fetch-or-node
async function sendFile() {
  return new Promise((resolver, rejecter) => {
    const form = new FormData()
    const buffer = fs.readFileSync('./fixtures/test.txt')
    form.append('file', buffer, {
      contentType: 'text/plain',
      name: 'file',
      filename: fileName,
    })
    form.submit({
      host: `http://localhost:${port}`,
      path: '/upload'
    }, function(err, res) {
      if (err) {
        return rejecter(err)
      }
      resolver(res)
    })
  })
}

test(`should able to capture the uploaded file and write to dist`, async (t) => {
  app
    .post('/upload', async (res: HttpResponse) => {
      const buffer = await returnUploadBuffer(res)
      writeBufferToFile(buffer, outFile)

      t.true(fs.existsSync(outFile))

      res.end('OK')
    })

})
