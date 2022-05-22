// this is taken out from util and expand it's capability
import type {
  // UwsStringPairObj,
  UwsBodyParserOptions
} from './types'
import {
  QUERY_PARAM,
  DYNAMIC_NAMES,
  DYNAMIC_PARAM,
  STRIP_UNDERSCORE,
  ORG_ROUTE_REF,
  URL_PATTERN_OBJ,
} from './constants'
import {
  UrlPattern
} from './url-pattern'
import debugFn from 'debug'
const debug = debugFn('velocejs:bodypaser:parse-query')
// the actual function to take the query apart
export function parseQuery(
  url: string,
  query: string,
  config?: UwsBodyParserOptions
) {
  const c = config as UwsBodyParserOptions
  let params = {
    [QUERY_PARAM]: processQueryParameters(query, c[STRIP_UNDERSCORE])
  }
  // process the query parameter first if any
  // next if we provide the url for analysis and if it's a dynamic route
  if (c[URL_PATTERN_OBJ] || c[ORG_ROUTE_REF]) {
    params = Object.assign(
      params,
      processDynamicRoute(url, c)
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

/** wrap this together and divide the task here */
function processDynamicRoute(
  url: string,
  config: UwsBodyParserOptions
) {
  if (config[URL_PATTERN_OBJ]) {
    debug('parse url using UrlPattern')
    return processDynamicRouteByUrlPattern(url, config[URL_PATTERN_OBJ])
  }
  debug('parse url with pattern url')
  return processDynamicRouteWithOrgRef(url, config[ORG_ROUTE_REF])
}


/** process dynamic route */
function processDynamicRouteWithOrgRef(
  url: string,
  originalRouteDef?: string
) {
  const orgUrl = originalRouteDef as string
  if (UrlPattern.check(orgUrl)) {
    const obj = new UrlPattern(orgUrl)
    return processDynamicRouteByUrlPattern(url, obj)
  }
  return {}
}

/** if we pass this instance straight means we already did all the work before we call here*/
function processDynamicRouteByUrlPattern(
  url: string,
  urlPatternObj: UrlPattern
) {
  return {
    [DYNAMIC_PARAM]: urlPatternObj.parse(url),
    [DYNAMIC_NAMES]: urlPatternObj.names
  }
}
