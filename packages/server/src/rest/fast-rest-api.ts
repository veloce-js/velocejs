// this will allow you to create a series of REST API in no time
import {
  GET,
  POST,

} from './decodecorators'



export class FastRestApi {
  // this will store all the routes with path: string --> handler: (res, req) => void interface
  private routes: any = {}

  // setter for routes
  set createRoute() {

  }

  // this will be the main method to call when use
  // this will get pass to the UwsServer.run method
  public expose() {

  }

}
