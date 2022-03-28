// Main entry point
import uWS from 'uWebSockets.js'
import { createServer, shutdownServer, getPort } from './base/create-app'
import { readJsonAsync } from './base/read-json-async'
import { writeJson } from './base/write-json'
import { serveStatic } from './base/serve-static'
import { rateLimit } from './base/rate-limit'
import { handleUpload, writeBufferToFile } from './base/handle-upload'



// default export
export default uWS
// named
export {
  createServer,
  shutdownServer,
  getPort,
  readJsonAsync,
  writeJson,
  serveStatic,
  rateLimit,
  handleUpload,
  writeBufferToFile
}
