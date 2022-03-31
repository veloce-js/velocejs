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

  private createServer(routes: UwsRouteSetup[]) {
    this.uwsInstance.run(routes)
  }

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
      // @TODO how to deal with different headers? 
      // output
      res.end(reply)
    }
  }

  // it looks like unnecessary but we might want to do something with
  // the array so we do it like this here

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
}
