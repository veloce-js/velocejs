// return the upload Data
import { HttpResponse } from 'uWebSockets.js'

export async function returnUpload(res: HttpResponse): Promise<any> {

  return new Promise((resolver: unknown) => {
    let data;
    res.onData((chunk, isLast) => {
      let data = Buffer.concat([data, chunk])
      if (isLast) {
        return resolver(data)
      }
    })
  })
}
