// built-in fetch client
import { GenericKeyValue } from './types'
/** Fetch Wrapper */
export async function f(
  url: string,
  method: string,
  params?: GenericKeyValue,
  options?: GenericKeyValue
) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' }, // @TODO change to jsonql next
    body: ''
  }
  // @TODO lots of things to do here
  if (method === 'get') {
    const query: string[] = []
    for (const key in params) {
      query.push(`${key}=${params[key]}`)
    }
    url = url + '?' + query.join('&')
  } else {
    opts.body = JSON.stringify(params)
  }
  return fetch(
    url,
    options ? Object.assign(opts, options) : opts
  )
  .then((res: any) => res.json()) // always return a json
}
