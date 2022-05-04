// this will allow you to create a series of API in no time
import {
  UwsServer,
  serveStatic,
  getWriter,
  jsonWriter
} from '@velocejs/server'
import {
  AppOptions,
  HttpResponse,
  HttpRequest,
  UwsRouteSetup,
  UwsRouteHandler,
  UwsRespondBody,
  UwsWriter,
  UwsJsonWriter,
  UwsStringPairObj,
  RecognizedString
} from '@velocejs/server/index' // point to the source ts
import {
  STATIC_TYPE,
  STATIC_ROUTE,
  RAW_TYPE,
  IS_OTHER,
  CONTENT_TYPE
} from '@velocejs/server'
import {
  C417,
  lookupStatus
} from '@velocejs/server'
// our deps
import {
  RouteMetaInfo,
  MiddlewareFunction,
  // JsonValidationEntry,
} from './types'
import bodyParser from '@velocejs/bodyparser'
import { queuePromisesProcess, toArray } from '@jsonql/utils'
// here
import { createValidator } from './lib/validator'
import {
  FastApiInterface
} from './lib/fast-api-interface'
const isDebug = process.env.DEBUG
// dummy stuff
const placeholder = -1
const placeholderFn = (...args: any[] ) => { console.log(args) }

// We are not going to directly sub-class from the uws-server-class
// instead we create an instance of it
export class FastApi implements FastApiInterface {
  private _uwsInstance: UwsServer
  private _written = false
  private _headers: UwsStringPairObj = {}
  private _status: number = placeholder
  private _onConfigReady: Promise<any>
  private _onConfigWait: (value: unknown) => void = placeholderFn
  private _onConfigError: (value: unknown) => void = placeholderFn
  private _jsonValidationErrorStatus: string = C417
  // protected properties
  protected payload: UwsRespondBody | undefined
  protected res: HttpResponse | undefined
  protected req: HttpRequest | undefined
  protected writer: UwsWriter = placeholderFn
  protected jsonWriter: UwsJsonWriter = () => placeholderFn

  // store the UWS server instance when init
  constructor(config?: AppOptions) {
    this._uwsInstance = new UwsServer(config)
    // Due to the Decorator now using a Promise to apply the init property to the class
    // so we need to create an onWait mechanism that let the listen method to know
    // everything is ready
    this._onConfigReady = new Promise((resolver, rejecter) => {
      this._onConfigWait = resolver
      this._onConfigError = rejecter
    })
  }
  // instead of using a Prepare decorator and ugly call the super.run
  // we use a class decorator to call this method on init
  // Dev can do @Rest(config)
  protected prepare(routes: Array<RouteMetaInfo>):void {
    if (isDebug) {
      console.time('FastApiStartUp')
    }
    this._uwsInstance.autoStart = false
    try {
      // @TODO prepare the validation rules before as pass arg
      this._uwsInstance.run(this.prepareRoutes(routes))
      // create a nextTick effect
      setTimeout(() => {
        this._onConfigWait(true)
      }, 0)
    } catch(e) {
      this._onConfigError(e)
    }
  }

  // Mapping all the string name to method and supply to UwsServer run method
  private prepareRoutes(meta: RouteMetaInfo[]): Array<UwsRouteSetup> {

    return meta.map(m => {
        const { path, type, propertyName, validation, onAbortedHandler } = m

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
                validation,
                onAbortedHandler
              )
            }
          }
      })
  }

  // transform the string name to actual method
  private mapMethodToHandler(
    propertyName: string,
    argsList: Array<any>,
    validationInput: any, // this is the raw rules input by dev
    onAbortedHandler?: string
  ): UwsRouteHandler {
    const handler = this[propertyName]
    // the args now using the info from ast map , we strip one array only contains names for user here
    const argNames = argsList.map(arg => arg.name)
    const validateFn = createValidator(propertyName, argsList, validationInput)
    // @TODO need to rethink about how this work
    return async (res: HttpResponse, req: HttpRequest) => {
      const args1: Array<HttpResponse | HttpRequest | (() => void)> = [res, req]
      // add onAbortedHandler
      if (onAbortedHandler) {
        args1.push(this[onAbortedHandler])
      }
      // process input
      const result = await Reflect.apply(
        bodyParser as unknown as Function, null, args1)
      // this is a bit tricky if there is a json result
      // then it will be the first argument
      this.setTemp(result, res)
      const { params, type } = result
      // @TODO apply the validaton here, if it didn't pass then it will abort the rest
      // @TODO create a middleware stack machine here
      this.handleProtectedRoute()
        .then(() => {
          validateFn(params)
            // success
            .then(() => this.handleContent(argNames, params, handler, type, propertyName))
            .catch(({ errors, fields }) => {
              this.handleValidationError(errors, fields)
            })
        })
    }
  }

  /** this is where the stack get exeucted */
  private runMiddlewareStacks(middlewares: Array<any>): void {
    console.log('@TODO', middlewares)
  }

  // handle protected route
  private async handleProtectedRoute(): Promise<boolean> {
    console.log('@TODO handle protected route')
    return true
  }

  // break out from above to make the code cleaner
  private async handleContent(
    argNames: string[],
    params: any,
    handler: any,
    type: string,
    propertyName: string
  ) {
    const args2 = this.applyArgs(argNames, params)
    try {
      const reply = await Reflect.apply(handler, this, args2)
      if (reply && !this._written) {
        this.write(type, reply)
      }
    } catch (e) {
      console.log(`ERROR with`, propertyName, e)
      this.res?.close()
    } finally {
      this.unsetTemp()
    }
  }

  // handle the errors return from validation
  private handleValidationError(errors: string[], fields: string[]) {
    console.log('errors', errors)
    console.log('fields', fields)

    // clean up
    this.unsetTemp()
  }

  // take the argument list and the input to create the correct arguments
  private applyArgs(args: Array<string>, params: object) {
    return args.map(arg => params[arg])
  }

  // When we call the user provided method, we will pass them the payload.params pass instead of
  // the whole payload, and we keep them in a temporary place, and destroy it once the call is over
  private setTemp(
    payload: UwsRespondBody,
    res: HttpResponse
    /*, req?: HttpRequest */
  ): void {
    this._headers = {}
    this._status = placeholder
    this._written = false
    this.payload = payload
    this.res = res
    // this.req = req
    // create a jsonWriter and a writer
    // add a guard to prevent accidental double write
    const _writer = getWriter(res)
    this.writer = (...args: Array<any>): void => {
      if (!this._written) {
        this._written = true
        Reflect.apply(_writer, null, args)
      }
    }
    const _jsonWriter = jsonWriter(res)
    this.jsonWriter = (...args: Array<any>): void => {
      if (!this._written) {
        this._written = true
        Reflect.apply(_jsonWriter, null, args)
      }
    }
  }

  // call this after the call finish
  private unsetTemp() {
    // create a nextTick effect
    setTimeout(() => {
      ['res', 'payload', 'writer', 'jsonWriter'].forEach(fn => {
        this[fn] = undefined
      })
      this._written = false
      this._headers = {}
      this._status = placeholder
    }, 0)
  }

  // write to the client
  private write(type: string, payload: RecognizedString/* | object */): void {
    switch (type) {
      case IS_OTHER:
          this.writer(payload, this._headers, this._status)
        break
      default:
          // check if they set a different content-type header
          // if so then we don't use the jsonWriter
          for (const key in this._headers) {
            if (key.toLowerCase() === CONTENT_TYPE) {
              // exit here
              return this.writer(payload, this._headers, this._status)
            }
          }
          this.jsonWriter(payload, this._status)
    }
  }

  // if the dev use this to provide an extra header
  // then we can check if the contentType is already provided
  // if so then we don't use the default one
  protected writeHeader(key: string, value: string) {
    this._headers[key] = value
  }

  protected writeStatus(status: number) {
    this._status = status
  }

  // using a setter to trigger series of things to do with the validation map
  /*
  private set validationMap(validationMap: Array<any>) {
    console.log(validationMap)
  }
  */

  /** dev can register their global middleware here */
  public registerMiddleware(
    middlewares: MiddlewareFunction | Array<MiddlewareFunction>
  ): void {
    const _middlewares = toArray(middlewares)
    console.log(_middlewares)
  }

  // This is a global override for the status when validation failed
  public set validationErrorStatus(status: number) {
    this._jsonValidationErrorStatus = lookupStatus(status) || C417
  }

  /**
   * We remap some of the methods from UwsServer to here for easier to use
   */
  public async start(port?: number, host?: string): Promise<string> {
    if (port) {
      this._uwsInstance.portNum = port
    }
    if (host) {
      this._uwsInstance.hostName = host
    }

    return new Promise((resolver, rejecter) => {
      this._uwsInstance.onStart = resolver
      this._uwsInstance.onError = rejecter
      // finally start up the server
      this._onConfigReady
        .then(() => {
          this._uwsInstance.start()
          if (isDebug) {
            console.timeEnd('FastApiStartUp')
          }
        })
        .catch(e => {
          rejecter(e)
        })
    })
  }
  // wrapper around the shutdown
  public stop(): void {
    this._uwsInstance.shutdown()
  }
}
