import {
  HttpRequest,
  UwsStringPairObj,
  UwsBodyParserOptions,
} from './types'
import {
  CONTENT_TYPE,
  DEFAULT_FORM_HEADER,
  FILE_POST_HEADER,
  DYNAMIC_ROUTE_PATTERN,
  DEFAULT_CONFIG,
  IS_JSON,
} from './constants'

/** provide default to options */
export function applyConfig(config?: UwsBodyParserOptions) {
  return Object.assign(DEFAULT_CONFIG, config || {})
}

/** return all the headers with lowercase key */
export function getHeaders(req: HttpRequest) {
  const headers = {}
  req.forEach((key: string, value: string) => {
    headers[key.toLowerCase()] = value
  })
  return headers
}

// wrapper method
export function toArr(value: unknown): Array<unknown> {
  return Array.isArray(value) ? value : [value]
}

/** unknown to buffer */
export function toBuffer(data: unknown): Buffer {
  return Buffer.isBuffer(data) ? data : Buffer.from(data as string)
}

/* see if its array like name such as data[]
  we just discard whatever is inside, because its pointless to have this stupid name */
export function takeApartName(name: string): Array<string | boolean> {
  return (name.indexOf('[') > -1)
    ? [ name.split('[')[0], true ]
    : [ name, false ] // return a tuple
}

/* check if the object is empty for the init run */
export const isEmptyObj = (obj: object): boolean => (
  obj && Object.keys(obj).length === 0 && obj.constructor === Object
)

/** check if the header 'Content-Type' is a json like */
export const isJson = (headers: UwsStringPairObj): boolean => (
  headers[CONTENT_TYPE] !== undefined && headers[CONTENT_TYPE].indexOf(IS_JSON) > -1
)

// check if it's regular post form
export const isForm = (headers: UwsStringPairObj): boolean => (
  headers[CONTENT_TYPE] !== undefined && headers[CONTENT_TYPE].indexOf(DEFAULT_FORM_HEADER) > -1
)

// change from isFile to isMultipart - isFile expect pure binary format
export const isMultipart = (headers: UwsStringPairObj): boolean => (
  headers[CONTENT_TYPE] !== undefined &&
  headers[CONTENT_TYPE].indexOf(FILE_POST_HEADER) > -1
  // headers[CONTENT_TYPE].indexOf(BOUNDARY) > -1
)

/** check for one the binary format header */
export const isFile = (headers: UwsStringPairObj): boolean => {
  throw new Error(`Not implment yet`, headers)
}

/** just check if the url looks like a dynamic route */
export const isDynamicRoute = (route: string) => route.indexOf(DYNAMIC_ROUTE_PATTERN) > -1
