"use strict";
// group all the Types Interfaces export here
// everything from the uWebSocket.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.C415 = exports.C414 = exports.C413 = exports.C412 = exports.C411 = exports.C410 = exports.C409 = exports.C408 = exports.C407 = exports.C406 = exports.C405 = exports.C404 = exports.C403 = exports.C402 = exports.C401 = exports.C400 = exports.C308 = exports.C307 = exports.C304 = exports.C303 = exports.C302 = exports.C301 = exports.C300 = exports.C226 = exports.C208 = exports.C207 = exports.C206 = exports.C205 = exports.C204 = exports.C203 = exports.C201 = exports.C200 = exports.C103 = exports.C102 = exports.C101 = exports.C100 = exports.UwsServer = exports.getRenderFn = exports.renderFile = exports.writeBufferToFile = exports.write404 = exports.getWriter = exports.jsonWriter = exports.getContentType = exports.lookupMimeType = exports.serveStatic = exports.readJsonAsync = exports.getPort = exports.shutdownServer = exports.createApp = void 0;
exports.createSocketHandler = exports.SUPPORT_REST_ROUTES = exports.STATIC_TYPE = exports.STATIC_ROUTE = exports.SOCKET_DEFAULT_PROPS = exports.SHARED_COMPRESSOR = exports.RAW_TYPE = exports.MAX_PAYLOAD_LENGTH = exports.JSON_HEADER = exports.IS_OTHER = exports.IS_MULTI = exports.IS_JSON = exports.IS_FORM = exports.FILE_POST_HEADER = exports.DEFAULT_MIME_TYPE = exports.DEFAULT_FORM_HEADER = exports.DEFAULT_FILE_TYPE = exports.DEFAULT_FILE = exports.CONTENT_TYPE = exports.BOUNDARY = exports.BACK_PRESSURE = exports.lookupStatus = exports.C511 = exports.C510 = exports.C508 = exports.C507 = exports.C506 = exports.C505 = exports.C504 = exports.C503 = exports.C502 = exports.C501 = exports.C500 = exports.C451 = exports.C431 = exports.C429 = exports.C428 = exports.C426 = exports.C425 = exports.C424 = exports.C423 = exports.C422 = exports.C421 = exports.C418 = exports.C417 = exports.C416 = void 0;
const tslib_1 = require("tslib");
// Main entry point
const uWebSockets_js_1 = tslib_1.__importDefault(require("uWebSockets.js"));
// default export
exports.default = uWebSockets_js_1.default;
// named
var create_app_1 = require("./create-app");
Object.defineProperty(exports, "createApp", { enumerable: true, get: function () { return create_app_1.createApp; } });
Object.defineProperty(exports, "shutdownServer", { enumerable: true, get: function () { return create_app_1.shutdownServer; } });
Object.defineProperty(exports, "getPort", { enumerable: true, get: function () { return create_app_1.getPort; } });
var read_json_async_1 = require("./read-json-async");
Object.defineProperty(exports, "readJsonAsync", { enumerable: true, get: function () { return read_json_async_1.readJsonAsync; } });
// export { writeJson, getCorkWriter } from './base/write-json'
var serve_static_1 = require("./serve-static");
Object.defineProperty(exports, "serveStatic", { enumerable: true, get: function () { return serve_static_1.serveStatic; } });
var mime_1 = require("./lib/mime");
Object.defineProperty(exports, "lookupMimeType", { enumerable: true, get: function () { return mime_1.lookupMimeType; } });
Object.defineProperty(exports, "getContentType", { enumerable: true, get: function () { return mime_1.getContentType; } });
// @TODO not tested and not in use
// export * from './rate-limit'
var writers_1 = require("./writers");
Object.defineProperty(exports, "jsonWriter", { enumerable: true, get: function () { return writers_1.jsonWriter; } });
Object.defineProperty(exports, "getWriter", { enumerable: true, get: function () { return writers_1.getWriter; } });
Object.defineProperty(exports, "write404", { enumerable: true, get: function () { return writers_1.write404; } });
Object.defineProperty(exports, "writeBufferToFile", { enumerable: true, get: function () { return writers_1.writeBufferToFile; } });
var render_1 = require("./render");
Object.defineProperty(exports, "renderFile", { enumerable: true, get: function () { return render_1.renderFile; } });
Object.defineProperty(exports, "getRenderFn", { enumerable: true, get: function () { return render_1.getRenderFn; } });
// extended
var uws_server_class_1 = require("./uws-server-class");
Object.defineProperty(exports, "UwsServer", { enumerable: true, get: function () { return uws_server_class_1.UwsServer; } });
var status_1 = require("./lib/status");
Object.defineProperty(exports, "C100", { enumerable: true, get: function () { return status_1.C100; } });
Object.defineProperty(exports, "C101", { enumerable: true, get: function () { return status_1.C101; } });
Object.defineProperty(exports, "C102", { enumerable: true, get: function () { return status_1.C102; } });
Object.defineProperty(exports, "C103", { enumerable: true, get: function () { return status_1.C103; } });
Object.defineProperty(exports, "C200", { enumerable: true, get: function () { return status_1.C200; } });
Object.defineProperty(exports, "C201", { enumerable: true, get: function () { return status_1.C201; } });
Object.defineProperty(exports, "C203", { enumerable: true, get: function () { return status_1.C203; } });
Object.defineProperty(exports, "C204", { enumerable: true, get: function () { return status_1.C204; } });
Object.defineProperty(exports, "C205", { enumerable: true, get: function () { return status_1.C205; } });
Object.defineProperty(exports, "C206", { enumerable: true, get: function () { return status_1.C206; } });
Object.defineProperty(exports, "C207", { enumerable: true, get: function () { return status_1.C207; } });
Object.defineProperty(exports, "C208", { enumerable: true, get: function () { return status_1.C208; } });
Object.defineProperty(exports, "C226", { enumerable: true, get: function () { return status_1.C226; } });
Object.defineProperty(exports, "C300", { enumerable: true, get: function () { return status_1.C300; } });
Object.defineProperty(exports, "C301", { enumerable: true, get: function () { return status_1.C301; } });
Object.defineProperty(exports, "C302", { enumerable: true, get: function () { return status_1.C302; } });
Object.defineProperty(exports, "C303", { enumerable: true, get: function () { return status_1.C303; } });
Object.defineProperty(exports, "C304", { enumerable: true, get: function () { return status_1.C304; } });
Object.defineProperty(exports, "C307", { enumerable: true, get: function () { return status_1.C307; } });
Object.defineProperty(exports, "C308", { enumerable: true, get: function () { return status_1.C308; } });
Object.defineProperty(exports, "C400", { enumerable: true, get: function () { return status_1.C400; } });
Object.defineProperty(exports, "C401", { enumerable: true, get: function () { return status_1.C401; } });
Object.defineProperty(exports, "C402", { enumerable: true, get: function () { return status_1.C402; } });
Object.defineProperty(exports, "C403", { enumerable: true, get: function () { return status_1.C403; } });
Object.defineProperty(exports, "C404", { enumerable: true, get: function () { return status_1.C404; } });
Object.defineProperty(exports, "C405", { enumerable: true, get: function () { return status_1.C405; } });
Object.defineProperty(exports, "C406", { enumerable: true, get: function () { return status_1.C406; } });
Object.defineProperty(exports, "C407", { enumerable: true, get: function () { return status_1.C407; } });
Object.defineProperty(exports, "C408", { enumerable: true, get: function () { return status_1.C408; } });
Object.defineProperty(exports, "C409", { enumerable: true, get: function () { return status_1.C409; } });
Object.defineProperty(exports, "C410", { enumerable: true, get: function () { return status_1.C410; } });
Object.defineProperty(exports, "C411", { enumerable: true, get: function () { return status_1.C411; } });
Object.defineProperty(exports, "C412", { enumerable: true, get: function () { return status_1.C412; } });
Object.defineProperty(exports, "C413", { enumerable: true, get: function () { return status_1.C413; } });
Object.defineProperty(exports, "C414", { enumerable: true, get: function () { return status_1.C414; } });
Object.defineProperty(exports, "C415", { enumerable: true, get: function () { return status_1.C415; } });
Object.defineProperty(exports, "C416", { enumerable: true, get: function () { return status_1.C416; } });
Object.defineProperty(exports, "C417", { enumerable: true, get: function () { return status_1.C417; } });
Object.defineProperty(exports, "C418", { enumerable: true, get: function () { return status_1.C418; } });
Object.defineProperty(exports, "C421", { enumerable: true, get: function () { return status_1.C421; } });
Object.defineProperty(exports, "C422", { enumerable: true, get: function () { return status_1.C422; } });
Object.defineProperty(exports, "C423", { enumerable: true, get: function () { return status_1.C423; } });
Object.defineProperty(exports, "C424", { enumerable: true, get: function () { return status_1.C424; } });
Object.defineProperty(exports, "C425", { enumerable: true, get: function () { return status_1.C425; } });
Object.defineProperty(exports, "C426", { enumerable: true, get: function () { return status_1.C426; } });
Object.defineProperty(exports, "C428", { enumerable: true, get: function () { return status_1.C428; } });
Object.defineProperty(exports, "C429", { enumerable: true, get: function () { return status_1.C429; } });
Object.defineProperty(exports, "C431", { enumerable: true, get: function () { return status_1.C431; } });
Object.defineProperty(exports, "C451", { enumerable: true, get: function () { return status_1.C451; } });
Object.defineProperty(exports, "C500", { enumerable: true, get: function () { return status_1.C500; } });
Object.defineProperty(exports, "C501", { enumerable: true, get: function () { return status_1.C501; } });
Object.defineProperty(exports, "C502", { enumerable: true, get: function () { return status_1.C502; } });
Object.defineProperty(exports, "C503", { enumerable: true, get: function () { return status_1.C503; } });
Object.defineProperty(exports, "C504", { enumerable: true, get: function () { return status_1.C504; } });
Object.defineProperty(exports, "C505", { enumerable: true, get: function () { return status_1.C505; } });
Object.defineProperty(exports, "C506", { enumerable: true, get: function () { return status_1.C506; } });
Object.defineProperty(exports, "C507", { enumerable: true, get: function () { return status_1.C507; } });
Object.defineProperty(exports, "C508", { enumerable: true, get: function () { return status_1.C508; } });
Object.defineProperty(exports, "C510", { enumerable: true, get: function () { return status_1.C510; } });
Object.defineProperty(exports, "C511", { enumerable: true, get: function () { return status_1.C511; } });
Object.defineProperty(exports, "lookupStatus", { enumerable: true, get: function () { return status_1.lookupStatus; } });
// if we use the * then we keep having problem with editor said its not export
// export * from './lib/constants
var constants_1 = require("./lib/constants");
Object.defineProperty(exports, "BACK_PRESSURE", { enumerable: true, get: function () { return constants_1.BACK_PRESSURE; } });
Object.defineProperty(exports, "BOUNDARY", { enumerable: true, get: function () { return constants_1.BOUNDARY; } });
Object.defineProperty(exports, "CONTENT_TYPE", { enumerable: true, get: function () { return constants_1.CONTENT_TYPE; } });
Object.defineProperty(exports, "DEFAULT_FILE", { enumerable: true, get: function () { return constants_1.DEFAULT_FILE; } });
Object.defineProperty(exports, "DEFAULT_FILE_TYPE", { enumerable: true, get: function () { return constants_1.DEFAULT_FILE_TYPE; } });
Object.defineProperty(exports, "DEFAULT_FORM_HEADER", { enumerable: true, get: function () { return constants_1.DEFAULT_FORM_HEADER; } });
Object.defineProperty(exports, "DEFAULT_MIME_TYPE", { enumerable: true, get: function () { return constants_1.DEFAULT_MIME_TYPE; } });
Object.defineProperty(exports, "FILE_POST_HEADER", { enumerable: true, get: function () { return constants_1.FILE_POST_HEADER; } });
Object.defineProperty(exports, "IS_FORM", { enumerable: true, get: function () { return constants_1.IS_FORM; } });
Object.defineProperty(exports, "IS_JSON", { enumerable: true, get: function () { return constants_1.IS_JSON; } });
Object.defineProperty(exports, "IS_MULTI", { enumerable: true, get: function () { return constants_1.IS_MULTI; } });
Object.defineProperty(exports, "IS_OTHER", { enumerable: true, get: function () { return constants_1.IS_OTHER; } });
Object.defineProperty(exports, "JSON_HEADER", { enumerable: true, get: function () { return constants_1.JSON_HEADER; } });
Object.defineProperty(exports, "MAX_PAYLOAD_LENGTH", { enumerable: true, get: function () { return constants_1.MAX_PAYLOAD_LENGTH; } });
Object.defineProperty(exports, "RAW_TYPE", { enumerable: true, get: function () { return constants_1.RAW_TYPE; } });
Object.defineProperty(exports, "SHARED_COMPRESSOR", { enumerable: true, get: function () { return constants_1.SHARED_COMPRESSOR; } });
Object.defineProperty(exports, "SOCKET_DEFAULT_PROPS", { enumerable: true, get: function () { return constants_1.SOCKET_DEFAULT_PROPS; } });
Object.defineProperty(exports, "STATIC_ROUTE", { enumerable: true, get: function () { return constants_1.STATIC_ROUTE; } });
Object.defineProperty(exports, "STATIC_TYPE", { enumerable: true, get: function () { return constants_1.STATIC_TYPE; } });
Object.defineProperty(exports, "SUPPORT_REST_ROUTES", { enumerable: true, get: function () { return constants_1.SUPPORT_REST_ROUTES; } });
// @TODO streaming
// import * as constants from './lib/status'
// console.log(constants)
// @TODO ws
var create_socket_handler_1 = require("./create-socket-handler");
Object.defineProperty(exports, "createSocketHandler", { enumerable: true, get: function () { return create_socket_handler_1.createSocketHandler; } });
