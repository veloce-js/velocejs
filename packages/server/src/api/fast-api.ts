// this will allow you to create a series of REST API in no time
import { HttpResponse, HttpRequest } from 'uWebSockets.js'
import { UwsRouteSetup, UwsRouteHandler, UwsParsedResult } from '../base/interfaces'
import { UwsServer } from '../base/uws-server-class'
import { RouteMetaInfo } from './type'
import { bodyParser } from '../base/body-parser'
// We are not going to directly sub-class from the uws-server-class
// instead we create an instance of it
export class FastApi {

  constructor(private uwsInstance: UwsServer) {}

  // wrapper for the UwsServer create server method
  private createServer(routes: UwsRouteSetup[]) {
    this.uwsInstance.run(routes)
  }

  // transform the string name to actual method
  private mapMethodToHandler(propertyName: string, onAbortedHandler?: string): UwsRouteHandler {
    const fn = this[propertyName]

    return async (res: HttpResponse, req: HttpRequest) => {
      // add onAbortedHandler
      if (onAbortedHandler) {
        res.onAborted(() => {
          Reflect.apply(this[onAbortedHandler], this, [])
        })
      }
      // process input
      const result = await bodyParser(res, req)
      const extra = { res, req }
      const payload: UwsParsedResult = Object.assign(result, extra)

      const reply = Reflect.apply(fn, this, [ payload ])

      // if the method return a result then we will handle it
      // otherwise we assume the dev handle it in their method
      if (reply) {
        res.end(reply)
      }
    }
  }

  // Mapping all the string name to method and supply to UwsServer run method
  public run(meta: RouteMetaInfo[]): void {
    this.createServer(
      meta.map(m => {
        const { path, type, propertyName, onAbortedHandler } = m
        const handler = this.mapMethodToHandler(propertyName, onAbortedHandler)
        return {
          type,
          path,
          handler
        }
      })
    )
  }

  // @TODO couple factory method for easier to use with UwsServer
  /*
  private createSetHeader(res: HttpResponse) {

    return () => {
      res.writeHeader()
    }
  }

  private createSetStatus(res: HttpResponse) {

    return () => {
      res.writeStatus()
    }
  }
  */
}
