// simple create the uWebsocket.js app
import { AppOptions, TemplatedApp } from 'uWebSockets.js'
import uWS from 'uWebSockets.js'

// create the app
export function createServer(opt?: AppOptions): TemplatedApp {
  return opt ? uWS.SSLApp(opt) : uWS.App()
}
// shutdown the app
export function shutdownServer(listenSocket: any): void {
  uWS.us_listen_socket_close(listenSocket)
}
// when the port set to 0 at start up, it will automatically pick up a port number
export function getPort(token: any): number {
  return uWS.us_socket_local_port(token)
}

// all in one quick method to generate the server
export interface HandlersMap {
  type: string,
  path: string,
  handler: (args: Array<any>) => void
}
/* @TODO
export function fastcreateServer(opt?: AppOptions, handlers?: Array<HandlersMap>, port?: number) {
  if (!handlers.length) {
    throw new Error(`You must specify at least 1 handler`)
  }
  const app = createServer(opt)
  handlers.forEach((path, handler) => {
    app[type](path, handler)
  })

}
*/
