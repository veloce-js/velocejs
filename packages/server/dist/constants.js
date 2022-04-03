"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILE_POST_HEADER = exports.DEFAULT_POST_HEADER = exports.CONTENT_TYPE = exports.RAW_TYPE = exports.DEFAULT_FILE = exports.STATIC_ROUTE = exports.STATIC_TYPE = exports.SUPPORT_REST_ROUTES = void 0;
// This is move to src root level for export as well
// as this will be share between different packages 
exports.SUPPORT_REST_ROUTES = ['any', 'get', 'post', 'put', 'options', 'del', 'patch', 'head', 'connect', 'trace'];
// , 'ws' has a different signature
// also it's not part of the REST spec therefore we don't include them here
exports.STATIC_TYPE = 'static';
exports.STATIC_ROUTE = 'get';
exports.DEFAULT_FILE = 'index.html';
exports.RAW_TYPE = 'raw';
exports.CONTENT_TYPE = 'content-type';
exports.DEFAULT_POST_HEADER = 'application/x-www-form-urlencoded';
exports.FILE_POST_HEADER = 'multipart/form-data';
