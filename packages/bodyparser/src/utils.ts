import {
  HttpRequest,
  UwsStringPairObj
} from './types'
import {
  CONTENT_TYPE,
  DEFAULT_FORM_HEADER,
  FILE_POST_HEADER,
} from './constants'
// return all the headers
export function getHeaders(req: HttpRequest) {
  const headers = {}
  req.forEach((key: string, value: string) => {
    headers[key.toLowerCase()] = value
  })

  return headers
}

// wrapper method
export function toArr(value: any): Array<any> {
  return Array.isArray(value) ? value : [value]
}

export function toBuffer(data: any): Buffer {

  return Buffer.isBuffer(data) ? data : Buffer.from(data)
}
// see if its array like name such as data[]
// we just discard whatever is inside, because its pointless to have this stupid name
export function takeApartName(name: string): Array<string | boolean> {
  return (name.indexOf('[') > -1) ? [ name.split('[')[0], true ]
                                  : [ name, false ] // return a tuple
}

// check if the object is empty for the init run
export const isEmptyObj = (obj: any): boolean => (
  obj && Object.keys(obj).length === 0 && obj.constructor === Object
)

// check if the header 'Content-Type' is a json like 
export const isJson = (headers: UwsStringPairObj): boolean => (
  headers[CONTENT_TYPE] !== undefined && headers[CONTENT_TYPE].indexOf('json') > -1
)
// check if it's regular post form
export const isForm = (headers: UwsStringPairObj): boolean => (
  headers[CONTENT_TYPE] !== undefined && headers[CONTENT_TYPE].indexOf(DEFAULT_FORM_HEADER) > -1
)
// check if it's a file upload form
export const isFile = (headers: UwsStringPairObj): boolean => (
  headers[CONTENT_TYPE] !== undefined &&
  headers[CONTENT_TYPE].indexOf(FILE_POST_HEADER) > -1
  // headers[CONTENT_TYPE].indexOf(BOUNDARY) > -1
)

// the actual function to take the query apart
export function parseQuery(query: string): UwsStringPairObj {
  const params = new URLSearchParams(query)
  const result = {}
  for (const pair of params.entries()) {
   result[ pair[0] ] = pair[1]
  }

  return result
}
