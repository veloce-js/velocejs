// testing the file upload related methods
import test from 'ava'
import {
  createApp,
  shutdownApp,
  returnUploadBuffer,
  writeBufferToFile
} from '../src'
import { TemplatedApp, HttpResponse } from 'uWebSockets.js'
import Fetch from 'node-fetch'

const port = 9004
let app: TemplatedApp
let listenSocket: any = null

test.before(()=>{
  app = createApp()
})

test.after(()=>{
  shutdownApp(listenSocket)
})

test.todo(`should able to capture the uploaded file and write to dist`)
