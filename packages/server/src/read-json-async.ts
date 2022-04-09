// This is based on the example from uWebsocket.js using Promise instead of callbacks
import { HttpResponse } from './base/types'
/**
 * Just to help get rip of that stupid TS warning
 * @param {array} args anything (mostly string)
 * @param {boolean} str turn it into a string
 * @return {any} concat buffer
 */
function bconcat(args: Array<any>, str?: boolean): any {
  const b = Buffer.concat(args)
  return str ? b.toString() : b
}

// Reading buffer from response and return the json object
export async function readJsonAsync(res: HttpResponse):  Promise<any> {
  return new Promise((resolver: (value: unknown) => void, rejecter: (reason?: any) => void) => {
    let buffer: any
    res.onData((ab: any, isLast: boolean) => {
      const chunk = Buffer.from(ab)
      if (isLast) {
        let json: string
        if (buffer) {
          try {
            json = JSON.parse(bconcat([buffer, chunk], true)) // Buffer to string
          } catch(e) {
            res.close() // Do we need to call close here?

            return rejecter(e)
          }
          return resolver(json)
        } else {
          try {
            json = JSON.parse(chunk.toString())
          } catch(e) {
            res.close()

            return rejecter(e)
          }
        }

        return resolver(json)
      } else {
        buffer = buffer ? bconcat([buffer, chunk]) : bconcat([chunk])
      }
    })

    res.onAborted(rejecter)
  }) // end promise
}
