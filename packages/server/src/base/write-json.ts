// simple wrapper to serve up JSON
import { HttpResponse, StringPairObj } from '../types'
import { CONTENT_TYPE, JSON_HEADER } from '../constants'
import { C200 } from '../status'
// just write the header and encode the JSON to string
export const writeJson = (res: HttpResponse, jsonObj: object): void => {
  const writer = getCorkWriter(res)
  writer(JSON.stringify(jsonObj), {
    [CONTENT_TYPE]: JSON_HEADER
  })
}

// break this out for re-use 
export const getCorkWriter = (res: HttpResponse): ((payload: string, headers?: StringPairObj) => void) => {

  return (payload: string, headers?: StringPairObj) => {
    res.cork(() => {
      res.writeStatus(C200)
      if (headers) {
        for (const key in headers) {
          res.writeHeader(key, headers[key])
        }
      }
      res.end(payload)
    })
  }
}
