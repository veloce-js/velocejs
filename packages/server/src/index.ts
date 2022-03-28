// Main entry point
import uWS from 'uWebSockets.js'
import { createServer, shutdownServer, getPort } from './helpers/create-app'
import { readJsonAsync } from './helpers/read-json-async'
import { writeJson } from './helpers/write-json'
import { serveStatic } from './helpers/serve-static'
import { rateLimit } from './helpers/rate-limit'
import { handleUpload, writeBufferToFile } from './helpers/handle-upload'
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
