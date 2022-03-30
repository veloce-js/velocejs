"use strict";
// really should put all the data into one constants
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPPORT_REST_ROUTES = void 0;
exports.SUPPORT_REST_ROUTES = ['any', 'get', 'post', 'put', 'options', 'del', 'patch', 'head', 'connect', 'trace'];
// , 'ws' has a different signature
// also it's not part of the REST spec therefore we don't include them here
