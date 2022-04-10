
import { onDataHandler } from './handle-upload'
import { parse, getBoundary } from './parse-multipart-data'
import {
  HttpResponse,
  HttpRequest,
  UwsRespondBody,
  StringPairObj
} from '../types'
import {
  CONTENT_TYPE,
  IS_FORM,
  IS_JSON,
  IS_MULTI,
  IS_OTHER,
} from '../base/constants'
import {
  getHeaders,
  toArr,
  toBuffer,
  takeApartName,
  isEmptyObj,
  isJson,
  isForm,
  isFile,
  parseQuery,
} from './utils'
// debug
import debug from 'debug'
const debugFn = debug('velocejs:server:body-parser')
// processing

// main
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
          body.type = IS_JSON
          body.params = JSON.parse(buffer.toString())
          break;
        case isForm(headers):
          body.type = IS_FORM
          body.params = parseQuery(buffer.toString())
          break;
        case isFile(headers):
          body.type = IS_MULTI
          body.params = parseMultipart(headers, buffer)
          break;
        default:
          body.type = IS_OTHER
      }
      resolver(body)
    })
  })
}

// all-in-one to parse and post process the multipart-formdata input
export function parseMultipart(headers: StringPairObj, body: Buffer): object {
  const boundary = getBoundary(headers[CONTENT_TYPE])
  if (boundary) {
    const params = parse(body, boundary as string)
    if (Array.isArray(params) && params.length) {
      return processParams(params)
    }
  }

  return {}
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

// export this for unit test
export function processParams(params: Array<any>): any {

  return Object.assign(
    processFileArray(params),
    processTextArray(params)
  )
}
