// we setup a socket server here for testing
// We build this up as close to the original as possible to
// understand more about their inner operation first
import arrayBufferToString from 'arraybuffer-to-string'
import { join } from 'node:path'
import {
  WebSocket,
  RecognizedString,
  HttpResponse,
  HttpRequest,
  us_socket
} from '../../src/types'
import {
  createApp,
  getPort,
  SHARED_COMPRESSOR,
  MAX_PAYLOAD_LENGTH,
  serveStatic,
} from '../../src'
const port = 0
createApp()
  .ws('/*', {
    compression: SHARED_COMPRESSOR,
    maxPayloadLength: MAX_PAYLOAD_LENGTH,
    idleTimeout: 32, // this need to be multiple of 4
    open: (ws: WebSocket) => {
      console.log('A WebSocket connected!', ws)
    },
    message: (ws: WebSocket, message: RecognizedString, isBinary: boolean) => {
      const msg = arrayBufferToString(message)
      console.log('receive:', msg)
      /* Ok is false if backpressure was built up, wait for drain */
      let ok = ws.send(`Robot: ${msg}`, isBinary)
      console.log('ok?', ok)
    },
    drain: (ws: WebSocket) => {
      console.log('WebSocket backpressure: ' + ws.getBufferedAmount())
    },
    close: (_: WebSocket, code: number, message: RecognizedString) => {
      console.log('WebSocket closed', code, message)
    }
  })
  .any('/*', serveStatic(join(__dirname, 'httpdocs')))
  .listen(port, (token: us_socket) => {
    if (token) {
      const _port = getPort(token)
      console.log(`Listening to port:`, _port)
    } else {
      console.log(`Failed to start up!`)
    }
  })
