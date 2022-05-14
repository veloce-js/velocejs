// PubSub server test @TODO
import { arrayBufferToString } from '../../src/lib/files'
import { join } from 'node:path'
import {
  WebSocket,
  RecognizedString,
  // HttpResponse,
  // HttpRequest,
  us_socket
} from '../../src/types'
import {
  createApp,
  getPort,
  SHARED_COMPRESSOR,
  MAX_PAYLOAD_LENGTH,
  serveStatic,
} from '../../src'
let x: any
const port = 56789
createApp()
  .ws('/*', {
    compression: SHARED_COMPRESSOR,
    maxPayloadLength: MAX_PAYLOAD_LENGTH,
    idleTimeout: 32, // this need to be multiple of 4
    open: (ws: WebSocket) => {
      console.log('A WebSocket connected!', ws)
      // ws.subscribe('home/sensors/#')
      let y = 0
      x = setInterval(()  => {
        ++y
        ws.send(y + ' round')
        if (y === 0) {
          clearInterval(x)
        }
      }, 1000)
    },
    message: (_: WebSocket, message: ArrayBuffer) => {
      console.log('got message', arrayBufferToString(message))
      //ws.publish('home/sensors/temperature', message)
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
