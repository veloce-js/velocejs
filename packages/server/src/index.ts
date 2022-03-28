// Main entry point
import uWS from 'uWebSockets.js'
import { createApp, shutdownServer, getPort } from './base/create-app'
import { readJsonAsync } from './base/read-json-async'
import { writeJson } from './base/write-json'
import { serveStatic } from './base/serve-static'
import { rateLimit } from './base/rate-limit'
import { handleUpload, writeBufferToFile } from './base/handle-upload'
// extended
import { UwsServer, UwsEndPointHandler } from './base/uws-server-class'


// default export
export default uWS
// named
export {
  createApp,
  shutdownServer,
  getPort,
  readJsonAsync,
  writeJson,
  serveStatic,
  rateLimit,
  handleUpload,
  writeBufferToFile,
  // extended
  UwsServer,
  UwsEndPointHandler
}
