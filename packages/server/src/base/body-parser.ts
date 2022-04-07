// parse the input into easier to use format
import { onDataHandler } from './handle-upload'
import { parse, getBoundary } from '../parse-multipart-data'
import {
  HttpResponse,
  HttpRequest,
  UwsRespondBody,
  StringPairObj
} from '../types'
import {
  CONTENT_TYPE,
  DEFAULT_POST_HEADER,
  FILE_POST_HEADER,
  // BOUNDARY
} from '../constants'
import debug from 'debug'
const debugFn = debug('velocejs:server:body-parser')

// the actual function to take the query apart
export function parseQuery(query: string): StringPairObj {
  const params = new URLSearchParams(query)
  const result = {}
  for (const pair of params.entries()) {
   result[ pair[0] ] = pair[1]
  }

  return result
}
// return all the headers
export function getHeaders(req: HttpRequest) {
  const headers = {}
  req.forEach((key: string, value: string) => {
    headers[key.toLowerCase()] = value
  })

  return headers
}

// all-in-one to parse and post process the multipart-formdata input
export function parseMultipart(headers: StringPairObj, body: Buffer): any {
  const boundary = getBoundary(headers[CONTENT_TYPE])
  if (boundary) {
    const params = parse(body, boundary as string)
    if (Array.isArray(params) && params.length) {
      return processParams(params)
    }
  }

  return {}
}

// export this for unit test
export function processParams(params: Array<any>): any {

  return Object.assign(
    processFileArray(params),
    processTextArray(params)
  )
}
// wrapper method
function toArr(value: any): Array<any> {
  return Array.isArray(value) ? value : [value]
}
// see if its array like name such as data[]
// we just discard whatever is inside, because its pointless to have this stupid name
function takeApartName(name: string): Array<string | boolean> {
  return (name.indexOf('[') > -1) ? [ name.split('[')[0], true ]
                                  : [ name, false ] // return a tuple
}
// break it out from above for clearity
function processFileArray(params: Array<any>): any {
  return params.filter(param => param.filename && param.type)
               .map(param => {
                 const { name, type, filename, data } = param
                 const [ strName, arr ] = takeApartName(name)
                 const content = { type, filename, data }
                 const value = arr ? [ content ] : content

                 return { name: strName as string, value }
               })
               // from https://stackoverflow.com/questions/57379778/typescript-type-for-reduce
               .reduce<Record<string, any>>((a , b): any => {
                 switch (true) {
                  case (isEmptyObj(a)):
                    return { [b.name]: b.value } // init
                  case (a[b.name] !== undefined):
                    // console.log('concat here')
                    return Object.assign(a , {
                      [b.name]: toArr(a[b.name]).concat(toArr(b.value))
                    })
                  default:
                    return Object.assign(a, {[b.name]: b.value})
                 }
               }, {})
}

function toBuffer(data: any): Buffer {

  return Buffer.isBuffer(data) ? data : Buffer.from(data)
}

// when the result is simple text then we parse it to string not buffer
function processTextArray(params: Array<any>): any {

  return params
    .filter(param => !param.filename && !param.type)
    .map(param => (
      // @TODO how to use the type info to return as number or other data type
      { [param.name as string] : toBuffer(param.data).toString() }
    )
  )
  .reduce<Record<string, any>>((a, b) => Object.assign(a, b), {})
}

// check if the object is empty for the init run
const isEmptyObj = (obj: any): boolean => (
  obj && Object.keys(obj).length === 0 && obj.constructor === Object
)

// check if the header 'Content-Type' is a json
const isJson = (headers: StringPairObj): boolean => (
  headers[CONTENT_TYPE] !== undefined && headers[CONTENT_TYPE].indexOf('json') > -1
)
// check if it's regular post form
const isForm = (headers: StringPairObj): boolean => (
  headers[CONTENT_TYPE] !== undefined && headers[CONTENT_TYPE] === DEFAULT_POST_HEADER
)
// check if it's a file upload form
const isFile = (headers: StringPairObj): boolean => (
  headers[CONTENT_TYPE] !== undefined &&
  headers[CONTENT_TYPE].indexOf(FILE_POST_HEADER) > -1
  // headers[CONTENT_TYPE].indexOf(BOUNDARY) > -1
)

// parse inputs
export async function bodyParser(
  res: HttpResponse,
  req: HttpRequest,
  onAborted?: () => void
): Promise<UwsRespondBody> {
  // when accessing the req / res before calling the end, we need to explicitly attach the onAborted handler
  res.onAborted(() => {
    onAborted ? Reflect.apply(onAborted, null, [res]) : debugFn('ABORTED')
  })
  // process the header
  const headers = getHeaders(req)
  const url = req.getUrl()
  const query = req.getQuery()
  const method = req.getMethod()
  let params = {}
  if (method === 'get') {
    params = parseQuery(query)
  }
  // package it up
  const body: UwsRespondBody = { url, method, query, headers, params }

  // we should only call this when the header is not GET?
  return new Promise(resolver => {
    onDataHandler(res, buffer => {
      body.payload = buffer
      switch (true) {
        case isJson(headers):
          body.params = JSON.parse(buffer.toString())
          break;
        case isForm(headers):
          body.params = parseQuery(buffer.toString())
          break;
        case isFile(headers):
          body.params = parseMultipart(headers, buffer)
          break;
        default:
      }
      resolver(body)
    })
  })
}
