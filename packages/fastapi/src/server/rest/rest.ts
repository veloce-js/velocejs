/**
  We change the thinking about how to init the server
  before it was using the Prepare method that needs to call super.run
  which is ugly

  Here we will try to apply the Decorator at the Class level
  and see if we could do it with just init the new class and everything should run
*/

import { routeKey } from './routekey'

export function Rest(config?: object | boolean) {

  return function RestClassDecorator<T extends { new (...args: any[]): {} }>(ctr: T) {

    const existingRoutes = Reflect.getOwnMetadata(routeKey, ctr.prototype) || []
    // We are able to get the exisitng routes here
    console.log('existingRoutes', existingRoutes)
    
    Reflect.apply(ctr.prototype.prepare, ctr.prototype, [existingRoutes, config])
  }
}
