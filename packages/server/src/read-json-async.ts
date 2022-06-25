// This is based on the example from uWebsocket.js using Promise instead of callbacks
import { HttpResponse, AnyType, AnyTypeArr } from './types'
/**
 * Just to help get rip of that stupid TS warning
 * @param {array} args anything (mostly string)
 * @param {boolean} str turn it into a string
 * @return {any} concat buffer
 */
function bconcat(args: AnyTypeArr, str?: boolean): AnyType {
  const b = Buffer.concat(args)
  return str ? b.toString() : b
}

// Reading buffer from response and return the json object
export async function readJsonAsync(res: HttpResponse):  Promise<AnyType> {
  return new Promise((
    resolve: (value: unknown) => void,
    reject: (reason?: AnyType) => void
  ) => {
    let buffer: AnyType
    res.onData((ab: AnyType, isLast: boolean) => {
      const chunk = Buffer.from(ab)
      if (isLast) {
        let json: string
        if (buffer) {
          try {
            json = JSON.parse(bconcat([buffer, chunk], true)) // Buffer to string
          } catch(e) {
            res.close() // Do we need to call close here?
            return reject(e)
          }
          return resolve(json)
        } else {
          try {
            json = JSON.parse(chunk.toString())
          } catch(e) {
            res.close()
            return reject(e)
          }
        }
        return resolve(json)
      } else {
        buffer = buffer ? bconcat([buffer, chunk]) : bconcat([chunk])
      }
    })
    res.onAborted(reject)
  }) // end promise
}
