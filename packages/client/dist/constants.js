"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPREAD_ARG_TYPE = exports.TS_TYPE_NAME = exports.DEFAULT_HEADERS = exports.CONTENT_TYPE = exports.CLIENT_NAME = exports.CLIENT_KEY = exports.CHARSET = exports.JSONQL_CONTENT_TYPE = exports.DYNAMIC_ROUTE_PATTERN = exports.WEBSOCKET_METHOD = exports.DEFAULT_CONTRACT_PATH = exports.DEFAULT_REQUEST_METHOD = void 0;
exports.DEFAULT_REQUEST_METHOD = 'get';
exports.DEFAULT_CONTRACT_PATH = '/veloce/contract';
exports.WEBSOCKET_METHOD = 'ws';
// The same from bodyparser
exports.DYNAMIC_ROUTE_PATTERN = '/:';
exports.JSONQL_CONTENT_TYPE = 'application/vnd.api+json';
exports.CHARSET = 'charset=utf-8';
exports.CLIENT_KEY = 'x-client';
exports.CLIENT_NAME = 'velocejs';
exports.CONTENT_TYPE = 'Content-type';
// combine default jsonql headers
exports.DEFAULT_HEADERS = {
    'Accept': exports.JSONQL_CONTENT_TYPE,
    [exports.CONTENT_TYPE]: [exports.JSONQL_CONTENT_TYPE, exports.CHARSET].join('; '),
    [exports.CLIENT_KEY]: exports.CLIENT_NAME
};
// copy over from validator
exports.TS_TYPE_NAME = 'tstype';
exports.SPREAD_ARG_TYPE = 'RestElement';
// just to give a name to the different validation methods
