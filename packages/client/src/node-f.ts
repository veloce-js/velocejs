// using node-fetch
// as experiement interface keep the same as the fetch api for compatibility
import fetch from 'node-fetch'
import type {
  RequestInit,
  Response
} from 'node-fetch/@types/index'
export { Response } 

// main
export default async function main(url: string, options?: RequestInit) {
  /*
  const opts = {
    headers: { 'Content-Type': 'application/json' }, // @TODO change to jsonql next
  }
  if (options?.method && options.method !== 'get') {
    options.
  }
  */
  // just stub it for now
  return fetch(url, options)
            // .then((res: Response) => res.json())
}
