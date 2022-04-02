"use strict";
// group all the Types Interfaces export here
// everything from the uWebSocket.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVE_STATIC = exports.ABORTED = exports.PREPARE = exports.HEAD = exports.PATCH = exports.DEL = exports.OPTIONS = exports.PUT = exports.POST = exports.GET = exports.ANY = exports.RAW = exports.FastApi = exports.UwsServer = exports.getHeaders = exports.parseQuery = exports.bodyParser = exports.writeBufferToFile = exports.onDataHandler = exports.uploadHandler = exports.handleUpload = exports.rateLimit = exports.serveStatic = exports.writeJson = exports.readJsonAsync = exports.getPort = exports.shutdownServer = exports.createApp = void 0;
const tslib_1 = require("tslib");
// Main entry point
const uWebSockets_js_1 = tslib_1.__importDefault(require("uWebSockets.js"));
var create_app_1 = require("./base/create-app");
Object.defineProperty(exports, "createApp", { enumerable: true, get: function () { return create_app_1.createApp; } });
Object.defineProperty(exports, "shutdownServer", { enumerable: true, get: function () { return create_app_1.shutdownServer; } });
Object.defineProperty(exports, "getPort", { enumerable: true, get: function () { return create_app_1.getPort; } });
var read_json_async_1 = require("./base/read-json-async");
Object.defineProperty(exports, "readJsonAsync", { enumerable: true, get: function () { return read_json_async_1.readJsonAsync; } });
var write_json_1 = require("./base/write-json");
Object.defineProperty(exports, "writeJson", { enumerable: true, get: function () { return write_json_1.writeJson; } });
var serve_static_1 = require("./base/serve-static");
Object.defineProperty(exports, "serveStatic", { enumerable: true, get: function () { return serve_static_1.serveStatic; } });
var rate_limit_1 = require("./base/rate-limit");
Object.defineProperty(exports, "rateLimit", { enumerable: true, get: function () { return rate_limit_1.rateLimit; } });
var handle_upload_1 = require("./base/handle-upload");
Object.defineProperty(exports, "handleUpload", { enumerable: true, get: function () { return handle_upload_1.handleUpload; } });
Object.defineProperty(exports, "uploadHandler", { enumerable: true, get: function () { return handle_upload_1.uploadHandler; } });
Object.defineProperty(exports, "onDataHandler", { enumerable: true, get: function () { return handle_upload_1.onDataHandler; } });
Object.defineProperty(exports, "writeBufferToFile", { enumerable: true, get: function () { return handle_upload_1.writeBufferToFile; } });
var body_parser_1 = require("./base/body-parser");
Object.defineProperty(exports, "bodyParser", { enumerable: true, get: function () { return body_parser_1.bodyParser; } });
Object.defineProperty(exports, "parseQuery", { enumerable: true, get: function () { return body_parser_1.parseQuery; } });
Object.defineProperty(exports, "getHeaders", { enumerable: true, get: function () { return body_parser_1.getHeaders; } });
// extended
var uws_server_class_1 = require("./base/uws-server-class");
Object.defineProperty(exports, "UwsServer", { enumerable: true, get: function () { return uws_server_class_1.UwsServer; } });
// fast api
var fast_api_1 = require("./api/fast-api");
Object.defineProperty(exports, "FastApi", { enumerable: true, get: function () { return fast_api_1.FastApi; } });
var decorators_1 = require("./api/decorators");
Object.defineProperty(exports, "RAW", { enumerable: true, get: function () { return decorators_1.RAW; } });
Object.defineProperty(exports, "ANY", { enumerable: true, get: function () { return decorators_1.ANY; } });
Object.defineProperty(exports, "GET", { enumerable: true, get: function () { return decorators_1.GET; } });
Object.defineProperty(exports, "POST", { enumerable: true, get: function () { return decorators_1.POST; } });
Object.defineProperty(exports, "PUT", { enumerable: true, get: function () { return decorators_1.PUT; } });
Object.defineProperty(exports, "OPTIONS", { enumerable: true, get: function () { return decorators_1.OPTIONS; } });
Object.defineProperty(exports, "DEL", { enumerable: true, get: function () { return decorators_1.DEL; } });
Object.defineProperty(exports, "PATCH", { enumerable: true, get: function () { return decorators_1.PATCH; } });
Object.defineProperty(exports, "HEAD", { enumerable: true, get: function () { return decorators_1.HEAD; } });
Object.defineProperty(exports, "PREPARE", { enumerable: true, get: function () { return decorators_1.PREPARE; } });
Object.defineProperty(exports, "ABORTED", { enumerable: true, get: function () { return decorators_1.ABORTED; } });
Object.defineProperty(exports, "SERVE_STATIC", { enumerable: true, get: function () { return decorators_1.SERVE_STATIC; } });
// default export
exports.default = uWebSockets_js_1.default;
// named
