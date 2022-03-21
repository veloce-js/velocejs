// Main entry point
import uWS from 'uWebSockets.js'
import { createApp } from './create-app'
import { readJsonAsync } from './read-json-async'
import { serveStatic } from './serve-static'
// default export
export default uWS
// named
export {
  createApp,
  readJsonAsync,
  serveStatic
}
