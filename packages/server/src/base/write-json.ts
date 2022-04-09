// simple wrapper to serve up JSON
import { HttpResponse } from '../types'
import { C200 } from '../status'
// just write the header and encode the JSON to string
export const writeJson = (res: HttpResponse, jsonObj: any): void => {
  res.cork(() => {
    res.writeStatue(C200)
        .writeHeader('Content-type', 'application/json')
        // @TODO should we add the Content-length header
        .end(JSON.stringify(jsonObj))
  })
}
