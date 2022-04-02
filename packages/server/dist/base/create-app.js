"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const uWebSockets_js_1 = tslib_1.__importDefault(require("uWebSockets.js"));
// create the app
// @TODO need to check if they actually pass an object with props as well
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
