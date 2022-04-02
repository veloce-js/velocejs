"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// group all the Types Interfaces export here
// everything from the uWebSocket.js
var uWebSockets_js_1 = require("uWebSockets.js");
// enum
exports.ListenOptions = uWebSockets_js_1.ListenOptions;
// Function
exports.App = uWebSockets_js_1.App;
exports.SSLApp = uWebSockets_js_1.SSLApp;
exports.us_listen_socket_close = uWebSockets_js_1.us_listen_socket_close;
exports.us_socket_local_port = uWebSockets_js_1.us_socket_local_port;
exports.getParts = uWebSockets_js_1.getParts;
// Vars
exports.DISABLED = uWebSockets_js_1.DISABLED;
exports.SHARED_COMPRESSOR = uWebSockets_js_1.SHARED_COMPRESSOR;
exports.SHARED_DECOMPRESSOR = uWebSockets_js_1.SHARED_DECOMPRESSOR;
exports.DEDICATED_COMPRESSOR_3KB = uWebSockets_js_1.DEDICATED_COMPRESSOR_3KB;
exports.DEDICATED_COMPRESSOR_4KB = uWebSockets_js_1.DEDICATED_COMPRESSOR_4KB;
exports.DEDICATED_COMPRESSOR_16KB = uWebSockets_js_1.DEDICATED_COMPRESSOR_16KB;
exports.DEDICATED_COMPRESSOR_32KB = uWebSockets_js_1.DEDICATED_COMPRESSOR_32KB;
exports.DEDICATED_COMPRESSOR_64KB = uWebSockets_js_1.DEDICATED_COMPRESSOR_64KB;
exports.DEDICATED_COMPRESSOR_128KB = uWebSockets_js_1.DEDICATED_COMPRESSOR_128KB;
exports.DEDICATED_COMPRESSOR_256KB = uWebSockets_js_1.DEDICATED_COMPRESSOR_256KB;
exports.DEDICATED_DECOMPRESSOR_32KB = uWebSockets_js_1.DEDICATED_DECOMPRESSOR_32KB;
exports.DEDICATED_DECOMPRESSOR_16KB = uWebSockets_js_1.DEDICATED_DECOMPRESSOR_16KB;
exports.DEDICATED_DECOMPRESSOR_8KB = uWebSockets_js_1.DEDICATED_DECOMPRESSOR_8KB;
exports.DEDICATED_DECOMPRESSOR_4KB = uWebSockets_js_1.DEDICATED_DECOMPRESSOR_4KB;
exports.DEDICATED_DECOMPRESSOR_2KB = uWebSockets_js_1.DEDICATED_DECOMPRESSOR_2KB;
exports.DEDICATED_DECOMPRESSOR_1KB = uWebSockets_js_1.DEDICATED_DECOMPRESSOR_1KB;
exports.DEDICATED_DECOMPRESSOR_512B = uWebSockets_js_1.DEDICATED_DECOMPRESSOR_512B;
exports.DEDICATED_DECOMPRESSOR = uWebSockets_js_1.DEDICATED_DECOMPRESSOR;
