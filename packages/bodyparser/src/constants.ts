export const BOUNDARY = 'boundary'
export const CONTENT_TYPE = 'content-type'
// simple input type to determine what is the response should be
export const IS_FORM = 'form' // could be get could be post or anything with the form-data
export const IS_MULTI = 'multipart'
export const IS_JSON = 'json'
export const IS_OTHER = 'other'
export const IS_DYNAMIC = 'dynamic'

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
