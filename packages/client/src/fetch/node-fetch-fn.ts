// using node-fetch
// as experiement interface keep the same as the fetch api for compatibility
import fetch from 'node-fetch'
import type {
  Response,
  RequestInit
} from 'node-fetch/@types/index'
import type {
  HttpMethodParams,
  Whatever,
} from '../types'
import { DEFAULT_HEADERS } from '../lib/constants'
import { isJsonLike } from '../lib/common'
// main
export default async function main(
  params: HttpMethodParams
): Promise<Whatever> {
  const { url, method, payload } = params
  const options: RequestInit = {}
  if (method) {
    options.method = method
    if (payload) {
      options.body = JSON.stringify(payload)
    }
  }
  options.headers = Object.assign(
    params.headers || {}
  , DEFAULT_HEADERS)
  // console.log('fetch options', options, params)
  // just stub it for now
  return fetch(url, options)
                .then((res: Response) =>
                  isJsonLike(res.headers.raw()) ? res.json() : res.text()
                )
                // @TODO if the result contains `error` then we need to deal with it here
}
