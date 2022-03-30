// this will allow you to create a series of REST API in no time
/*
import {
  GET,
  POST,

} from './decodecorators'
*/

function GET(path: string) {

  return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
    console.log(target)
    console.log(memberName)
    console.log(propertyDescriptor)

    const me = this as FastRestApi

    console.log(me)

    return propertyDescriptor
  }
}


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


  @GET('/some-func')
  public someFunc() {
    
  }

}
