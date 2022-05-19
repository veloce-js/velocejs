// all decorators are here
import type {
  RouteMetaInfo,
  // UwsStringPairObj,
  // DescriptorMeta,
  RouteOptions //next when develop protected route
} from '../types'
import { UrlPattern } from '@velocejs/bodyparser'
import {
  STATIC_TYPE,
  STATIC_ROUTE,
  GET_ROUTE_NAME,
  RAW_TYPE,
} from '@velocejs/server'
import { routeKey } from './keys'
// import { extractArgs } from '../lib/extract'
import { FastApiInterface } from '../lib/fast-api-interface'
import { WEBSOCKET_ROUTE_NAME } from '@velocejs/server'

/** make sure the dynamic route only apply on GET route */
const assertRoutePath = (type: string, path: string) => {
  if (type !== GET_ROUTE_NAME && UrlPattern.check(path)) {
    throw new Error(`Dynamic route is not allow with ${type} route`)
  }
}
// util
const getOpt = (name: string, opts?: RouteOptions) => opts ? opts[name] : opts

/** The actual factory metod to generate the call **/
function innerDecoratorFactory(type: string, path: string, opts?: RouteOptions) {
  // validate the url here then we won't get problem later in the class
  assertRoutePath(type, path)

  return (
    target: FastApiInterface,
    propertyName: string
  /*, descriptor: DescriptorMeta*/
  ) => {
    // console.log('descriptor', descriptor)
    const existingRoutes = Reflect.getOwnMetadata(routeKey, target) || []
    const meta: RouteMetaInfo = {
      propertyName,
      path,
      type: ''
    }
    switch (type) {
      case RAW_TYPE:
        meta.type = RAW_TYPE
        meta.route = opts ? opts.routeType : GET_ROUTE_NAME // this is the GET, POST etc etc
        break
      case STATIC_TYPE:
        meta.type = STATIC_TYPE
        meta.route = STATIC_ROUTE
        break
      default:
        meta.type = type
        meta.excluded = getOpt('excluded', opts) // passing this back for use later
        // meta.protected = getOpt('protected', opts)
    }
    // we should check if the same type already defined the same path
    if (!existingRoutes.filter( // not found
      (route: RouteMetaInfo) => route.type === type && route.path === path
    ).length) {
      existingRoutes.push(meta)
      // console.log('existingRoutes', existingRoutes)
      Reflect.defineMetadata(routeKey, existingRoutes, target)
    } else {
      throw new Error(`${path} already defined with ${type}!`)
    }
  }
}

// allow dev to define a raw handler - we don't do any processing
export function Raw(routeType: string, path: string) {

  return innerDecoratorFactory(RAW_TYPE, path, { routeType })
}

/** special decorator to create a serveStatic method, you could specify a routeType default to GET */
// Accessor Decorator
export function ServeStatic(path: string) {
  // @TODO the options is not apply fully
  return innerDecoratorFactory(STATIC_TYPE, path)
}

// Factory method to create factory method
function routeDecoratorFactory(routeType: string) {
  // @TODO if they didn't provide a path then we could use the propertyName as path
  return (path: string, opts?: RouteOptions) => {
    // 0.7.4 We use the opts to do further customization for the route such as exclude from contract
    return innerDecoratorFactory(routeType, path , opts)
  }
}
// making the decorators
export const Any = routeDecoratorFactory('any')
export const Get = routeDecoratorFactory('get')
export const Post = routeDecoratorFactory('post')
export const Put = routeDecoratorFactory('put')
export const Options = routeDecoratorFactory('options')
export const Del = routeDecoratorFactory('del')
export const Patch = routeDecoratorFactory('patch')
export const Head = routeDecoratorFactory('head')
// Websocket - the s is lowercase to avoid the WebSocket type
export const Websocket = routeDecoratorFactory(WEBSOCKET_ROUTE_NAME)

// TBC what these two for
// export const CONNECT = routeDecoratorFactory('connect')
// export const TRACE = routeDecoratorFactory('trace')

// this decorator is going to pass as the onAbortHandler
// @BUG there is a problem here how to id this aborter with the route
// May be we should only allow one aborter to handle all
/** @deprecated it will move to the override hook */
export function Aborted(type: string, path: string) {

  return (
    target: FastApiInterface,
    propertyName: string
    // descriptor: TypedPropertyDescriptor<(meta: RouteMetaInfo[]) => void>
  ): void => {
    const meta: RouteMetaInfo[] = Reflect.getOwnMetadata(routeKey, target)
    const existingRoutes = meta.map((m: RouteMetaInfo) => {
      if (m.type === type && m.path === path) {
        m.onAbortedHandler = propertyName
      }
      return m
    })
    Reflect.defineMetadata(routeKey, existingRoutes, target)
  }
}
