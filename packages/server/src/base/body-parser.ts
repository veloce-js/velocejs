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
import { HttpResponse, HttpRequest } from 'uWebSockets.js'
import { onDataHandler } from './handle-upload'
import { UwsRespondBody, StringPairObj } from '../api/type'
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

// check if the header 'Content-Type' is a json
function isJson(headers: StringPairObj): boolean {
  const contentType = headers['content-type']

  return contentType ? contentType.indexOf('json') > -1 : false
}

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
  const headers = {}
  req.forEach((key: string, value: string) => {
    headers[key.toLowerCase()] = value
  })
  const url = req.getUrl()
  const query = req.getQuery()
  const method = req.getMethod()
  const params = parseQuery(query)
  // package it up
  const body: UwsRespondBody = { url, method, query, headers, params }

  // we should only call this when the header is not GET?
  return new Promise(resolver => {
    onDataHandler(res, buffer => {
      body.payload = buffer
      if (isJson(headers)) {
        body.json = JSON.parse(buffer.toString())
      }
      resolver(body)
    })
  })

}
