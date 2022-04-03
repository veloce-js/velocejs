// all decorators are here
import 'reflect-metadata'
import { RouteMetaInfo, MetaDecorator } from '@velocejs/server/types'
import { FastApi } from '../fast-api'
import { STATIC_TYPE, STATIC_ROUTE, RAW_TYPE } from '@velocejs/server/constants'
import { routeKey } from './routekey'


// this is the inner decorator factory method
function innerDecoratorFactory(type: string, path: string, routeType?: string) {
  // this is the actual api facing the class method
  return (target: FastApi, propertyName: string) => {
    // all it does it to record all this meta info and we can re-use it later
    const existingRoutes = Reflect.getOwnMetadata(routeKey, target) || []
    const meta: RouteMetaInfo = { propertyName, path, type: '' }
    switch (type) {
      case RAW_TYPE:
        meta.type = RAW_TYPE
        meta.route = routeType
        break
      case STATIC_TYPE:
        meta.type = STATIC_TYPE
        meta.route = STATIC_ROUTE
        break
      default:
        meta.type = type
    }
    existingRoutes.push(meta)
    // console.log('existingRoutes', existingRoutes)
    Reflect.defineMetadata(routeKey, existingRoutes, target)
  }
}


// Factory method to create factory method
function routeDecoratorFactory(routeType: string): MetaDecorator {

  return function(path: string) {

    return innerDecoratorFactory(routeType, path)
  }
}

// allow dev to define a raw handler - we don't do any processing
export function RAW(route: string, path: string) {

  return innerDecoratorFactory(RAW_TYPE, path, route)
}

// special decorator to create a serveStatic method
export function SERVE_STATIC(path: string) {

  return innerDecoratorFactory(STATIC_TYPE, path)
}

// This must be run on the overload method in the sub-class
// otherwise the meta data becomes empty
export function PREPARE(
  target: FastApi,
  _: string, // propertyName is unused, just placeholder it
  descriptor: TypedPropertyDescriptor<(meta: RouteMetaInfo[]) => void>
): void {
  const fn = descriptor.value
  // console.log(descriptor)
  descriptor.value = function() {
    const meta = Reflect.getOwnMetadata(routeKey, target)
    if (!fn) {
      throw new Error(`Class method is undefined!`)
    }

    return Reflect.apply(fn, this, [meta])
  }
}
// making the decorators
export const ANY = routeDecoratorFactory('any')
export const GET = routeDecoratorFactory('get')
export const POST = routeDecoratorFactory('post')
export const PUT = routeDecoratorFactory('put')
export const OPTIONS = routeDecoratorFactory('options')
export const DEL = routeDecoratorFactory('del')
export const PATCH = routeDecoratorFactory('patch')
export const HEAD = routeDecoratorFactory('head')
// TBC what these two for
// export const CONNECT = routeDecoratorFactory('connect')
// export const TRACE = routeDecoratorFactory('trace')

// this decorator is going to pass as the onAbort handler
export function ABORTED(type: string, path: string) {

  return (
    target: FastApi,
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

// just for testing
/*
export function TEST_META(...args: any[]) {
  console.log(args)
}
*/
