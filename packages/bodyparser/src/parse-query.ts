// this is taken out from util and expand it's capability
// import { UrlPattern } from './url'
import type { UwsStringPairObj } from './types'
import debugFn from 'debug'
const debug = debugFn('velocejs:bodypaser:parse-query')
// the actual function to take the query apart
export function parseQuery(
  query: string,
  config?: UwsStringPairObj
): UwsStringPairObj {
  const params = new URLSearchParams(query)
  const result = {}
  for (const pair of params.entries()) {
   result[ pair[0] ] = pair[1]
  }
  if (config) {
    debug('config', config) // we will use this to decide what should keep
  }
  

  return result
}
