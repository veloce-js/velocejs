import test from 'ava'
import WebSocketClient from 'ws'
import { UwsServer } from '../src'
import { arrayBufferToString } from '../src/lib/files'
import { port, runSocketSrv } from './fixtures/socket-server-setup'

let client: WebSocketClient
let api: UwsServer
const url = `ws://localhost:${port}`
test.before(() => {
  api = runSocketSrv()
  api.start()

  client = new WebSocketClient(url)
})

test.after(() => {
  api.shutdown()
})

// due to this moron from ava.js that remove the cb
test(`Testing the websocket setup`, async t => {
  t.plan(1)
  return new Promise((resolver) => {
    client.on('open', function open() {
      t.pass()
      resolver()
    })
  })
})

test(`Test to see if we get a message`, async t => {
  t.plan(1)
  return new Promise(resolver => {
    client.on('message', function message(msg) {
      t.is(arrayBufferToString(msg), 'Hello world')
      resolver()
    })
  })
})
