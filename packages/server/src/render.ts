// completely re-organize the code from writer and rename to render
// also the server-static render method will be here for the next ssr feature
import { HttpResponse } from './types'
import { getWriter } from './writers'
import { lookupMimeType } from './lib/mime'
import { CONTENT_TYPE } from './lib/constants'

/** taken out from server-static for re-use */
export function fileRender(
  res: HttpResponse
) {
  const writer = getWriter(res)
  /** url is the request url, file is the actual read content */
  return (url: string, file: string): void => {
    const mimeType = lookupMimeType(url)
    writer(file, {[CONTENT_TYPE]: mimeType})
  }
}
/** we are going to have several different type
such as html markdown etc
*/
export function getRenderer(res: HttpResponse) {

  const writer = getWriter(res)

  return (type: string, content: any): void => {
    const mimeType = lookupMimeType(type)
    // here we make sure this is a string
    const output = Buffer.from(content).toString()
    
    writer(output, {[CONTENT_TYPE]: mimeType})
  }
}