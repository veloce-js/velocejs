// testing the file upload related methods
import test from 'ava'
import * as fs from 'fs'
import { join } from 'path'
// import FormData from 'form-data'
import rimraf from 'rimraf'
import { sendFile } from './fixtures/send-file'
import {
  createApp,
  shutdownServer,
  writeBufferToFile
} from '@velocejs/server'
import { uploadHandler } from '../src'
import { HttpResponse } from '../dist/types'

let listenSocket: any = null

const port = 9004
// const fileName = 'test.txt'
const outFile = join(__dirname, 'fixtures', 'tmp', 'test.txt')

test.before(()=>{
  createApp()
    .post('/upload', async (res: HttpResponse) => {

      uploadHandler(
        res,
        buffer => {
          writeBufferToFile(buffer, outFile)
        },
        () => console.log(`Server aborted!`)
      )
      res.end('OK')
    })
    .listen(port, (token: any) => {
      listenSocket = token
    })
})

test.after(()=>{
  rimraf(outFile, () => {})
  shutdownServer(listenSocket)
})


test(`should able to capture the uploaded file and write to dist`, async (t) => {
  t.plan(2)
  const response = await sendFile(
    `http://localhost:${port}/upload`,
    join(__dirname, 'fixtures', 'test.txt')
  )
  const result = await response.text()
  // console.log('RESPONSE', result)
  t.truthy(result)
  
  t.true(fs.existsSync(outFile))
})
