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
} from 'uWebSockets.js'

// export all the interfaces
export * from './src/lib/interfaces'
// export the types
export * from './src/lib/types'
// don't know why jslint keep saying couldn't find the type, so reimport here again
import { UwsStringPairObj } from './src/lib/types'

export type UwsWriter = (payload: RecognizedString, headers?: UwsStringPairObj, status?: number) => void

export type UwsJsonWriter = (jsonObj: object | RecognizedString, status?: number) => void
