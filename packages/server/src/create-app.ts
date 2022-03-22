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
