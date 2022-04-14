// all decorators are here
import {
  RouteMetaInfo,
  DescriptorMeta,
  // RouteOptions next when develop protected route
} from '../../types'
import { STATIC_TYPE, STATIC_ROUTE, RAW_TYPE } from '@velocejs/server/src/base/constants'
import { routeKey } from './keys'
// import { extractArgs } from '../lib/extract'
import { FastApiInterface } from '../fast-api-interface'
// The inner decorator factory method
function innerDecoratorFactory(type: string, path: string, routeType?: string) {
  // this is the actual api facing the class method
  // @TODO create a type fo a generic class instance
  return (target: FastApiInterface, propertyName: string, descriptor: DescriptorMeta) => {
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
        meta.route = routeType // this is the GET, POST etc etc
        break
      case STATIC_TYPE:
        meta.type = STATIC_TYPE
        meta.route = STATIC_ROUTE
        break
      default:
        // this get replace by the AST map
        // meta.args = extractArgs(descriptor.value.toString())
        meta.type = type
    }
    existingRoutes.push(meta)
    // console.log('existingRoutes', existingRoutes)
    Reflect.defineMetadata(routeKey, existingRoutes, target)
  }
}

// allow dev to define a raw handler - we don't do any processing
export function Raw(route: string, path: string) {

  return innerDecoratorFactory(RAW_TYPE, path, route)
}

// special decorator to create a serveStatic method
// Accessor Decorator
export function ServeStatic(path: string) {

  return innerDecoratorFactory(STATIC_TYPE, path)
}

// Factory method to create factory method
function routeDecoratorFactory(routeType: string) {
  // give it a name for easy debug
  return (path: string /*, opts?: RouteOptions*/) => {

    return innerDecoratorFactory(routeType, path /*, opts */)
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
// TBC what these two for
// export const CONNECT = routeDecoratorFactory('connect')
// export const TRACE = routeDecoratorFactory('trace')

// this decorator is going to pass as the onAbort handler
// @BUG there is a problem here how to id this aborter with the route
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
