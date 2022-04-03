// this will allow you to create a series of API in no time
import 'reflect-metadata'
import {
  UwsServer,
  bodyParser,
  serveStatic
} from '@velocejs/server'
import {
  HttpResponse,
  HttpRequest,
  RouteMetaInfo,
  UwsRouteSetup,
  UwsRouteHandler,
  UwsParsedResult
} from '@velocejs/server/types'
import {
  STATIC_TYPE,
  STATIC_ROUTE,
  RAW_TYPE
} from '@velocejs/server/constants'
// We are not going to directly sub-class from the uws-server-class
// instead we create an instance of it
export class FastApi {
  // store the UWS server instance as protected
  constructor(protected uwsInstance: UwsServer) {}

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
        switch (type) {
          case STATIC_TYPE:
            return {
              path,
              type: STATIC_ROUTE,
              // the method the dev defined just return the path to the files
              handler: serveStatic(Reflect.apply(this[propertyName], this, []))
            }
          case RAW_TYPE:
            return {
              path,
              type: m.route,
              handler: this[propertyName] // pass it straight through
            }
          default:
            return {
              type,
              path,
              handler: this.mapMethodToHandler(propertyName, onAbortedHandler)
            }
        }
      })
    )
  }

  // @TODO couple factory method for easier to use with UwsServer
  /*
  private createSetHeader(res: HttpResponse) {

    return (key: string, value: string) => {
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
