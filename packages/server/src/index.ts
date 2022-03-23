// Main entry point
import uWS from 'uWebSockets.js'
import { createApp, shutdownApp, getPort } from './create-app'
import { readJsonAsync } from './read-json-async'
import { writeJson } from './write-json'
import { serveStatic } from './serve-static'
import { rateLimit } from './rate-limit'
import { handleUpload, writeBufferToFile } from './handle-upload'
// default export
export default uWS
// named
export {
  createApp,
  shutdownApp,
  getPort,
  readJsonAsync,
  writeJson,
  serveStatic,
  rateLimit,
  handleUpload,
  writeBufferToFile
}
