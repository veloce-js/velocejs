// testing the file upload related methods
import test from 'ava'
import * as fs from 'fs'
import { join } from 'path'
import FormData from 'form-data'

import {
  createApp,
  shutdownApp,
  returnUploadBuffer,
  writeBufferToFile
} from '../src'
import { TemplatedApp, HttpResponse } from 'uWebSockets.js'

let listenSocket: any = null

const port = 9004
const fileName = 'test.txt'
const outFile = './fixtures/tmp/test.txt'

test.before(()=>{
  createApp()
    .post('/upload', async (res: HttpResponse) => {

      console.log('got something')

      const buffer = await returnUploadBuffer(res)
      writeBufferToFile(buffer, outFile)
      res.end('OK')
    })
    .listen(port, (token) => {
      listenSocket = token
    })
})

test.after(()=>{
  shutdownApp(listenSocket)
})

// from https://stackoverflow.com/questions/44021538/how-to-send-a-file-in-request-node-fetch-or-node
async function sendFile() {
  return new Promise((resolver, rejecter) => {
    const form = new FormData()
    const buffer = fs.readFileSync(join(__dirname, 'fixtures', 'test.txt'))
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
  t.plan(1)
  const result = await sendFile()

  console.log('RESPONSE', result)

  t.true(fs.existsSync(outFile))

})
