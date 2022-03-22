// return the upload Data
import fs from 'fs'
import { HttpResponse } from 'uWebSockets.js'

// get the upload buffer from response
export async function returnUploadBuffer(res: HttpResponse): Promise<any> {

  return new Promise((resolver) => {
    let data: any;
    res.onData((chunk: ArrayBuffer, isLast: boolean) => {
      data = Buffer.concat([data, chunk])
      if (isLast) {
        return resolver(data)
      }
    })
  })
}

// writing the ArrayBuffer to a file
export function writeBufferToFile(path: string, buffer: Buffer, permission=438): void {
  let fileDescriptor;
  try {
    fileDescriptor = fs.openSync(path, 'w', permission)
  } catch (e) {
    fs.chmodSync(path, permission);
    fileDescriptor = fs.openSync(path, 'w', permission)
  }

  if (fileDescriptor) {
    fs.writeSync(fileDescriptor, buffer, 0, buffer.length, 0)
    fs.closeSync(fileDescriptor)
  }
}
