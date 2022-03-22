// Main entry point
import uWS from 'uWebSockets.js'
import { createApp, shutdownApp } from './create-app'
import { readJsonAsync } from './read-json-async'
import { writeJson } from './write-json'
import { serveStatic } from './serve-static'
import { rateLimit } from './rate-limit'
// default export
export default uWS
// named
export {
  createApp,
  shutdownApp,
  readJsonAsync,
  writeJson,
  serveStatic,
  rateLimit
}
