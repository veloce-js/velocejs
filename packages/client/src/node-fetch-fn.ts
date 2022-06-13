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

// main
export default async function main(
  params: HttpMethodParams
): Promise<Response> {
  const { url, method, payload } = params
  const options: RequestInit = {}
  if (method) {
    options.method = method
    if (payload) {
      options.body = JSON.stringify(payload)
    }
  }
  // @TODO headers
  options.headers = {'x-client': 'Velocejs'}
  console.log('fetch options', options)
  // just stub it for now
  return fetch(url, options)
}
