// this is taken out from util and expand it's capability
import { UrlPattern } from './url-pattern'
import type {
  UwsStringPairObj,
  UwsBodyParserOptions
} from './types'
import debugFn from 'debug'
const debug = debugFn('velocejs:bodypaser:parse-query')
// the actual function to take the query apart
export function parseQuery(
  query: string,
  config?: UwsBodyParserOptions
): UwsStringPairObj {
  const {
    stripUnderscoreParam,
    originalRouteDef
  } = config as UwsBodyParserOptions
  // process the query parameter first if any
  let params = processQueryParameters(query, stripUnderscoreParam)
  // next if we provide the url for analysis and if it's a dynamic route
  if (originalRouteDef) {
    params = Object.assign(
      params,
      processDynamicRoute(query, originalRouteDef)
    )
  }
  return params
}

/** break up the process to make the main interface cleaner */
function processQueryParameters(
  query: string,
  stripUnderscoreParam?: boolean
) {
  const params = new URLSearchParams(query)
  const result = {}
  for (const pair of params.entries()) {
    const key = pair[0]
    if (stripUnderscoreParam) {
      if (key.substring(0,1) === '_') {
        continue
      }
    }
    result[ key ] = pair[1]
  }
  return result
}

/** process dynamic route */
function processDynamicRoute(
  query: string,
  originalRouteDef?: string
) {
  if (UrlPattern.check(originalRouteDef)) {
    debug(`originalRouteDef`, query)
  }

  return {}
}
