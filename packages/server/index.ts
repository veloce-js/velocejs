// Main entry point
import uWS from 'uWebSockets.js'
import { createApp } from './src/create-app'
import { readJsonAsync } from './src/read-json-async'
// default export
export default uWS
// named
export {
  createApp,
  readJsonAsync
}
