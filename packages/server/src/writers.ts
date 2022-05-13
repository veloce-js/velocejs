// from write-json and change the interface to be the same
import fs from 'fs-extra'
import {
  HttpResponse,
  UwsStringPairObj,
  RecognizedString,
  UwsWriter,
  UwsJsonWriter
} from './types'
import { CONTENT_TYPE, JSON_HEADER } from './lib/constants'
import { C200, C404, lookupStatus } from './lib/status'
import debug from 'debug'
const debugFn = debug('velocejs:server:writers')

// just write the header and encode the JSON to string
export const jsonWriter = (res: HttpResponse): UwsJsonWriter => {
  const writer = getWriter(res)

  return (jsonObj: any, status?: number): void => {



    writer(
      JSON.stringify(jsonObj),
      { [CONTENT_TYPE]: JSON_HEADER},
      status
    )
  }
}

// break this out for re-use
export const getWriter = (res: HttpResponse): UwsWriter => {

  return (
    payload: RecognizedString,
    headers?: UwsStringPairObj,
    status?: number
  ) => {
    // this could create a bug - if they pass the wrong status code
    // then we fill it with 200 OK by default because it's hard to check
    const _status = status ? lookupStatus(status) : C200
    debugFn(`status: ${_status}`)
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

export const write404 = (res: HttpResponse): void => {
  res.cork(() => {
    res.writeStatus(C404).end()
  })
}

// writing the Buffer to a file
export function writeBufferToFile(buffer: Buffer, path: string, permission=0o666): boolean {
  let fileDescriptor: any
  try {
    fileDescriptor = fs.openSync(path, 'w', permission)
  } catch (e) {
    fs.chmodSync(path, permission)
    fileDescriptor = fs.openSync(path, 'w', permission)
  }
  if (fileDescriptor) {
    fs.writeSync(fileDescriptor, buffer, 0, buffer.length, 0)
    fs.closeSync(fileDescriptor)

    return true
  }

  return false
}
