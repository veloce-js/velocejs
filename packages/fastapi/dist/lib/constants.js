"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDebug = exports.RULE_FULL = exports.RULE_SIMPLE = exports.RULE_LIST = exports.RULE_AUTOMATIC = exports.PARAMS_KEY = exports.OPTIONS_KEY = exports.RULES_KEY = exports.NIL = exports.BOUNDARY = void 0;
exports.BOUNDARY = 'boundary';
exports.NIL = 'NIL';
exports.RULES_KEY = 'rules';
exports.OPTIONS_KEY = 'options';
exports.PARAMS_KEY = 'params';
exports.RULE_AUTOMATIC = 'rule-automatic';
// they might not be needed anymore
exports.RULE_LIST = 'rule-list';
exports.RULE_SIMPLE = 'rule-simple';
exports.RULE_FULL = 'rule-full';
exports.isDebug = process.env.DEBUG;
/*
export const CLASS_TYPE = 'ClassDeclaration'
export const EXPORT_TYPE = 'ExportDeclaration'
export const CLASS_METHOD = 'ClassMethod'
export const ASSIGN_PATTERN = 'AssignmentPattern'
export const OBJ_EXP = 'ObjectExpression'
export const ARR_EXP = 'ArrayExpression'
export const BOO_LIT = 'BooleanLiteral'
export const NUM_LIT = 'NumericLiteral'
export const STR_LIT = 'StringLiteral'
export const KEY_TYPE = 'TsKeywordType'
export const UNION_TYPE = 'TsUnionType'
*/
