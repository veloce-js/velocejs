// this will allow you to create a series of REST API in no time
/*
import {
  GET,
  POST,

} from './decodecorators'
*/

export function GET(path: string, self: any) {

  return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {

    const fn = propertyDescriptor.value
    propertyDescriptor.value = () => {
      self.routes.push({
        type: 'get',
        path: path,
        handler: fn
      })

      return {
        type: 'get',
        path: path,
        handler: fn
      }
    }
    return propertyDescriptor
  }
}

import { UwsRouteHandler } from '../base/interfaces'

export class FastRestApi {
  // this will store all the routes with path: string --> handler: (res, req) => void interface
  static routes: Array<UwsRouteHandler> = []
  // it looks like unnecessary but we might want to do something with
  // the array so we do it like this here
  public expose(): /*Array<UwsRouteHandler>*/ void {
    for (let name in FastRestApi.routes) {
      console.log(name)
    }
  }

}
