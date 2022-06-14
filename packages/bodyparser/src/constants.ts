export const BOUNDARY = 'boundary'
export const CONTENT_TYPE = 'content-type'
// simple input type to determine what is the response should be
export const IS_OTHER = 'other' // basically means we don't know what this is
export const IS_FORM = 'form'
export const IS_MULTI = 'multipart' // file mixed with form data
export const IS_JSON = 'json' // jsonql also fall under this
export const IS_DYNAMIC = 'dynamic'
export const IS_FILE = 'binary' // @TODO when headers is one of the binary format

export const GET_NAME = 'get'

export const DEFAULT_FORM_HEADER = 'application/x-www-form-urlencoded'
export const FILE_POST_HEADER = 'multipart/form-data'

export const DYNAMIC_ROUTE_PATTERN = '/:'
// default options for body parser
export const DEFAULT_CONFIG = {
  stripUnderscoreParam: true, // so those _cb will get strip out
  originalRouteDef: '' // use this understand better what to expect
}
// We need to namespace all the different params
// then we could support more variety of query schema
export const QUERY_PARAM = 'queryParams'
export const DYNAMIC_PARAM = 'dynamicParams'
export const DYNAMIC_NAMES = 'names'
// keys for config
export const STRIP_UNDERSCORE = 'stripUnderscoreParam'
export const ORG_ROUTE_REF = '_originalRouteDef'
export const URL_PATTERN_OBJ = '_urlPatternObj'
// copy from velocejs/client
export const JSONQL_CONTENT_TYPE = 'application/vnd.api+json'
export const CHARSET = 'charset=utf-8'
export const CLIENT_KEY = 'x-client'
export const CLIENT_NAME = 'velocejs'
// combine default jsonql headers
export const DEFAULT_HEADERS = {
  'Accept': CONTENT_TYPE,
  'Content-Type': [ JSONQL_CONTENT_TYPE, CHARSET ].join(''),
  [CLIENT_KEY]: CLIENT_NAME
}
