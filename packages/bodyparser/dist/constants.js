"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILE_POST_HEADER = exports.DEFAULT_FORM_HEADER = exports.IS_OTHER = exports.IS_JSON = exports.IS_MULTI = exports.IS_FORM = exports.CONTENT_TYPE = exports.BOUNDARY = void 0;
exports.BOUNDARY = 'boundary';
exports.CONTENT_TYPE = 'content-type';
// simple input type to determine what is the response should be
exports.IS_FORM = 'form'; // could be get could be post or anything with the form-data
exports.IS_MULTI = 'multipart';
exports.IS_JSON = 'json';
exports.IS_OTHER = 'other';
exports.DEFAULT_FORM_HEADER = 'application/x-www-form-urlencoded';
exports.FILE_POST_HEADER = 'multipart/form-data';
