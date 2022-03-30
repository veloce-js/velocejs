// this will allow you to create a series of REST API in no time
/*
import {
  GET,
  POST,

} from './decodecorators'
*/
import { UwsRouteHandler } from '../base/interfaces'

export class FastRestApi {
  // this will store all the routes with path: string --> handler: (res, req) => void interface
  private routes: Array<UwsRouteHandler> = []

  // setter for routes
  set addRoute(route: UwsRouteHandler) {
    this.routes.push(route)
  }

  // this will be the main method to call when use
  // this will get pass to the UwsServer.run method
  public expose() {
    return this.routes
  }

}
