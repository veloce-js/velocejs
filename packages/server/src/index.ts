// group all the Types Interfaces export here
// everything from the uWebSocket.js

// Main entry point
import uWS from 'uWebSockets.js'
// default export
export default uWS
// named
export {
  createApp,
  shutdownServer,
  getPort,
} from './create-app'
export { readJsonAsync } from './read-json-async'
// export { writeJson, getCorkWriter } from './base/write-json'
export { serveStatic } from './serve-static'
export {
  lookupMimeType,
  getContentType
} from './lib/mime'
// @TODO not tested and not in use
// export * from './rate-limit'
export {
  jsonWriter,
  getWriter,
  write404,
  writeBufferToFile,
} from './writers'
export {
  renderFile,
  getRenderFn
} from './render'
// extended
export { UwsServer } from './uws-server-class'
// constants
export {
  C100,
  C101,
  C102,
  C103,
  C200,
  C201,
  C203,
  C204,
  C205,
  C206,
  C207,
  C208,
  C226,
  C300,
  C301,
  C302,
  C303,
  C304,
  C307,
  C308,
  C400,
  C401,
  C402,
  C403,
  C404,
  C405,
  C406,
  C407,
  C408,
  C409,
  C410,
  C411,
  C412,
  C413,
  C414,
  C415,
  C416,
  C417,
  C418,
  C421,
  C422,
  C423,
  C424,
  C425,
  C426,
  C428,
  C429,
  C431,
  C451,
  C500,
  C501,
  C502,
  C503,
  C504,
  C505,
  C506,
  C507,
  C508,
  C510,
  C511,
  lookupStatus
} from './lib/status'
// useful methods
export {
  arrayBufferToString,
  getFileSize,
  toArrayBuffer,
} from './lib/files'
// if we use the * then we keep having problem with editor said its not export
// export * from './lib/constants
export {
  BACK_PRESSURE,
  BOUNDARY,
  CONTENT_TYPE,
  DEFAULT_FILE,
  DEFAULT_FILE_TYPE,
  DEFAULT_FORM_HEADER,
  DEFAULT_MIME_TYPE,
  DEFAULT_CHARTSET,
  FILE_POST_HEADER,
  IS_FORM,
  IS_JSON,
  IS_MULTI,
  IS_OTHER,
  JSON_HEADER,
  MAX_PAYLOAD_LENGTH,
  RAW_TYPE,
  SOCKET_DEFAULT_PROPS,
  GET_ROUTE_NAME,
  STATIC_ROUTE,
  STATIC_TYPE,
  SUPPORT_REST_ROUTES,
  WEBSOCKET_ROUTE_NAME,
  DISABLED,
  SHARED_COMPRESSOR,
  SHARED_DECOMPRESSOR,
  DEDICATED_COMPRESSOR_3KB,
  DEDICATED_COMPRESSOR_4KB,
  DEDICATED_COMPRESSOR_16KB,
  DEDICATED_COMPRESSOR_32KB,
  DEDICATED_COMPRESSOR_64KB,
  DEDICATED_COMPRESSOR_128KB,
  DEDICATED_COMPRESSOR_256KB,
  DEDICATED_DECOMPRESSOR_32KB,
  DEDICATED_DECOMPRESSOR_16KB,
  DEDICATED_DECOMPRESSOR_8KB,
  DEDICATED_DECOMPRESSOR_4KB,
  DEDICATED_DECOMPRESSOR_2KB,
  DEDICATED_DECOMPRESSOR_1KB,
  DEDICATED_DECOMPRESSOR_512B,
  DEDICATED_DECOMPRESSOR
} from './lib/constants'
// @TODO streaming
// import * as constants from './lib/status'
// console.log(constants)
// @TODO ws
export { createSocketHandler } from './create-socket-handler'
