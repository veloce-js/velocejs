// parse the input
/*
An HttpRequest is stack allocated and only accessible during the callback invocation.
export interface HttpRequest {
    // Returns the lowercased header value or empty string. //
    getHeader(lowerCaseKey: RecognizedString) : string;
    // Returns the parsed parameter at index. Corresponds to route. //
    getParameter(index: number) : string;
    // Returns the URL including initial /slash //
    getUrl() : string;
    // Returns the HTTP method, useful for "any" routes. //
    getMethod() : string;
    // Returns the raw querystring (the part of URL after ? sign) or empty string. //
    getQuery() : string;
    // Returns a decoded query parameter value or empty string. //
    getQuery(key: string) : string;
    // Loops over all headers. //
    forEach(cb: (key: string, value: string) => void) : void;
    // Setting yield to true is to say that this route handler did not handle the route, causing the router to continue looking for a matching route handler, or fail. //
    setYield(yield: boolean) : HttpRequest;
}
*/
import { HttpResponse, HttpRequest } from '../types'
import { onDataHandler } from './handle-upload'
import { UwsRespondBody, StringPairObj } from '../api/type'
import { CONTENT_TYPE, DEFAULT_POST_HEADER, FILE_POST_HEADER } from './constants'
import { parse, getBoundary } from 'parse-multipart-data'
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
function parseMultipart(headers: StringPairObj, body: Buffer): any {
  const boundary = getBoundary(headers[CONTENT_TYPE])
  if (boundary) {
    console.log('boundary', boundary)
    const params = parse(body, boundary as string)
    if (Array.isArray(params) && params.length) {
      return params.map(param => {
        if (!param.data && param.name && param.data) {
          // repack this to adhere the web form format
          return {
            name: param.name,
            // although we know its buffer just in case
            value: Buffer.from(param.data).toString()
          }
        }

        return param // this will be the field with the data
      })
    }
  }

  return {}
}


// check if the header 'Content-Type' is a json
const isJson = (headers: StringPairObj): boolean => headers[CONTENT_TYPE] !== undefined && headers[CONTENT_TYPE].indexOf('json') > -1
// check if it's regular post form
const isForm = (headers: StringPairObj): boolean => headers[CONTENT_TYPE] !== undefined && headers[CONTENT_TYPE] === DEFAULT_POST_HEADER
// check if it's a file upload form
const isFile = (headers: StringPairObj): boolean => headers[CONTENT_TYPE] !== undefined && headers[CONTENT_TYPE].indexOf(FILE_POST_HEADER) > -1

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
          body.json = JSON.parse(buffer.toString())
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
