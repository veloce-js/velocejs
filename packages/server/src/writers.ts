// from write-json and change the interface to be the same
import type {
  HttpResponse,
  UwsStringPairObj,
  RecognizedString,
  UwsWriter,
  UwsJsonWriter,
  AnyType
} from './types'

import fs from 'fs-extra'
import { CONTENT_TYPE, JSON_HEADER } from './lib/constants'
import { C200, C404, lookupStatus } from './lib/status'
import { parseJson } from '@jsonql/utils'
import debug from 'debug'
const debugFn = debug('velocejs:server:writers')

/** just write the header and encode the JSON to string */
export const jsonWriter = (
  res: HttpResponse,
  headers?: UwsStringPairObj // add this here because laziness ...
): UwsJsonWriter => {
  const writer = getWriter(res)
  // return fn
  return (
    jsonObj: UwsStringPairObj | Array<UwsStringPairObj>,
    status?: number
  ): void => {
    const json = parseJson(jsonObj, true)
    if (!json) {
      debugFn('jsonObj', jsonObj)
      throw new Error(`input is not in correct json format!`)
    }
    const defaultHeader = { [CONTENT_TYPE]: JSON_HEADER }
    writer(
      JSON.stringify(json),
      headers ? Object.assign(defaultHeader, headers) : defaultHeader,
      status
    )
  }
}

/** create a writer for output to respond */
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

/** just issue a 404 */
export const write404 = (res: HttpResponse): void => {
  res.cork(() => {
    res.writeStatus(C404).end()
  })
}

/** writing the Buffer to a file */
export function writeBufferToFile(
  buffer: Buffer,
  path: string,
  permission=0o666
): boolean {
  let fileDescriptor: AnyType
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
