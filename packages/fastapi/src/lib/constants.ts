// this has moved to bodyparser @TODO remove later
export const BOUNDARY = 'boundary'

export const NIL = 'NIL'

export const RULES_KEY = 'rules'
export const OPTIONS_KEY = 'options'
export const PARAMS_KEY = 'params'

export const RULE_AUTOMATIC = 'rule-automatic'
// they might not be needed anymore @TODO remove later
export const RULE_LIST = 'rule-list'
export const RULE_SIMPLE = 'rule-simple'
export const RULE_FULL = 'rule-full'
// this is the method that we need to call in the Top Decorator
export const METHOD_TO_RUN = '$prepare'

export const CONTRACT_METHOD_NAME = '$_serveContract'
export const CATCH_ALL_METHOD_NAME = '$_catchAll'
export const CATCH_ALL_ROUTE = '/*'
export const CATCH_ALL_TYPE = 'any'

export const DEFAULT_CONTRACT_METHOD = 'get'
export const DYNAMIC_ROUTE_ALLOW_TYPES = ['number', 'string', 'boolean']

export const REST_NAME = 'rest'

export const DEFAULT_ERROR_STATUS = 417

// dynamic
export const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
export const isDebug = process.env.DEBUG !== undefined
