

export const BOUNDARY = 'boundary'

export const NIL = 'NIL'

export const RULES_KEY = 'rules'
export const OPTIONS_KEY = 'options'
export const PARAMS_KEY = 'params'

export const RULE_AUTOMATIC = 'rule-automatic'
// they might not be needed anymore
export const RULE_LIST = 'rule-list'
export const RULE_SIMPLE = 'rule-simple'
export const RULE_FULL = 'rule-full'

export const isDebug = process.env.DEBUG
// this is the method that we need to call in the Top Decorator
export const METHOD_TO_RUN = 'prepare'
// allow the dev to override this in the command line
export const PATH_TO_VELOCE_CONFIG = process.env.VELOCE_CONFIG 

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
