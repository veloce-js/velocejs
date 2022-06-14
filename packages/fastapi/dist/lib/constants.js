"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDebug = exports.isDev = exports.DEFAULT_HEADERS = exports.CLIENT_NAME = exports.CLIENT_KEY = exports.JSONQL_CONTENT_TYPE = exports.DEFAULT_ERROR_STATUS = exports.REST_NAME = exports.DYNAMIC_ROUTE_ALLOW_TYPES = exports.DEFAULT_CONTRACT_METHOD = exports.CATCH_ALL_TYPE = exports.CATCH_ALL_ROUTE = exports.CATCH_ALL_METHOD_NAME = exports.CONTRACT_METHOD_NAME = exports.METHOD_TO_RUN = exports.RULE_FULL = exports.RULE_SIMPLE = exports.RULE_LIST = exports.RULE_AUTOMATIC = exports.PARAMS_KEY = exports.OPTIONS_KEY = exports.RULES_KEY = exports.NIL = exports.BOUNDARY = void 0;
// this has moved to bodyparser @TODO remove later
exports.BOUNDARY = 'boundary';
exports.NIL = 'NIL';
exports.RULES_KEY = 'rules';
exports.OPTIONS_KEY = 'options';
exports.PARAMS_KEY = 'params';
exports.RULE_AUTOMATIC = 'rule-automatic';
// they might not be needed anymore @TODO remove later
exports.RULE_LIST = 'rule-list';
exports.RULE_SIMPLE = 'rule-simple';
exports.RULE_FULL = 'rule-full';
// this is the method that we need to call in the Top Decorator
exports.METHOD_TO_RUN = '$prepare';
exports.CONTRACT_METHOD_NAME = '$_serveContract';
exports.CATCH_ALL_METHOD_NAME = '$_catchAll';
exports.CATCH_ALL_ROUTE = '/*';
exports.CATCH_ALL_TYPE = 'any';
exports.DEFAULT_CONTRACT_METHOD = 'get';
exports.DYNAMIC_ROUTE_ALLOW_TYPES = ['number', 'string', 'boolean'];
exports.REST_NAME = 'rest';
exports.DEFAULT_ERROR_STATUS = 417;
var bodyparser_1 = require("@velocejs/bodyparser");
Object.defineProperty(exports, "JSONQL_CONTENT_TYPE", { enumerable: true, get: function () { return bodyparser_1.JSONQL_CONTENT_TYPE; } });
Object.defineProperty(exports, "CLIENT_KEY", { enumerable: true, get: function () { return bodyparser_1.CLIENT_KEY; } });
Object.defineProperty(exports, "CLIENT_NAME", { enumerable: true, get: function () { return bodyparser_1.CLIENT_NAME; } });
Object.defineProperty(exports, "DEFAULT_HEADERS", { enumerable: true, get: function () { return bodyparser_1.DEFAULT_HEADERS; } });
// dynamic
exports.isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
exports.isDebug = process.env.DEBUG !== undefined;
