// simple create the uWebsocket.js app
import { AppOptions, TemplatedApp } from 'uWebSockets.js'
import uWS from 'uWebSockets.js'

/**
 *
 *
 */
export function createApp(opt?: AppOptions): TemplatedApp {
  return opt ? uWS.SSLApp(opt) : uWS.App()
}
