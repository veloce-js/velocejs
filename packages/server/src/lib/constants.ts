import uWS from 'uWebSockets.js'
// This is move to src root level for export as well
// as this will be share between different packages
export const SUPPORT_REST_ROUTES = ['any', 'get', 'post', 'put', 'options' ,'del', 'patch', 'head', 'connect', 'trace']
// , 'ws' has a different signature
// also it's not part of the REST spec therefore we don't include them here
export const STATIC_TYPE = 'static'
export const STATIC_ROUTE = 'get'
export const DEFAULT_FILE = 'index.html'

export const RAW_TYPE = 'raw'

export const CONTENT_TYPE = 'content-type'
export const DEFAULT_FORM_HEADER = 'application/x-www-form-urlencoded'
export const FILE_POST_HEADER = 'multipart/form-data'
export const JSON_HEADER = 'application/json'
// mostly are just some text anyway so default to html content type
export const DEFAULT_MIME_TYPE = 'text/html; charset=utf-8'
export const DEFAULT_FILE_TYPE = 'application/octet-stream'

export const BOUNDARY = 'boundary'

// simple input type to determine what is the response should be
export const IS_FORM = 'form' // could be get could be post or anything with the form-data
export const IS_MULTI = 'multipart'
export const IS_JSON = 'json'
export const IS_OTHER = 'other'
// For socket operation
export const BACK_PRESSURE = 1024
export const MAX_PAYLOAD_LENGTH = 16 * 1024 * 1024
export const SHARED_COMPRESSOR = uWS.SHARED_COMPRESSOR
// export the above 3 together as a default config
export const SOCKET_DEFAULT_PROPS = {
  compression: SHARED_COMPRESSOR,
  maxPayloadLength: MAX_PAYLOAD_LENGTH,
  idleTimeout: 32, // this need to be multiple of 4
}
