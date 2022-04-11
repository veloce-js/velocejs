// this will allow you to create a series of API in no time
import {
  UwsServer,
  bodyParser,
  serveStatic,
  lookupStatus,
  getWriter,
  jsonWriter
} from '@velocejs/server/src' // point to the source ts
import {
  AppOptions,
  HttpResponse,
  HttpRequest,
  UwsRouteSetup,
  UwsRouteHandler,
  UwsRespondBody,
  UwsWriter,
  UwsJsonWriter,
  StringPairObj,
  RecognizedString
} from '@velocejs/server/src/types' // point to the source ts
import {
  STATIC_TYPE,
  STATIC_ROUTE,
  RAW_TYPE,
  IS_OTHER,
  CONTENT_TYPE
} from '@velocejs/server/src/base/constants'
// our deps
import {
  RouteMetaInfo,
  JsonValidationEntry
} from '../types'
const placeholder = -1
const placeholderFn = () => { console.log('placeholder') }
// We are not going to directly sub-class from the uws-server-class
// instead we create an instance of it
export class FastApi {
  private uwsInstance: UwsServer
  private written = false
  private headers: Array<StringPairObj> = []
  private status: number = placeholder
  protected payload: UwsRespondBody | undefined
  protected res: HttpResponse | undefined
  protected req: HttpRequest | undefined
  protected writer: UwsWriter = placeholderFn
  protected jsonWriter: UwsJsonWriter = () => placeholderFn
  // store the UWS server instance when init
  constructor(config?: AppOptions) {
    this.uwsInstance = new UwsServer(config)
  }
  // instead of using a Prepare decorator and ugly call the super.run
  // we use a class decorator to call this method on init
  // Dev can do @Rest(config)
  private prepare(
    routes: Array<RouteMetaInfo>,
    validations?: Array<JsonValidationEntry>
  ):void {
    console.log('REST CONFIG', routes, validations)
    // set the autoStart to false
    this.uwsInstance.autoStart = false
    // @TODO prepare the validation rules before as pass arg
    this.uwsInstance.run(this.prepareRoutes(routes /*, valdiation */))
  }

  // Mapping all the string name to method and supply to UwsServer run method
  private prepareRoutes(
    meta: RouteMetaInfo[]
    // validations?: Array<JsonValidationEntry>
  ): Array<UwsRouteSetup> {

    return meta.map(m => {
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
              handler: this.mapMethodToHandler(
                propertyName,
                m.args,
                onAbortedHandler
              )
            }
        }
      })
  }

  // transform the string name to actual method
  private mapMethodToHandler(
    propertyName: string,
    args: Array<string>,
    /*validationRule */
    onAbortedHandler?: string): UwsRouteHandler {
    const handler = this[propertyName]

    return async (res: HttpResponse, req: HttpRequest) => {
      const args1: Array<HttpResponse | HttpRequest | (() => void)> = [res, req]
      // add onAbortedHandler
      if (onAbortedHandler) {
        args1.push(this[onAbortedHandler])
      }
      // process input
      const result = await Reflect.apply(bodyParser, null, args1)
      // this is a bit tricky if there is a json result
      // then it will be the first argument
      const { params, type } = result
      this.setTemp(result, res)
      const args2 = this.applyArgs(args, params)
      // @TODO apply the valdiator here
      // if there is an error then it won't get call
      let reply = ''
      try {
        reply = await Reflect.apply(handler, this, args2)
        if (reply && !this.written) {
          this.write(type, reply)
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

  // take the argument list and the input to create the correct arguments
  private applyArgs(args: Array<string>, params: object): Array<any> {
    return args.map(arg => params[arg])
  }

  // When we call the user provided method, we will pass them the payload.params pass instead of
  // the whole payload, and we keep them in a temporary place, and destroy it once the call is over
  private setTemp(
    payload: UwsRespondBody,
    res: HttpResponse
    /*, req?: HttpRequest */
  ): void {
    this.headers = []
    this.status = placeholder
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
    this.headers = []
    this.status = placeholder
  }

  // write to the client
  private write(type: string, payload: RecognizedString | object): void {
    switch (type) {
      case IS_OTHER:
          this.writer(payload)
        break
      default:
          this.jsonWriter(payload)
    }
  }

  // if the dev use this to provide an extra header
  // then we can check if the contentType is already provided
  // if so then we don't use the default one
  protected writeHeader(key: string, value: string) {
    // we keep the structure for faster processing later
    this.headers.push({ key, value })
  }

  protected writeStatus(status: number) {
    const s = lookupStatus(status)
    if (s) {
      this.status = s
    }
  }



  /*
  private hasHeaderSet() {
    return this.headers.map(header => {
      if (header[CONTENT_TYPE]) {

      }
    })
  }
  */

  // using a setter to trigger series of things to do with the validation map
  /*
  private set validationMap(validationMap: Array<any>) {
    console.log(validationMap)
  }
  */






  /**
    We remap some of the methods from UwsServer to here for easier to use
    const myApp = new MyApi(new UwsServer())
    myApp.start()
         .then(serverInfo => {
           do things with it
         })
  **/
  public async start(port?: number, host?: string): Promise<string> {
    if (port) {
      this.uwsInstance.portNum = port
    }
    if (host) {
      this.uwsInstance.hostName = host
    }

    return new Promise((resolver, rejecter) => {
      this.uwsInstance.onStart = resolver
      this.uwsInstance.onError = rejecter
      // finally start up the server
      this.uwsInstance.start()
    })
  }
  // wrapper around the shutdown
  public stop(): void {
    this.uwsInstance.shutdown()
  }
}
