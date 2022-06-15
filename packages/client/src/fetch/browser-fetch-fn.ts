// the browser bundle entry point
import type {
  HttpMethodParams,
  Whatever,
} from '../types'
import { DEFAULT_HEADERS } from '../lib/constants'
import { isJsonLike } from '../lib/common'

/**
check the type of the payload and decided what to do
*/
function prepareBody(payload: any) {
  return payload instanceof FormData
       ? payload
       : (typeof payload === 'object' ? JSON.stringify(payload)
                                      : payload)
}

// browser fetch wrapper
export default async function main(
  params: HttpMethodParams
): Promise<Whatever> {
  const { url, method, payload } = params
  const options: RequestInit = {}
  if (method) {
    options.method = method
    if (payload) {
      options.body = prepareBody(payload)
    }
  }
  options.headers = Object.assign(
    params.headers || {}
  , DEFAULT_HEADERS)
  // console.log('fetch options', options, params)
  // just stub it for now
  return fetch(url, options)
                .then((res: Response) =>
                  isJsonLike(res.headers) ? res.json() : res.text()
                )
                // @TODO if the result contains `error` then we need to deal with it here
}
