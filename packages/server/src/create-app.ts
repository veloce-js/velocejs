// simple create the uWebsocket.js app

import uWS from 'uWebSockets.js'

/**
 *
 *
 */
export function createApp(opt?: AppOptions): TemplatedApp {
  return opt ? uWS.SSLApp(opt) : uWS.App()
}
