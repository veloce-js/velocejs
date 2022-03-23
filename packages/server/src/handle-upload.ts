// return the upload Data
import fs from 'fs'
import { HttpResponse } from 'uWebSockets.js'

// get the upload buffer from response
// WE CAN NOT do this with async because all the handler must get call
// when isLast is true
export function handleUpload(
  res: HttpResponse,
  bufferHandler: (b: Buffer) => void,
  onAbortedHandler?: () => void
): void {
  let data: any;
  res.onData((chunk: ArrayBuffer, isLast: boolean) => {
    let _chunk = Buffer.from(chunk)
    data = data ? Buffer.concat([data, _chunk]) : Buffer.concat([_chunk])
    if (isLast) {
      bufferHandler(data)
    }
  })
  // if we don't attach an onAborted handler then we get complain
  res.onAborted(() => {
    onAbortedHandler && onAbortedHandler()
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
