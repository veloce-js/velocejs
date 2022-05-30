/*
For reference


*/
import type {
  UwsWebSocket
} from './types'

// main
export class Websocket {
  // mapping the interface one to one but not implement it
  protected maxPayloadLength?: number
  protected idleTimeout?: number
  protected compression?: { DISABLED: boolean } /* CompressOptions */
  protected maxBackpressure?: number
  protected sendPingsAutomatically?: number


  constructor(private ws: UwsWebSocket) {}

  /** Upgrade handler used to intercept HTTP upgrade requests and potentially upgrade to WebSocket.
   * See UpgradeAsync and UpgradeSync example files.
   */
  upgrade(res: HttpResponse, req: HttpRequest, context: us_socket_context_t) {

  }
  /** Handler for new WebSocket connection. WebSocket is valid from open to close, no errors. */
  open(ws: WebSocket) {}
  /** Handler for a WebSocket message. Messages are given as ArrayBuffer no matter if they are binary or not. Given ArrayBuffer is valid during the lifetime of this callback (until first await or return) and will be neutered. */
  message(ws: WebSocket, message: ArrayBuffer, isBinary: boolean) {}
  /** Handler for when WebSocket backpressure drains. Check ws.getBufferedAmount(). Use this to guide / drive your backpressure throttling. */
  drain(ws: WebSocket) {}
  /** Handler for close event, no matter if error, timeout or graceful close. You may not use WebSocket after this event. Do not send on this WebSocket from within here, it is closed. */
  close(ws: WebSocket, code: number, message: ArrayBuffer) {}
  /** Handler for received ping control message. You do not need to handle this, pong messages are automatically sent as per the standard. */
  ping(ws: WebSocket, message: ArrayBuffer) {}
  /** Handler for received pong control message. */
  pong(ws: WebSocket, message: ArrayBuffer) {}

}
