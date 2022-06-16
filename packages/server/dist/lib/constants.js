"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEDICATED_DECOMPRESSOR = exports.DEDICATED_DECOMPRESSOR_512B = exports.DEDICATED_DECOMPRESSOR_1KB = exports.DEDICATED_DECOMPRESSOR_2KB = exports.DEDICATED_DECOMPRESSOR_4KB = exports.DEDICATED_DECOMPRESSOR_8KB = exports.DEDICATED_DECOMPRESSOR_16KB = exports.DEDICATED_DECOMPRESSOR_32KB = exports.DEDICATED_COMPRESSOR_256KB = exports.DEDICATED_COMPRESSOR_128KB = exports.DEDICATED_COMPRESSOR_64KB = exports.DEDICATED_COMPRESSOR_32KB = exports.DEDICATED_COMPRESSOR_16KB = exports.DEDICATED_COMPRESSOR_4KB = exports.DEDICATED_COMPRESSOR_3KB = exports.SHARED_DECOMPRESSOR = exports.SHARED_COMPRESSOR = exports.DISABLED = exports.SOCKET_DEFAULT_PROPS = exports.MAX_PAYLOAD_LENGTH = exports.BACK_PRESSURE = exports.IS_OTHER = exports.IS_JSON = exports.IS_MULTI = exports.IS_FORM = exports.BOUNDARY = exports.DEFAULT_FILE_TYPE = exports.DEFAULT_MIME_TYPE = exports.JSON_HEADER = exports.DEFAULT_CHARTSET = exports.FILE_POST_HEADER = exports.DEFAULT_FORM_HEADER = exports.CONTENT_TYPE = exports.RAW_TYPE = exports.DEFAULT_FILE = exports.STATIC_ROUTE = exports.GET_ROUTE_NAME = exports.STATIC_TYPE = exports.WEBSOCKET_ROUTE_NAME = exports.SUPPORT_REST_ROUTES = void 0;
const tslib_1 = require("tslib");
const uWebSockets_js_1 = tslib_1.__importDefault(require("uWebSockets.js"));
const { DISABLED, SHARED_COMPRESSOR, SHARED_DECOMPRESSOR, DEDICATED_COMPRESSOR_3KB, DEDICATED_COMPRESSOR_4KB, DEDICATED_COMPRESSOR_16KB, DEDICATED_COMPRESSOR_32KB, DEDICATED_COMPRESSOR_64KB, DEDICATED_COMPRESSOR_128KB, DEDICATED_COMPRESSOR_256KB, DEDICATED_DECOMPRESSOR_32KB, DEDICATED_DECOMPRESSOR_16KB, DEDICATED_DECOMPRESSOR_8KB, DEDICATED_DECOMPRESSOR_4KB, DEDICATED_DECOMPRESSOR_2KB, DEDICATED_DECOMPRESSOR_1KB, DEDICATED_DECOMPRESSOR_512B, DEDICATED_DECOMPRESSOR } = uWebSockets_js_1.default;
exports.DISABLED = DISABLED;
exports.SHARED_COMPRESSOR = SHARED_COMPRESSOR;
exports.SHARED_DECOMPRESSOR = SHARED_DECOMPRESSOR;
exports.DEDICATED_COMPRESSOR_3KB = DEDICATED_COMPRESSOR_3KB;
exports.DEDICATED_COMPRESSOR_4KB = DEDICATED_COMPRESSOR_4KB;
exports.DEDICATED_COMPRESSOR_16KB = DEDICATED_COMPRESSOR_16KB;
exports.DEDICATED_COMPRESSOR_32KB = DEDICATED_COMPRESSOR_32KB;
exports.DEDICATED_COMPRESSOR_64KB = DEDICATED_COMPRESSOR_64KB;
exports.DEDICATED_COMPRESSOR_128KB = DEDICATED_COMPRESSOR_128KB;
exports.DEDICATED_COMPRESSOR_256KB = DEDICATED_COMPRESSOR_256KB;
exports.DEDICATED_DECOMPRESSOR_32KB = DEDICATED_DECOMPRESSOR_32KB;
exports.DEDICATED_DECOMPRESSOR_16KB = DEDICATED_DECOMPRESSOR_16KB;
exports.DEDICATED_DECOMPRESSOR_8KB = DEDICATED_DECOMPRESSOR_8KB;
exports.DEDICATED_DECOMPRESSOR_4KB = DEDICATED_DECOMPRESSOR_4KB;
exports.DEDICATED_DECOMPRESSOR_2KB = DEDICATED_DECOMPRESSOR_2KB;
exports.DEDICATED_DECOMPRESSOR_1KB = DEDICATED_DECOMPRESSOR_1KB;
exports.DEDICATED_DECOMPRESSOR_512B = DEDICATED_DECOMPRESSOR_512B;
exports.DEDICATED_DECOMPRESSOR = DEDICATED_DECOMPRESSOR;
// This is move to src root level for export as well
// as this will be share between different packages
exports.SUPPORT_REST_ROUTES = ['any', 'get', 'post', 'put', 'options', 'del', 'patch', 'head', 'connect', 'trace'];
exports.WEBSOCKET_ROUTE_NAME = 'ws';
// , 'ws' has a different signature
// also it's not part of the REST spec therefore we don't include them here
exports.STATIC_TYPE = 'static';
exports.GET_ROUTE_NAME = 'get';
exports.STATIC_ROUTE = exports.GET_ROUTE_NAME;
exports.DEFAULT_FILE = 'index.html';
exports.RAW_TYPE = 'raw';
exports.CONTENT_TYPE = 'content-type';
exports.DEFAULT_FORM_HEADER = 'application/x-www-form-urlencoded';
exports.FILE_POST_HEADER = 'multipart/form-data';
exports.DEFAULT_CHARTSET = 'charset=utf-8';
exports.JSON_HEADER = 'application/json; ' + exports.DEFAULT_CHARTSET;
// mostly are just some text anyway so default to html content type
exports.DEFAULT_MIME_TYPE = 'text/html; ' + exports.DEFAULT_CHARTSET;
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
// export the above 3 together as a default config
exports.SOCKET_DEFAULT_PROPS = {
    compression: SHARED_COMPRESSOR,
    maxPayloadLength: exports.MAX_PAYLOAD_LENGTH,
    idleTimeout: 32, // this need to be multiple of 4
};
