import { WebSocketBehavior } from './lib/interfaces';
/** basically just provide some of the default props */
export declare function createSocketHandler(setup: WebSocketBehavior): WebSocketBehavior;
/** A WebSocket connection that is valid from open to close event.
 * Read more about this in the user manual.

export interface WebSocket {
    Sends a message. Make sure to check getBufferedAmount() before sending. Returns true for success, false for built up backpressure that will drain when time is given.
     Returning false does not mean nothing was sent, it only means backpressure was built up. This you can check by calling getBufferedAmount() afterwards.

     Make sure you properly understand the concept of backpressure. Check the backpressure example file.

    send(message: RecognizedString, isBinary?: boolean, compress?: boolean) : boolean;

    Returns the bytes buffered in backpressure. This is similar to the bufferedAmount property in the browser counterpart.
     * Check backpressure example.

    getBufferedAmount() : number;

    Gracefully closes this WebSocket. Immediately calls the close handler.
     * A WebSocket close message is sent with code and shortMessage.

    end(code?: number, shortMessage?: RecognizedString) : void;

    Forcefully closes this WebSocket. Immediately calls the close handler.
     * No WebSocket close message is sent.

    close() : void;

    Sends a ping control message. Returns true on success in similar ways as WebSocket.send does (regarding backpressure).
    This helper function correlates to WebSocket::send(message, uWS::OpCode::PING, ...) in C++.
    ping(message?: RecognizedString) : boolean;

    Subscribe to a topic.
    subscribe(topic: RecognizedString) : boolean;

    Unsubscribe from a topic. Returns true on success, if the WebSocket was subscribed.
    unsubscribe(topic: RecognizedString) : boolean;

    Returns whether this websocket is subscribed to topic.
    isSubscribed(topic: RecognizedString) : boolean;

    Returns a list of topics this websocket is subscribed to.
    getTopics() : string[];

    Publish a message under topic. Backpressure is managed according to maxBackpressure,
    closeOnBackpressureLimit settings.
    Order is guaranteed since v20.

    publish(topic: RecognizedString, message: RecognizedString, isBinary?: boolean, compress?: boolean) : boolean;

    See HttpResponse.cork. Takes a function in which the socket is corked (packing many sends into one single syscall/SSL block)
    cork(cb: () => void) : WebSocket;

    Returns the remote IP address. Note that the returned IP is binary, not text.
     *
     * IPv4 is 4 byte long and can be converted to text by printing every byte as a digit between 0 and 255.
     * IPv6 is 16 byte long and can be converted to text in similar ways, but you typically print digits in HEX.
     *
     * See getRemoteAddressAsText() for a text version.

    getRemoteAddress() : ArrayBuffer;

    - Returns the remote IP address as text. See RecognizedString.
    getRemoteAddressAsText() : ArrayBuffer;

    Arbitrary user data may be attached to this object. In C++ this is done by using getUserData().
    [key: string]: any;
}
*/
