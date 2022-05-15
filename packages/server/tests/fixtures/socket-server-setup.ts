// using the uws server to setup a socket server
import { UwsServer } from '../../src'
import { WebSocket, RecognizedString } from '../../src/types'

export const port = 8899

export function runSocketSrv() {
  const api = new UwsServer()
  api.portNum = port
  api.autoStart = false
  api.run([
    {
      type: 'ws',
      path: '/*',
      handler: {
        open: (ws: WebSocket) => {
          ws.send(`Hello world`)
        },
        message: (ws: WebSocket, message: RecognizedString) => {
          ws.send(`Got your message ${message}`)
        }
      }
    },
    {
      type: 'any',
      path: '/*',
      handler: () => {
        console.log(`nothing to see`)
      }
    }
  ])

  return api
}
