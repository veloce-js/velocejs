// this will allow you to create a series of API in no time
import {
  UwsServer,
  bodyParser,
  serveStatic,
  // lookupStatus,
  getWriter,
  jsonWriter
} from '@velocejs/server/src' // point to the source ts
import {
  HttpResponse,
  HttpRequest,
  UwsRouteSetup,
  UwsRouteHandler,
  // UwsParsedResult,// <-- this is no longer in use
  UwsRespondBody,
  UwsWriter,
  UwsJsonWriter
} from '@velocejs/server/src/types' // point to the source ts
import {
  RouteMetaInfo
} from '../types'
import {
  STATIC_TYPE,
  STATIC_ROUTE,
  RAW_TYPE,
  IS_OTHER
} from '@velocejs/server/src/base/constants'

// We are not going to directly sub-class from the uws-server-class
// instead we create an instance of it
export class FastApi {
  private written = false
  protected payload: UwsRespondBody | undefined
  protected res: HttpResponse | undefined
  protected req: HttpRequest | undefined
  // this will be storing the write queue
  protected writer: UwsWriter = () => { console.log('stupid') }
  protected jsonWriter: UwsJsonWriter = () => { console.log('stupid') }

  // store the UWS server instance as protected
  constructor(protected uwsInstance: UwsServer) {}

  // When we call the user provided method, we will pass them the payload.params pass instead of
  // the whole payload, and we keep them in a temporary place, and destroy it once the call is over
  private setTemp(payload: UwsRespondBody, res: HttpResponse /*, req?: HttpRequest */) {
    this.written = false
    this.payload = payload
    this.res = res
    // this.req = req
    // create a jsonWriter and a writer
    // add a guard to prevent accidental double write
    const _writer = getWriter(res)
    this.writer = (...args: Array<any>): void => {
      if (!this.written) {
        this.written = true
        Reflect.apply(_writer, null, args)
      }
    }
    const _jsonWriter = jsonWriter(res)
    this.jsonWriter = (...args: Array<any>): void => {
      if (!this.written) {
        this.written = true
        Reflect.apply(_jsonWriter, null, args)
      }
    }
  }

  // call this after the call finish
  private unsetTemp() {
    ['res', 'payload', 'writer', 'jsonWriter'].forEach(fn => {
      this[fn] = undefined
    })
    this.written = false
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
        // now we destroy the temp stuff
        // we wrap this in a set timeout is a node.js thing to create a nextTick effect
        // if the method return a result then we will handle it
        // otherwise we assume the dev handle it in their method
        if (reply && !this.written) {
          switch (type) {
            case IS_OTHER:
              getWriter(res)(reply)
              break
            default:
              jsonWriter(res)(reply)
          }
        }
      } catch (e) {
        console.log(`ERROR with`, propertyName, e)
        res.close()
      } finally {
        setTimeout(() => {
          this.unsetTemp()
        }, 0)
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
              // the method just return the path to the files
              // We change this to be a accessor decorator which a getter
              handler: serveStatic(this[propertyName])
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
      // @TODO should give an option to not start the server right the way
      this.uwsInstance.start()
    })
  }
}
