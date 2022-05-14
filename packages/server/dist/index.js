"use strict";
// group all the Types Interfaces export here
// everything from the uWebSocket.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.UwsServer = exports.getContentType = exports.lookupMimeType = exports.serveStatic = void 0;
const tslib_1 = require("tslib");
// Main entry point
const uWebSockets_js_1 = tslib_1.__importDefault(require("uWebSockets.js"));
// default export
exports.default = uWebSockets_js_1.default;
// named
tslib_1.__exportStar(require("./create-app"), exports);
tslib_1.__exportStar(require("./read-json-async"), exports);
// export { writeJson, getCorkWriter } from './base/write-json'
var serve_static_1 = require("./serve-static");
Object.defineProperty(exports, "serveStatic", { enumerable: true, get: function () { return serve_static_1.serveStatic; } });
var mime_1 = require("./lib/mime");
Object.defineProperty(exports, "lookupMimeType", { enumerable: true, get: function () { return mime_1.lookupMimeType; } });
Object.defineProperty(exports, "getContentType", { enumerable: true, get: function () { return mime_1.getContentType; } });
// @TODO not tested and not in use
// export * from './rate-limit'
tslib_1.__exportStar(require("./writers"), exports);
tslib_1.__exportStar(require("./render"), exports);
// extended
var uws_server_class_1 = require("./uws-server-class");
Object.defineProperty(exports, "UwsServer", { enumerable: true, get: function () { return uws_server_class_1.UwsServer; } });
tslib_1.__exportStar(require("./lib/status"), exports);
tslib_1.__exportStar(require("./lib/constants"), exports);
// @TODO streaming
// @TODO ws
