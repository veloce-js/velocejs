// using node-fetch
// as experiement interface keep the same as the fetch api for compatibility
import fetch from 'node-fetch'
import type {
  Response,
  RequestInit
} from 'node-fetch/@types/index'
import type {
  HttpMethodParams,
} from './types'
export { Response }
import { DEFAULT_HEADER } from './constants'
// main
export default async function main(
  params: HttpMethodParams
): Promise<JSON> {
  const { url, method, payload } = params
  const options: RequestInit = {}
  if (method) {
    options.method = method
    if (payload) {
      options.body = JSON.stringify(payload)
    }
  }
  // @TODO headers
  options.headers = Object.assign({
    'x-client': 'Velocejs'
  }, DEFAULT_HEADER)
  console.log('fetch options', options, params)
  // just stub it for now
  return fetch(url, options)
                .then((res: Response) => res.json() as unknown as JSON)
                // @TODO if the result contains the error then we need to deal with it here
}
