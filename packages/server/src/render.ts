// completely re-organize the code from writer and rename to render
// also the server-static render method will be here for the next ssr feature
import type { HttpResponse, AnyType } from './types'
import { readFileSync } from 'fs-extra'
import { getWriter } from './writers'
import { lookupMimeType } from './lib/mime'
import { CONTENT_TYPE } from './lib/constants'

/** taken out from server-static for re-use */
export function renderFile(
  res: HttpResponse
) {
  const writer = getWriter(res)
  /** url is the request url, file is the actual read content */
  return (url: string, file?: Buffer): void => {
    const mimeType = lookupMimeType(url)
    // if they didn't provide the read content then we read it
    if (!file) {
      file = readFileSync(url)
    }
    writer(file, {[CONTENT_TYPE]: mimeType})
  }
}
/** we are going to have several different type
such as html markdown etc
*/
export function getRenderFn(res: HttpResponse) {

  const writer = getWriter(res)

  return (type: string, content: AnyType): void => {
    const mimeType = lookupMimeType(type)
    // here we make sure this is a string
    const output = Buffer.from(content).toString()

    writer(output, {[CONTENT_TYPE]: mimeType})
  }
}
