// bodyparser main
import type {
  HttpResponse,
  HttpRequest,
  UwsRespondBody,
  UwsStringPairObj,
  UwsBodyParserMixEntry,
  UwsBodyParserOptions,
  UwsStringAnyObj,
} from './types'
import {
  CONTENT_TYPE,
  IS_FORM,
  IS_JSON,
  IS_MULTI,
  IS_OTHER,
  GET_NAME,
  DYNAMIC_PARAM,
  DYNAMIC_NAMES,
  QUERY_PARAM,
  IS_DYNAMIC,
} from './constants'
import {
  getHeaders,
  toArr,
  toBuffer,
  takeApartName,
  isEmptyObj,
  isJson,
  isForm,
  isFile,
  applyConfig,
} from './utils'
import {
  parseQuery,
  processQueryParameters,
} from './parse-query'
import { onDataHandler } from './handle-upload'
// @NOTE 2022-05-02 although the module has updated but it still not working correctly!
import {
  parse,
  getBoundary
} from './parse-multipart'
// debug
import debug from 'debug'
const debugFn = debug('velocejs:body-parser:main')
// processing

// main
export async function bodyParser(
  res: HttpResponse,
  req: HttpRequest,
  options?: { config: UwsBodyParserOptions, onAborted?: () => void }
): Promise<UwsRespondBody> {
  debugFn('bodyparser options', options)
  // when accessing the req / res before calling the end, we need to explicitly attach the onAborted handler
  res.onAborted(() => {
    options?.onAborted ?
      Reflect.apply(options.onAborted, null, [res]) :
      debugFn('ABORTED')
  })
  const url = req.getUrl()
  const query = req.getQuery()
  const method = req.getMethod()
  const headers = getHeaders(req)
  const queryParams = parseQuery(url, query, applyConfig(options?.config))
  const params = {}
  // we now always parse the URL because the url could be soemthing like /something/*/_id whatever
  // and we need to extract the params from the url and pass back as the ctx object
  const body: UwsRespondBody = { url, method, query, headers, params, queryParams }
  body[QUERY_PARAM] = queryParams[QUERY_PARAM]
  // check if it has dynamic route
  if (queryParams[DYNAMIC_PARAM]) {
    body[DYNAMIC_NAMES] = queryParams[DYNAMIC_NAMES]
    body.params = queryParams[DYNAMIC_PARAM]
    body.type = IS_DYNAMIC
  }
  if (method === GET_NAME) {
    body.type = body.type || IS_OTHER

    return Promise.resolve(body)
  }
  // we should only call this when the header is not GET - there is nobody to process
  return new Promise(resolver => {
    onDataHandler(res, buffer => {
      body.payload = buffer
      switch (true) {
        case isJson(headers):
          body.type = IS_JSON
          body.params = handleJsonRequestParams(buffer, params)
          break
        case isForm(headers):
          body.type = IS_FORM
          body.params = processQueryParameters(buffer.toString())
          break
        case isFile(headers):
          body.type = IS_MULTI
          body.params = parseMultipart(headers, buffer)
          break
        default:
          // @TODO need to test more edge case to find out how we can get here
          body.type = IS_OTHER
      }
      resolver(body)
    })
  })
}

/**
 we could get some strange result here
 when we set a json header with a GET
 */
function handleJsonRequestParams(
  buffer: Buffer,
  params: UwsStringAnyObj
) {
  const payload = buffer.toString()
  // @TODO this could still be problematic in some edge case, waiting for that to happen
  return payload ? JSON.parse(payload) : (isEmptyObj(params) ? {} : params)
}

/** all-in-one to parse and post-process the multipart-formdata input */
export function parseMultipart(
  headers: UwsStringPairObj,
  body: Buffer
): object {
  const boundary = getBoundary(headers[CONTENT_TYPE] as string)
  if (boundary) {
    const params = parse(body, boundary as string)
    if (Array.isArray(params) && params.length) {
      return processParams(params as unknown as Array<Record<string, UwsBodyParserMixEntry>>)
    }
  }
  return {}
}

// break it out from above for clearity
function processFileArray(
  params: Array<Record<string, UwsBodyParserMixEntry>>
) {
  return params.filter(param => param.filename && param.type)
               .map(param => {
                 const { name, type, filename, data } = param
                 const [ strName, arr ] = takeApartName(name as unknown as string)
                 const content = { type, filename, data }
                 const value = arr ? [ content ] : content

                 return { name: strName as string, value }
               })
               // from https://stackoverflow.com/questions/57379778/typescript-type-for-reduce
               // @TODO the output type still problematic
               .reduce<Record<string, UwsBodyParserMixEntry>>((a , b): any => {
                 switch (true) {
                  case (isEmptyObj(a)):
                    return { [b.name]: b.value } // init
                  case (a[b.name] !== undefined):
                    return Object.assign(a , {
                      [b.name]: toArr(a[b.name]).concat(toArr(b.value))
                    })
                  default:
                    return Object.assign(a, {[b.name]: b.value})
                 }
               }, {})
}

/** when the result is simple text then we parse it to string not buffer */
function processTextArray(
  params: Array<Record<string, UwsBodyParserMixEntry>>
) {
  return params
    .filter(param => !param.filename && !param.type)
    .map((param): UwsStringPairObj => (
      // @TODO how to use the type info to return as number or other data type
      { [param.name as unknown as string] : toBuffer(param.data).toString() }
    )
  )
  .reduce<Record<string, string>>((a, b) => Object.assign(a, b), {})
}

/** export this for unit test **/
export function processParams(
  params: Array<Record<string, UwsBodyParserMixEntry>>
): UwsBodyParserMixEntry {
  return Object.assign(
    processFileArray(params),
    processTextArray(params)
  )
}
