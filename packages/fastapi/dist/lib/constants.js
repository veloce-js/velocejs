"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CONTRACT_METHOD = exports.CONTRACT_METHOD_NAME = exports.METHOD_TO_RUN = exports.isDebug = exports.isDev = exports.RULE_FULL = exports.RULE_SIMPLE = exports.RULE_LIST = exports.RULE_AUTOMATIC = exports.PARAMS_KEY = exports.OPTIONS_KEY = exports.RULES_KEY = exports.NIL = exports.BOUNDARY = void 0;
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
exports.isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
exports.isDebug = process.env.DEBUG !== undefined;
// this is the method that we need to call in the Top Decorator
exports.METHOD_TO_RUN = '$prepare';
exports.CONTRACT_METHOD_NAME = '_serveContract';
exports.DEFAULT_CONTRACT_METHOD = 'get';
