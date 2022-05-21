// this is taken out from util and expand it's capability
// import { UrlPattern } from './url'
import type { UwsStringPairObj } from './types'
// the actual function to take the query apart
export function parseQuery(query: string): UwsStringPairObj {
  const params = new URLSearchParams(query)
  const result = {}
  for (const pair of params.entries()) {
   result[ pair[0] ] = pair[1]
  }

  return result
}
