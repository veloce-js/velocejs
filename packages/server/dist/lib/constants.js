"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOCKET_DEFAULT_PROPS = exports.SHARED_COMPRESSOR = exports.MAX_PAYLOAD_LENGTH = exports.BACK_PRESSURE = exports.IS_OTHER = exports.IS_JSON = exports.IS_MULTI = exports.IS_FORM = exports.BOUNDARY = exports.DEFAULT_FILE_TYPE = exports.DEFAULT_MIME_TYPE = exports.JSON_HEADER = exports.FILE_POST_HEADER = exports.DEFAULT_FORM_HEADER = exports.CONTENT_TYPE = exports.RAW_TYPE = exports.DEFAULT_FILE = exports.STATIC_ROUTE = exports.STATIC_TYPE = exports.WEBSOCKET_ROUTE_NAME = exports.SUPPORT_REST_ROUTES = void 0;
const tslib_1 = require("tslib");
const uWebSockets_js_1 = tslib_1.__importDefault(require("uWebSockets.js"));
// This is move to src root level for export as well
// as this will be share between different packages
exports.SUPPORT_REST_ROUTES = ['any', 'get', 'post', 'put', 'options', 'del', 'patch', 'head', 'connect', 'trace'];
exports.WEBSOCKET_ROUTE_NAME = 'ws';
// , 'ws' has a different signature
// also it's not part of the REST spec therefore we don't include them here
exports.STATIC_TYPE = 'static';
exports.STATIC_ROUTE = 'get';
exports.DEFAULT_FILE = 'index.html';
exports.RAW_TYPE = 'raw';
exports.CONTENT_TYPE = 'content-type';
exports.DEFAULT_FORM_HEADER = 'application/x-www-form-urlencoded';
exports.FILE_POST_HEADER = 'multipart/form-data';
exports.JSON_HEADER = 'application/json';
// mostly are just some text anyway so default to html content type
exports.DEFAULT_MIME_TYPE = 'text/html; charset=utf-8';
exports.DEFAULT_FILE_TYPE = 'application/octet-stream';
exports.BOUNDARY = 'boundary';
// simple input type to determine what is the response should be
exports.IS_FORM = 'form'; // could be get could be post or anything with the form-data
exports.IS_MULTI = 'multipart';
exports.IS_JSON = 'json';
exports.IS_OTHER = 'other';
// For socket operation
exports.BACK_PRESSURE = 1024;
exports.MAX_PAYLOAD_LENGTH = 16 * 1024 * 1024;
exports.SHARED_COMPRESSOR = uWebSockets_js_1.default.SHARED_COMPRESSOR;
// export the above 3 together as a default config
exports.SOCKET_DEFAULT_PROPS = {
    compression: exports.SHARED_COMPRESSOR,
    maxPayloadLength: exports.MAX_PAYLOAD_LENGTH,
    idleTimeout: 32, // this need to be multiple of 4
};
