// this will allow you to create a series of API in no time
import {
  UwsServer,
  bodyParser,
  serveStatic,
  lookupStatus,
  getCorkWriter,
  writeJson
} from '@velocejs/server/src' // point to the source ts
import {
  HttpResponse,
  HttpRequest,
  UwsRouteSetup,
  UwsRouteHandler,
  // UwsParsedResult,// <-- this is no longer in use
  UwsRespondBody
} from '@velocejs/server/src/types' // point to the source ts
import {
  RouteMetaInfo
} from '../types'
import {
  STATIC_TYPE,
  STATIC_ROUTE,
  RAW_TYPE,
  IS_OTHER
} from '@velocejs/server/src/constants'
import {
  C200
} from '@velocejs/server/src/status'
// We are not going to directly sub-class from the uws-server-class
// instead we create an instance of it
export class FastApi {
  protected payload: UwsRespondBody | undefined
  protected res: HttpResponse | undefined
  protected req: HttpRequest | undefined
  // this will be storing the write queue
  protected headerQueue: Array<{key: string, value: string}> = []
  protected statusCode = C200

  // store the UWS server instance as protected
  constructor(protected uwsInstance: UwsServer) {}

  // When we call the user provided method, we will pass them the payload.params pass instead of
  // the whole payload, and we keep them in a temporary place, and destroy it once the call is over
  private setTemp(payload: UwsRespondBody, res: HttpResponse /*, req?: HttpRequest */) {
    this.payload = payload
    this.res = res
    // this.req = req
  }

  // call this after the call finish
  private unsetTemp() {
    this.res = undefined
    this.payload = undefined
    // this.req = undefined
  }

  // using a setter to trigger series of things to do with the validation map
  /*
  private set validationMap(validationMap: Array<any>) {
    console.log(validationMap)
  }
  */
  // wrapper for the UwsServer create server method
  private createServer(routes: UwsRouteSetup[]) {
    // set the autoStart to false
    this.uwsInstance.autoStart = false
    this.uwsInstance.run(routes)
  }

  // transform the string name to actual method
  private mapMethodToHandler(propertyName: string, onAbortedHandler?: string): UwsRouteHandler {
    const handler = this[propertyName]

    return async (res: HttpResponse, req: HttpRequest) => {
      const args1: Array<any> = [res, req]
      // add onAbortedHandler
      if (onAbortedHandler) {
        args1.push(this[onAbortedHandler])
      }
      // process input
      const result = await Reflect.apply(bodyParser, null, args1)
      // this is a bit tricky if there is a json result
      // then it will be the first argument
      const { params, type } = result
      const args2 = [ params ]
      this.setTemp(result, res)
      // @TODO apply the valdiator here
      // if there is an error then it will be the second parameter
      let reply
      try {
        reply = await Reflect.apply(handler, this, args2)
      } catch (e) {
        console.log(`ERROR with`, propertyName, e)
        res.close()
      } finally {
        setTimeout(() => {
          this.unsetTemp()
        }, 0)
      }
      // now we destroy the temp stuff
      // we wrap this in a set timeout is a node.js thing to create a nextTick effect
      // if the method return a result then we will handle it
      // otherwise we assume the dev handle it in their method
      if (reply) {
        switch (type) {
          case IS_OTHER:
            getCorkWriter(res)(reply+'')
            break
          default:
            writeJson(res, reply)
        }
      }
    }
  }

  // Mapping all the string name to method and supply to UwsServer run method
  public run(meta: RouteMetaInfo[] /*, validation?: Array<any> */): Promise<string> {
    // do things with the validation
    // this.validationMap = validation
    // run the server
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

    return new Promise((resolver) => {
      this.uwsInstance.onStart = resolver
      this.uwsInstance.start()
    })
  }

  // @TODO couple factory method for easier to use with UwsServer
  protected writeHeader(key: string, value: string): void {
    this.headerQueue.push({ key, value })
  }

  protected writeStatus(status: string | number): void {
    const _status = lookupStatus(status)
    if (!_status) {
      throw new Error(`${status} is not a correct HTTP response code`)
    }
    this.statusCode = _status as string
  }

  protected end(payload: any): void {
    this.res?.cork(() => {
      const res = this.res?.writeStatus(this.statusCode)
      this.headerQueue.forEach(header => res?.writeHeader(header.key, header.value))
      this.res?.end(payload)
    })
  }
}
