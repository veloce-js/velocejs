// this is taken out from util and expand it's capability
import type {
  // UwsStringPairObj,
  UwsBodyParserOptions
} from './types'
import {
  QUERY_PARAM,
  DYNAMIC_NAMES,
  DYNAMIC_PARAM,
} from './constants'
import {
  UrlPattern
} from './url-pattern'

import debugFn from 'debug'
const debug = debugFn('velocejs:bodypaser:parse-query')
// the actual function to take the query apart
export function parseQuery(
  query: string,
  config?: UwsBodyParserOptions
) {
  const {
    stripUnderscoreParam,
    originalRouteDef
  } = config as UwsBodyParserOptions
  let params = {
    [QUERY_PARAM]: processQueryParameters(query, stripUnderscoreParam)
  }
  // process the query parameter first if any
  // next if we provide the url for analysis and if it's a dynamic route
  if (originalRouteDef) {
    params = Object.assign(
      params,
      processDynamicRoute(query, originalRouteDef)
    )
  }
  // only one way or the other, not allow to mix and match
  return params
}

/** break up the process to make the main interface cleaner */
export function processQueryParameters(
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
  const url = originalRouteDef as string
  if (UrlPattern.check(url)) {
    debug(`originalRouteDef`, query)
    const obj = new UrlPattern(url)

    return {
      [DYNAMIC_PARAM]: obj.parse(query),
      [DYNAMIC_NAMES]: obj.names
    }
  }

  return {}
}
