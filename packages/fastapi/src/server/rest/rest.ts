/**
  We change the thinking about how to init the server
  before it was using the Prepare method that needs to call super.run
  which is ugly

  Here we will try to apply the Decorator at the Class level
  and see if we could do it with just init the new class and everything should run
*/
import { astKey, routeKey, argsKey } from './keys'
import { astParser } from '../lib/ts-ast-parser'

export function Rest<T extends { new (...args: any[]): {} }>(constructor: T) {
  // this solve the path problem for where the actual script we want to run the parser on
  // console.log(process.argv[1])

  const astMap = Reflect.getOwnMetadata(astKey, target)
  if (!astMap) {
    const map = await astParser(process.argv[1])
    Reflect.defineMetadata(astKey, map, target)
  }

  const existingRoutes = Reflect.getOwnMetadata(routeKey, constructor.prototype) || []
  const validations = Reflect.getOwnMetadata(argsKey, constructor.prototype) || []
  // from https://stackoverflow.com/questions/51124979/typescript-calling-class-methods-inside-constructor-decorator
  // But this will create a Typescript error `method prepare does not exist on Anonymous class`
  // another way to get around with the properties not able to bind to the constructor.protoype
  // https://stackoverflow.com/questions/48599889/typescript-adding-methods-with-decorator-type-does-not-exist
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args)
      // @ts-ignore: prepare does not exist on Anonymous class (it does on FastApi)
      this.prepare(existingRoutes, validations)
    }
  }
}
