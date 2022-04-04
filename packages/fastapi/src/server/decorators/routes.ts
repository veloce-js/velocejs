// all decorators are here

import { RouteMetaInfo, MetaDecorator } from '@velocejs/server/dist/types'
import { STATIC_TYPE, STATIC_ROUTE, RAW_TYPE } from '@velocejs/server/dist/constants'
import { routeKey, argsKey } from './routekey'


// this is the inner decorator factory method
function innerDecoratorFactory(type: string, path: string, routeType?: string) {
  // this is the actual api facing the class method
  return (target: any, propertyName: string) => {
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
export function Raw(route: string, path: string) {

  return innerDecoratorFactory(RAW_TYPE, path, route)
}

// special decorator to create a serveStatic method
export function ServeStatic(path: string) {

  return innerDecoratorFactory(STATIC_TYPE, path)
}

// This must be run on the overload method in the sub-class
// otherwise the meta data becomes empty
export function Prepare(
  target: any,
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
    const validation = Reflect.getOwnMetadata(argsKey, target)
    
    return Reflect.apply(fn, this, [meta, validation])
  }
}
// alias to PREPARE
export const Main = Prepare
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
export function Aborted(type: string, path: string) {

  return (
    target: any,
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
