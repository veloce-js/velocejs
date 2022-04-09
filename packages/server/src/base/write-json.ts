// simple wrapper to serve up JSON
import { HttpResponse, StringPairObj } from '../types'
import { CONTENT_TYPE, JSON_HEADER } from '../constants'
import { C200, lookupStatus } from '../status'
import debug from 'debug'
const debugFn = debug('velocejs:server:write-json')
// just write the header and encode the JSON to string
export const writeJson = (res: HttpResponse, jsonObj: object): void => {
  const writer = getCorkWriter(res)
  writer(JSON.stringify(jsonObj), {
    [CONTENT_TYPE]: JSON_HEADER
  })
}

// break this out for re-use
export const getCorkWriter = (res: HttpResponse): ((payload: string, headers?: StringPairObj) => void) => {

  return (payload: string, headers?: StringPairObj, status?: number | string) => {
    // this could create a bug - if they pass the wrong status code
    // then we fill it with 200 OK by default, it's hard to check
    const _status = status ? lookupStatus(status) : C200
    debugFn(`status: ${status}`)
    
    res.cork(() => {
      res.writeStatus(_status as string)
      if (headers) {
        for (const key in headers) {
          res.writeHeader(key, headers[key])
        }
      }
      res.end(payload)
    })
  }
}
