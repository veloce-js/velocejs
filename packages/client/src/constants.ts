

export const DEFAULT_REQUEST_METHOD = 'get'
export const DEFAULT_CONTRACT_PATH = '/veloce/contract'
export const WEBSOCKET_METHOD = 'ws'
// The same from bodyparser
export const DYNAMIC_ROUTE_PATTERN = '/:'

export const CONTENT_TYPE = 'application/vnd.api+json'
export const CHARSET = 'charset=utf-8'
export const DEFAULT_HEADER = {
  'Accept': CONTENT_TYPE,
  'Content-Type': [ CONTENT_TYPE, CHARSET ].join('')
}

export const CLIENT_KEY = 'x-client'
export const CLIENT_NAME = 'velocejs'
