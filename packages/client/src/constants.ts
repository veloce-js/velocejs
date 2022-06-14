

export const DEFAULT_REQUEST_METHOD = 'get'
export const DEFAULT_CONTRACT_PATH = '/veloce/contract'
export const WEBSOCKET_METHOD = 'ws'
// The same from bodyparser
export const DYNAMIC_ROUTE_PATTERN = '/:'

export const JSONQL_CONTENT_TYPE = 'application/vnd.api+json'
export const CHARSET = 'charset=utf-8'
export const CLIENT_KEY = 'x-client'
export const CLIENT_NAME = 'velocejs'
// combine default jsonql headers
export const DEFAULT_HEADERS = {
  'Accept': JSONQL_CONTENT_TYPE,
  'Content-Type': [ JSONQL_CONTENT_TYPE, CHARSET ].join('; '),
  [CLIENT_KEY]: CLIENT_NAME
}

// copy over from validator
export const TS_TYPE_NAME = 'tstype'
export const SPREAD_ARG_TYPE = 'RestElement'
// just to give a name to the different validation methods
