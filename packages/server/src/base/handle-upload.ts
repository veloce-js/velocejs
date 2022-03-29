// return the upload Data
import fs from 'fs'
import { HttpResponse, HttpRequest } from 'uWebSockets.js'

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
    onAbortedHandler && onAbortedHandler()
  })
}
// we take the onData callback further for re-use in the body parser method
export function onDataHandler(res: HttpResponse, bufferHandler: (b: Buffer | any) => void) {
  let data: any
  res.onData((chunk: ArrayBuffer, isLast: boolean) => {
    /*
    if (chunk.byteLength === 0 && isLast) { // nothing
      bufferHandler(null)
    }
    */
    let _chunk = Buffer.from(chunk)
    data = data ? Buffer.concat([data, _chunk]) : Buffer.concat([_chunk])
    if (isLast) {
      bufferHandler(data)
    }
  })
}


// writing the Buffer to a file
export function writeBufferToFile(buffer: Buffer, path: string, permission=0o666): boolean {
  let fileDescriptor
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
