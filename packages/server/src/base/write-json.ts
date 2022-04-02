// simple wrapper to serve up JSON
import { HttpResponse } from '../types'

// just write the header and encode the JSON to string
export const writeJson = (res: HttpResponse, jsonObj: any): void => {
  res.writeHeader('Content-type', 'application/json')
  // @TODO should we add the Content-length header
  res.end(JSON.stringify(jsonObj))
}
