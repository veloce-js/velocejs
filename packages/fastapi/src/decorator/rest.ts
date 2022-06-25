/**
  We change the thinking about how to init the server
  before it was using the Prepare method that needs to call super.run
  which is ugly

  Here we will try to apply the Decorator at the Class level
  and see if we could do it with just init the new class and everything should run
*/
import type { AnyTypeArr, AnyType } from '../types'
import { routeKey, validationKey, protectedKey } from './keys'
import { pickInputFile, tsClassParser } from '@jsonql/ast'

import { METHOD_TO_RUN } from '../lib/constants'
import debugFn from 'debug'
const debug = debugFn('velocejs:fastapi:rest')
// import debug from 'debug'
// const debugFn = debug('velocejs:fastapi:decorator:Rest')
/** This should be generic that could apply to different Decorator init */
// @NOTE no matter what you do here - there will always be warning, just one or many many ...
// export function Rest<T extends { new (...args: AnyTypeArr): Record<string, unknown> }>(constructor: T) {
/** if we follow what the type hint said, the this object becomes useless */
export function Rest<T extends { new (...args: AnyTypeArr): {} }>(constructor: T) {
  // Voodoo magic
  const where = pickInputFile(new Error())
  // from https://stackoverflow.com/questions/51124979/typescript-calling-class-methods-inside-constructor-decorator
  // But this will create a Typescript error `method prepare does not exist on Anonymous class`
  // another way to get around with the properties not able to bind to the constructor.protoype
  // https://stackoverflow.com/questions/48599889/typescript-adding-methods-with-decorator-type-does-not-exist
  return class extends constructor {
    constructor (...args: AnyTypeArr) {
      super(...args)
      tsClassParser(where)
        .then(map => {
          debug('ast map', map)
          const target = constructor.prototype
          const existingRoutes = Reflect.getOwnMetadata(routeKey, target) || []
          const validations = Reflect.getOwnMetadata(validationKey, target) || []
          const protectedRoute = Reflect.getOwnMetadata(protectedKey, target) || []
          // @NOTE little trick to get rip of the method-not-exist warning
          this[METHOD_TO_RUN](map, existingRoutes, validations, protectedRoute)
        })
    }
  }
}
