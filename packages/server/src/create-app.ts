// simple create the uWebsocket.js app
import { AppOptions, TemplatedApp } from 'uWebSockets.js'
import uWS from 'uWebSockets.js'

// create the app
export function createApp(opt?: AppOptions): TemplatedApp {
  return opt ? uWS.SSLApp(opt) : uWS.App()
}

// shutdown the app
export function shutdownApp(listenSocket: any): void {
  uWS.us_listen_socket_close(listenSocket)
}

// all in one quick method to generate the server
export interface HandlersMap {
  type: string,
  path: string,
  handler: (args: Array<any>) => void
}
/* @TODO 
export function fastCreateApp(opt?: AppOptions, handlers?: Array<HandlersMap>, port?: number) {
  if (!handlers.length) {
    throw new Error(`You must specify at least 1 handler`)
  }
  const app = createApp(opt)
  handlers.forEach((path, handler) => {
    app[type](path, handler)
  })

}
*/
