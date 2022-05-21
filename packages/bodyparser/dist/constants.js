"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORG_ROUTE_REF = exports.STRIP_UNDERSCORE = exports.DYNAMIC_NAMES = exports.DYNAMIC_PARAM = exports.QUERY_PARAM = exports.DEFAULT_CONFIG = exports.DYNAMIC_ROUTE_PATTERN = exports.FILE_POST_HEADER = exports.DEFAULT_FORM_HEADER = exports.GET_NAME = exports.IS_DYNAMIC = exports.IS_OTHER = exports.IS_JSON = exports.IS_MULTI = exports.IS_FORM = exports.CONTENT_TYPE = exports.BOUNDARY = void 0;
exports.BOUNDARY = 'boundary';
exports.CONTENT_TYPE = 'content-type';
// simple input type to determine what is the response should be
exports.IS_FORM = 'form'; // could be get could be post or anything with the form-data
exports.IS_MULTI = 'multipart';
exports.IS_JSON = 'json';
exports.IS_OTHER = 'other';
exports.IS_DYNAMIC = 'dynamic';
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
