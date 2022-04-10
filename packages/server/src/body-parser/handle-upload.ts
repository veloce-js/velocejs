// return the upload Data
import { HttpResponse, HttpRequest } from '../types'
import debug from 'debug'
const debugFn = debug('velocejs:server:body-parser:handle-upload')
// @TODO this should be a higher level method that will take the
// req mime-type handle the buffer then write to disk
export async function handleUpload(
  res: HttpResponse,
  req: HttpRequest,
  dir: string,
  filename?: string
): Promise<any> {
  console.log(res, req, dir, filename)
}

// get the upload buffer from response
// WE CAN NOT do this with async because all the handler must get call
// when isLast is true
export function uploadHandler(
  res: HttpResponse,
  bufferHandler: (b: Buffer) => void,
  onAbortedHandler?: () => void
): void {
  onDataHandler(res, bufferHandler)
  // if we don't attach an onAborted handler then we get complain
  res.onAborted(() => {
    onAbortedHandler ? onAbortedHandler() : debugFn('uploadHandler onAborted')
  })
}
// we take the onData callback further for re-use in the body parser method
export function onDataHandler(res: HttpResponse, bufferHandler: (b: Buffer | any) => void) {
  let data: Buffer
  res.onData((chunk: ArrayBuffer, isLast: boolean) => {
    const _chunk = Buffer.from(chunk)
    data = data ? Buffer.concat([data, _chunk]) : Buffer.concat([_chunk])
    if (isLast) {
      bufferHandler(data)
    }
  })
}
