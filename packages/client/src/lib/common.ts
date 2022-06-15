// share common methods
import {
  JsonqlContractEntry,
  GenericKeyValue,
  Whatever
} from '../types'
// @TODO create a separate module and import on demand?
import UrlPattern from 'url-pattern'
import {
  DYNAMIC_ROUTE_PATTERN,
  DEFAULT_REQUEST_METHOD,
  CONTENT_TYPE,
} from './constants'

/**  construct the url for different type of methods */
export function prepareUrl(
  entry: JsonqlContractEntry,
  args: GenericKeyValue
): string {
  const route = entry.route as string
  // handle dynamic route
  if (route.indexOf(DYNAMIC_ROUTE_PATTERN) > -1) {
    const lib = new UrlPattern(route)
    const names = getNamesFromDynamicUrl(route)
    const params = getParamsForDynamicRoute(args, names)

    return lib.stringify(params)
  }
  // ugly but works ...
  if (entry.type === DEFAULT_REQUEST_METHOD && hasArgs(args)) {
    return createQueryUrl(route, args)
  }
  return route
}

/** extract the name from the dynamic url for reconstruct the url, from bodyparser */
export function getNamesFromDynamicUrl(url: string): string[] {
  const parts = url.split(DYNAMIC_ROUTE_PATTERN)
  parts.shift()
  return parts.map((part: string) =>
    part.replace('(','').replace(')','')
  )
}

/** just check if the arguments has key but not account for the value is array */
export function hasArgs(args: Whatever) {
  return !!Object.keys(args).length
}

/** extra the array argument to pass to the UrlPattern lib to construct dynamic url */
export function getParamsForDynamicRoute(
  args: GenericKeyValue,
  names: string[]
) {
  let params: Array<string | number> = [] // it has to be primitive type for url pattern
  // good thing is in the previous call they already been prepared
  for (const key in args) {
    const value = args[key]
    if (Array.isArray(value)) {
      params = params.concat(value)
    } else {
      params.push(value)
    }
  }
  return params.map(
    (param: string | number, i: number) => ({
      [names[i]]: param
    })
  ).reduce((a, b) => Object.assign(a, b), {})
}

/** wrap this in one function and we could replace the internal later */
export function createQueryUrl(
  route: string,
  args: GenericKeyValue
) {
  const url = route + '?'
  const params: string[] = []
  for (const key in args) {
    params.push(`${key}=${args[key]}`)
  }
  return url + params.join('&')
}

/** check if the incoming header looks like json */
export function isJsonLike(headers: GenericKeyValue) {
  const ct = CONTENT_TYPE.toLowerCase()
  return (headers[ct] && headers[ct].indexOf('json') > -1)
}
