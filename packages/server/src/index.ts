// Main entry point
import uWS from 'uWebSockets.js'
import { createApp, shutdownServer, getPort } from './base/create-app'
import { readJsonAsync } from './base/read-json-async'
import { writeJson } from './base/write-json'
import { serveStatic } from './base/serve-static'
import { rateLimit } from './base/rate-limit'
import { handleUpload, uploadHandler, onDataHandler, writeBufferToFile } from './base/handle-upload'
import { bodyParser } from './base/body-parser'
// extended
import { UwsServer } from './base/uws-server-class'
import { UwsRouteHandler } from './base/interfaces'

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
  uploadHandler,
  onDataHandler,
  writeBufferToFile,
  bodyParser,
  // extended
  UwsServer,
  UwsRouteHandler
}
