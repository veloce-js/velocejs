"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_HEADERS = exports.CLIENT_NAME = exports.CLIENT_KEY = exports.CHARSET = exports.JSONQL_CONTENT_TYPE = exports.URL_PATTERN_OBJ = exports.ORG_ROUTE_REF = exports.STRIP_UNDERSCORE = exports.DYNAMIC_NAMES = exports.DYNAMIC_PARAM = exports.QUERY_PARAM = exports.DEFAULT_CONFIG = exports.DYNAMIC_ROUTE_PATTERN = exports.FILE_POST_HEADER = exports.DEFAULT_FORM_HEADER = exports.GET_NAME = exports.IS_FILE = exports.IS_DYNAMIC = exports.IS_JSON = exports.IS_MULTI = exports.IS_FORM = exports.IS_OTHER = exports.CONTENT_TYPE = exports.BOUNDARY = void 0;
exports.BOUNDARY = 'boundary';
exports.CONTENT_TYPE = 'content-type';
// simple input type to determine what is the response should be
exports.IS_OTHER = 'other'; // basically means we don't know what this is
exports.IS_FORM = 'form';
exports.IS_MULTI = 'multipart'; // file mixed with form data
exports.IS_JSON = 'json'; // jsonql also fall under this
exports.IS_DYNAMIC = 'dynamic';
exports.IS_FILE = 'binary'; // @TODO when headers is one of the binary format
exports.GET_NAME = 'get';
exports.DEFAULT_FORM_HEADER = 'application/x-www-form-urlencoded';
exports.FILE_POST_HEADER = 'multipart/form-data';
exports.DYNAMIC_ROUTE_PATTERN = '/:';
// default options for body parser
exports.DEFAULT_CONFIG = {
    stripUnderscoreParam: true,
    originalRouteDef: '' // use this understand better what to expect
};
// We need to namespace all the different params
// then we could support more variety of query schema
exports.QUERY_PARAM = 'queryParams';
exports.DYNAMIC_PARAM = 'dynamicParams';
exports.DYNAMIC_NAMES = 'names';
// keys for config
exports.STRIP_UNDERSCORE = 'stripUnderscoreParam';
exports.ORG_ROUTE_REF = '_originalRouteDef';
exports.URL_PATTERN_OBJ = '_urlPatternObj';
// copy from velocejs/client
exports.JSONQL_CONTENT_TYPE = 'application/vnd.api+json';
exports.CHARSET = 'charset=utf-8';
exports.CLIENT_KEY = 'x-client';
exports.CLIENT_NAME = 'velocejs';
// combine default jsonql headers
exports.DEFAULT_HEADERS = {
    'Accept': exports.CONTENT_TYPE,
    'Content-Type': [exports.JSONQL_CONTENT_TYPE, exports.CHARSET].join(''),
    [exports.CLIENT_KEY]: exports.CLIENT_NAME
};
