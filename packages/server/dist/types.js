"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEDICATED_DECOMPRESSOR = exports.DEDICATED_DECOMPRESSOR_512B = exports.DEDICATED_DECOMPRESSOR_1KB = exports.DEDICATED_DECOMPRESSOR_2KB = exports.DEDICATED_DECOMPRESSOR_4KB = exports.DEDICATED_DECOMPRESSOR_8KB = exports.DEDICATED_DECOMPRESSOR_16KB = exports.DEDICATED_DECOMPRESSOR_32KB = exports.DEDICATED_COMPRESSOR_256KB = exports.DEDICATED_COMPRESSOR_128KB = exports.DEDICATED_COMPRESSOR_64KB = exports.DEDICATED_COMPRESSOR_32KB = exports.DEDICATED_COMPRESSOR_16KB = exports.DEDICATED_COMPRESSOR_4KB = exports.DEDICATED_COMPRESSOR_3KB = exports.SHARED_DECOMPRESSOR = exports.SHARED_COMPRESSOR = exports.DISABLED = exports.getParts = exports.us_socket_local_port = exports.us_listen_socket_close = exports.SSLApp = exports.App = exports.ListenOptions = void 0;
// group all the Types Interfaces export here
// everything from the uWebSocket.js
var uWebSockets_js_1 = require("uWebSockets.js");
// enum
Object.defineProperty(exports, "ListenOptions", { enumerable: true, get: function () { return uWebSockets_js_1.ListenOptions; } });
// Function
Object.defineProperty(exports, "App", { enumerable: true, get: function () { return uWebSockets_js_1.App; } });
Object.defineProperty(exports, "SSLApp", { enumerable: true, get: function () { return uWebSockets_js_1.SSLApp; } });
Object.defineProperty(exports, "us_listen_socket_close", { enumerable: true, get: function () { return uWebSockets_js_1.us_listen_socket_close; } });
Object.defineProperty(exports, "us_socket_local_port", { enumerable: true, get: function () { return uWebSockets_js_1.us_socket_local_port; } });
Object.defineProperty(exports, "getParts", { enumerable: true, get: function () { return uWebSockets_js_1.getParts; } });
// Vars
Object.defineProperty(exports, "DISABLED", { enumerable: true, get: function () { return uWebSockets_js_1.DISABLED; } });
Object.defineProperty(exports, "SHARED_COMPRESSOR", { enumerable: true, get: function () { return uWebSockets_js_1.SHARED_COMPRESSOR; } });
Object.defineProperty(exports, "SHARED_DECOMPRESSOR", { enumerable: true, get: function () { return uWebSockets_js_1.SHARED_DECOMPRESSOR; } });
Object.defineProperty(exports, "DEDICATED_COMPRESSOR_3KB", { enumerable: true, get: function () { return uWebSockets_js_1.DEDICATED_COMPRESSOR_3KB; } });
Object.defineProperty(exports, "DEDICATED_COMPRESSOR_4KB", { enumerable: true, get: function () { return uWebSockets_js_1.DEDICATED_COMPRESSOR_4KB; } });
Object.defineProperty(exports, "DEDICATED_COMPRESSOR_16KB", { enumerable: true, get: function () { return uWebSockets_js_1.DEDICATED_COMPRESSOR_16KB; } });
Object.defineProperty(exports, "DEDICATED_COMPRESSOR_32KB", { enumerable: true, get: function () { return uWebSockets_js_1.DEDICATED_COMPRESSOR_32KB; } });
Object.defineProperty(exports, "DEDICATED_COMPRESSOR_64KB", { enumerable: true, get: function () { return uWebSockets_js_1.DEDICATED_COMPRESSOR_64KB; } });
Object.defineProperty(exports, "DEDICATED_COMPRESSOR_128KB", { enumerable: true, get: function () { return uWebSockets_js_1.DEDICATED_COMPRESSOR_128KB; } });
Object.defineProperty(exports, "DEDICATED_COMPRESSOR_256KB", { enumerable: true, get: function () { return uWebSockets_js_1.DEDICATED_COMPRESSOR_256KB; } });
Object.defineProperty(exports, "DEDICATED_DECOMPRESSOR_32KB", { enumerable: true, get: function () { return uWebSockets_js_1.DEDICATED_DECOMPRESSOR_32KB; } });
Object.defineProperty(exports, "DEDICATED_DECOMPRESSOR_16KB", { enumerable: true, get: function () { return uWebSockets_js_1.DEDICATED_DECOMPRESSOR_16KB; } });
Object.defineProperty(exports, "DEDICATED_DECOMPRESSOR_8KB", { enumerable: true, get: function () { return uWebSockets_js_1.DEDICATED_DECOMPRESSOR_8KB; } });
Object.defineProperty(exports, "DEDICATED_DECOMPRESSOR_4KB", { enumerable: true, get: function () { return uWebSockets_js_1.DEDICATED_DECOMPRESSOR_4KB; } });
Object.defineProperty(exports, "DEDICATED_DECOMPRESSOR_2KB", { enumerable: true, get: function () { return uWebSockets_js_1.DEDICATED_DECOMPRESSOR_2KB; } });
Object.defineProperty(exports, "DEDICATED_DECOMPRESSOR_1KB", { enumerable: true, get: function () { return uWebSockets_js_1.DEDICATED_DECOMPRESSOR_1KB; } });
Object.defineProperty(exports, "DEDICATED_DECOMPRESSOR_512B", { enumerable: true, get: function () { return uWebSockets_js_1.DEDICATED_DECOMPRESSOR_512B; } });
Object.defineProperty(exports, "DEDICATED_DECOMPRESSOR", { enumerable: true, get: function () { return uWebSockets_js_1.DEDICATED_DECOMPRESSOR; } });
