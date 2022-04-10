/**
  We change the thinking about how to init the server
  before it was using the Prepare method that needs to call super.run
  which is ugly

  Here we will try to apply the Decorator at the Class level
  and see if we could do it with just init the new class and everything should run
*/

import { routeKey } from './routekey'

export function Rest<T extends { new (...args: any[]): {} }>(ctr: T) {

  const existingRoutes = Reflect.getOwnMetadata(routeKey, ctr.prototype) || []

  console.log('existingRoutes', existingRoutes)

  // ctr.prototype.id = Math.random();
  // ctr.prototype.created = new Date().toLocaleString("es-ES");
}
