"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPort = exports.shutdownServer = exports.createApp = void 0;
const tslib_1 = require("tslib");
const uWebSockets_js_1 = tslib_1.__importDefault(require("uWebSockets.js"));
// create the app
function createApp(opt) {
    return opt ? uWebSockets_js_1.default.SSLApp(opt) : uWebSockets_js_1.default.App();
}
exports.createApp = createApp;
// shutdown the app
function shutdownServer(listenSocket) {
    uWebSockets_js_1.default.us_listen_socket_close(listenSocket);
}
exports.shutdownServer = shutdownServer;
// when the port set to 0 at start up, it will automatically pick up a port number
function getPort(token) {
    return uWebSockets_js_1.default.us_socket_local_port(token);
}
exports.getPort = getPort;
/* @TODO
export function fastcreateServer(opt?: AppOptions, handlers?: Array<HandlersMap>, port?: number) {
  if (!handlers.length) {
    throw new Error(`You must specify at least 1 handler`)
  }
  const app = createServer(opt)
  handlers.forEach((path, handler) => {
    app[type](path, handler)
  })

}
*/
