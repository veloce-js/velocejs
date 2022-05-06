// bodyparser main
import { onDataHandler } from './handle-upload'
// @NOTE 2022-05-02 although the module has updated but it still not working correctly!
import { parse, getBoundary } from './parse-multipart'
import {
  HttpResponse,
  HttpRequest,
  UwsRespondBody,
  UwsStringPairObj,
  UwsBodyParserMixEntry
} from '../index'
import {
  CONTENT_TYPE,
  IS_FORM,
  IS_JSON,
  IS_MULTI,
  IS_OTHER,
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
  parseQuery,
} from './utils'
// debug
import debug from 'debug'
const debugFn = debug('velocejs:body-parser:main')
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
  const params = parseQuery(query)
  const method = req.getMethod()
  // we now always parse the URL because the url could be soemthing like /something/*/_id whatever
  // and we need to extract the params from the url and pass back as the ctx object

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
export function parseMultipart(
  headers: UwsStringPairObj,
  body: Buffer
): object {
  const boundary = getBoundary(headers[CONTENT_TYPE])
  if (boundary) {
    const params = parse(body, boundary as string)
    if (Array.isArray(params) && params.length) {

      return processParams(params as any)
    }
  }

  return {}
}

// break it out from above for clearity
function processFileArray(
  params: Array<Record<string, UwsBodyParserMixEntry>>
): any {

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

// when the result is simple text then we parse it to string not buffer
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

// export this for unit test
export function processParams(
  params: Array<Record<string, UwsBodyParserMixEntry>>
): UwsBodyParserMixEntry {

  return Object.assign(
    processFileArray(params),
    processTextArray(params)
  )
}
