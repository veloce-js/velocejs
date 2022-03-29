// simple create the uWebsocket.js app
import { AppOptions, TemplatedApp } from 'uWebSockets.js'
import uWS from 'uWebSockets.js'

// create the app
// @TODO need to check if they actually pass an object with props as well
export function createApp(opt?: AppOptions): TemplatedApp {

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
