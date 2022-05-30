// specify your types here

/** A WebSocket connection that is valid from open to close event.
 * Read more about this in the user manual.
 */
// @NOTE rename from WebSocket to avoid name collison
export interface UwsWebSocket {
    /** Sends a message. Make sure to check getBufferedAmount() before sending. Returns true for success, false for built up backpressure that will drain when time is given.
     * Returning false does not mean nothing was sent, it only means backpressure was built up. This you can check by calling getBufferedAmount() afterwards.
     *
     * Make sure you properly understand the concept of backpressure. Check the backpressure example file.
     */
    send(message: RecognizedString, isBinary?: boolean, compress?: boolean) : boolean;

    /** Returns the bytes buffered in backpressure. This is similar to the bufferedAmount property in the browser counterpart.
     * Check backpressure example.
     */
    getBufferedAmount() : number;

    /** Gracefully closes this WebSocket. Immediately calls the close handler.
     * A WebSocket close message is sent with code and shortMessage.
     */
    end(code?: number, shortMessage?: RecognizedString) : void;

    /** Forcefully closes this WebSocket. Immediately calls the close handler.
     * No WebSocket close message is sent.
     */
    close() : void;

    /** Sends a ping control message. Returns true on success in similar ways as WebSocket.send does (regarding backpressure). This helper function correlates to WebSocket::send(message, uWS::OpCode::PING, ...) in C++. */
    ping(message?: RecognizedString) : boolean;

    /** Subscribe to a topic. */
    subscribe(topic: RecognizedString) : boolean;

    /** Unsubscribe from a topic. Returns true on success, if the WebSocket was subscribed. */
    unsubscribe(topic: RecognizedString) : boolean;

    /** Returns whether this websocket is subscribed to topic. */
    isSubscribed(topic: RecognizedString) : boolean;

    /** Returns a list of topics this websocket is subscribed to. */
    getTopics() : string[];

    /** Publish a message under topic. Backpressure is managed according to maxBackpressure, closeOnBackpressureLimit settings.
     * Order is guaranteed since v20.
    */
    publish(topic: RecognizedString, message: RecognizedString, isBinary?: boolean, compress?: boolean) : boolean;

    /** See HttpResponse.cork. Takes a function in which the socket is corked (packing many sends into one single syscall/SSL block) */
    cork(cb: () => void) : WebSocket;

    /** Returns the remote IP address. Note that the returned IP is binary, not text.
     *
     * IPv4 is 4 byte long and can be converted to text by printing every byte as a digit between 0 and 255.
     * IPv6 is 16 byte long and can be converted to text in similar ways, but you typically print digits in HEX.
     *
     * See getRemoteAddressAsText() for a text version.
     */
    getRemoteAddress() : ArrayBuffer;

    /** Returns the remote IP address as text. See RecognizedString. */
    getRemoteAddressAsText() : ArrayBuffer;

    /** Arbitrary user data may be attached to this object. In C++ this is done by using getUserData(). */
    [key: string]: any;
}

/** A structure holding settings and handlers for a WebSocket URL route handler. */
// same as above 
export interface UwsWebSocketBehavior {
    /** Maximum length of received message. If a client tries to send you a message larger than this, the connection is immediately closed. Defaults to 16 * 1024. */
    maxPayloadLength?: number;
    /** Maximum amount of seconds that may pass without sending or getting a message. Connection is closed if this timeout passes. Resolution (granularity) for timeouts are typically 4 seconds, rounded to closest.
     * Disable by using 0. Defaults to 120.
     */
    idleTimeout?: number;
    /** What permessage-deflate compression to use. uWS.DISABLED, uWS.SHARED_COMPRESSOR or any of the uWS.DEDICATED_COMPRESSOR_xxxKB. Defaults to uWS.DISABLED. */
    compression?: CompressOptions;
    /** Maximum length of allowed backpressure per socket when publishing or sending messages. Slow receivers with too high backpressure will be skipped until they catch up or timeout. Defaults to 1024 * 1024. */
    maxBackpressure?: number;
    /** Whether or not we should automatically send pings to uphold a stable connection given whatever idleTimeout. */
    sendPingsAutomatically?: number;
    /** Upgrade handler used to intercept HTTP upgrade requests and potentially upgrade to WebSocket.
     * See UpgradeAsync and UpgradeSync example files.
     */
    upgrade?: (res: HttpResponse, req: HttpRequest, context: us_socket_context_t) => void;
    /** Handler for new WebSocket connection. WebSocket is valid from open to close, no errors. */
    open?: (ws: WebSocket) => void;
    /** Handler for a WebSocket message. Messages are given as ArrayBuffer no matter if they are binary or not. Given ArrayBuffer is valid during the lifetime of this callback (until first await or return) and will be neutered. */
    message?: (ws: WebSocket, message: ArrayBuffer, isBinary: boolean) => void;
    /** Handler for when WebSocket backpressure drains. Check ws.getBufferedAmount(). Use this to guide / drive your backpressure throttling. */
    drain?: (ws: WebSocket) => void;
    /** Handler for close event, no matter if error, timeout or graceful close. You may not use WebSocket after this event. Do not send on this WebSocket from within here, it is closed. */
    close?: (ws: WebSocket, code: number, message: ArrayBuffer) => void;
    /** Handler for received ping control message. You do not need to handle this, pong messages are automatically sent as per the standard. */
    ping?: (ws: WebSocket, message: ArrayBuffer) => void;
    /** Handler for received pong control message. */
    pong?: (ws: WebSocket, message: ArrayBuffer) => void;
}
