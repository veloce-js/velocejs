// all decorators are here
import 'reflect-metadata'
import { RouteMetaInfo, MetaDecorator } from './type'
import { FastApi } from './fast-api'
// The key to id the meta info
const routeKey = Symbol("FastApiRouteKey")

// Factory method to create factory method
function routeDecoratorFactory(routeType: string): MetaDecorator {

  return function(path: string) {

    return (target: FastApi, propertyName: string) => {
      // all it does it to record all this meta info and we can re-use it later
      const existingRoutes = Reflect.getOwnMetadata(routeKey, target) || []
      const meta: RouteMetaInfo = { propertyName, path, type: routeType }
      existingRoutes.push(meta)
      // console.log('existingRoutes', existingRoutes)
      Reflect.defineMetadata(routeKey, existingRoutes, target)
    }
  }
}

// this will not get expose as we only use this internally
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
      throw new Error(`Fn is undefined!`)
    }
    // console.log('meta', meta)

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
// special decorator to create a serveStatic method
export function SERVE_STATIC(path: string) {

  return (target: FastApi, propertyName: string) => {
    // all it does it to record all this meta info and we can re-use it later
    const existingRoutes = Reflect.getOwnMetadata(routeKey, target) || []
    const meta: RouteMetaInfo = { propertyName, path, type: 'static' }
    existingRoutes.push(meta)
    // console.log('existingRoutes', existingRoutes)
    Reflect.defineMetadata(routeKey, existingRoutes, target)
  }
}


// experiemental

export function TEST_META(...args: any[]) {
  console.log(args)
}
