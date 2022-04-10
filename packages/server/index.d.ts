// group all the Types Interfaces export here
// everything from the uWebSocket.js
export {
  // interfaces
  us_listen_socket,
  us_socket,
  us_socket_context_t,
  WebSocket,
  HttpResponse,
  HttpRequest,
  WebSocketBehavior,
  AppOptions,
  TemplatedApp,
  MultipartField,
  // types
  RecognizedString,
  CompressOptions,
  // enum
  ListenOptions,
  // Function
  App,
  SSLApp,
  us_listen_socket_close,
  us_socket_local_port,
  getParts,
  // Vars
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
} from 'uWebSockets.js'

// export all the interfaces
export {
  UwsRouteHandler,
  UwsRouteSetup,
  UwsParsedResult,
} from './src/base/interfaces'
// export the types
export {
  StringPairObj,
  UwsRespondBody,
  UwsBodyParserFileEntry,
} from './src/base/type'

export type UwsWriter = (payload: RecognizedString, headers?: StringPairObj, status?: number | string) => void

export type UwsJsonWriter = (jsonObj: object, status?: number | string) => void
