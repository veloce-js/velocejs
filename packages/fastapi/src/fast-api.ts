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
// our deps
import {
  RouteMetaInfo,
  MiddlewareFunction,
  // JsonValidationEntry,
} from './types'
import bodyParser from '@velocejs/bodyparser'
import { queuePromisesProcess, toArray } from '@jsonql/utils'
import { JsonqlValidationError } from '@jsonql/errors'
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
  private _validationErrStatus: number = 417
  // protected properties
  protected payload: UwsRespondBody | undefined
  protected res: HttpResponse | undefined
  protected req: HttpRequest | undefined
  protected writer: UwsWriter = placeholderFn
  protected jsonWriter: UwsJsonWriter = () => placeholderFn
  // override this then we could use this to add to the plugin list
  public validatorPlugins: Array<any> = [] // @TODO fix type

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
        const { path, type, propertyName, validation /*, onAbortedHandler */} = m
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
              handler: this._mapMethodToHandler(
                propertyName,
                m.args,
                validation,
                // onAbortedHandler
              )
            }
          }
      })
  }

  // transform the string name to actual method
  private _mapMethodToHandler(
    propertyName: string,
    argsList: Array<any>,
    validationInput: any, // this is the raw rules input by dev
    // onAbortedHandler?: string // take out
  ): UwsRouteHandler {
    const handler = this[propertyName]
    // the args now using the info from ast map , we strip one array only contains names for user here
    const argNames = argsList.map(arg => arg.name)
    const validateFn = this._createValidator(propertyName, argsList, validationInput)
    // @TODO need to rethink about how this work
    return async (res: HttpResponse, req: HttpRequest) => {
      // @0.3.0 we change the whole thing into one middlewares stack
      const stacks = [
        bodyParser,
        async (result: any) => {
          this._setTemp(result, res)
          return result
        },
        this._handleProtectedRoute,
        async (result: any) => {
          const { params, type } = result
          const args = this._applyArgs(argNames, params)
          return validateFn(args)
                    .then((validatedResult: any) => (
                      // the validatedResult could have new props
                      { args: this._applyArgs(argNames, validatedResult), type }
                    ))
                    .catch((err: JsonqlValidationError) => {
                      console.log('rethrow', err.message, err.detail)
                      // we need to rethrow it again with the addtional type info for _render
                      throw new JsonqlValidationError(err.message, {detail: err.detail, type})
                    })
        },
        async (result: any) => {
          const { type, args } = result

          return this._handleContent(args, handler, type, propertyName)
        }
      ]
      // run the middleware stacks
      return queuePromisesProcess(
        stacks,
        res,
        req,
        () => console.log(`@TODO`, 'define our own onAbortedHandler')
      )
      .catch((error: JsonqlValidationError) => {
        this._handleValidationError(error)
      })
      .finally(() => {
        this._unsetTemp()
      })

    }
  }

  // handle the errors return from validation
  private _handleValidationError(error: any) {
    const { detail, type } = error
    const payload = {
      errors: {
        detail: detail
      }
    }
    // this._status = this._validationErrStatus
    console.log(this._status)

    this._render(type, JSON.stringify(payload))
  }

  /** wrap the _createValidator with additoinal property */
  private _createValidator(
    propertyName: string,
    argsList: any,// @TODO fix type
    validationInput: any // @TODO fix type
  ) {
    return createValidator(
      propertyName,
      argsList,
      validationInput,
      this.validatorPlugins
    )
  }

  /** @TODO handle protected route */
  private async _handleProtectedRoute(
    bodyParserProcessedResult: any
  ): Promise<boolean> {
    // the value is bodyParser processed result
    console.info('@TODO handle protected route', bodyParserProcessedResult)
    return bodyParserProcessedResult
  }

  // break out from above to make the code cleaner
  private async _handleContent(
    args: any[],
    handler: any,
    type: string,
    propertyName: string
  ) {
    // const args2 = this._applyArgs(argNames, params)
    try {
      const reply = await Reflect.apply(handler, this, args)
      if (reply && !this._written) {
        this._render(type, reply)
      }
    } catch (e) {
      console.log(`ERROR with`, propertyName, e)
      this.res?.close()
    }
  }

  // take the argument list and the input to create the correct arguments
  private _applyArgs(args: Array<string>, params: object) {
    return args.map(arg => params[arg])
  }

  // When we call the user provided method, we will pass them the payload.params pass instead of
  // the whole payload, and we keep them in a temporary place, and destroy it once the call is over
  private _setTemp(
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
  private _unsetTemp() {
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
  private _render(type: string, payload: RecognizedString/* | object */): void {
    switch (type) {
      case IS_OTHER:
          this.writer(payload, this._headers, this._status)
        break
      default:
          // check if they set a different content-type header
          // if so we don't use the jsonWriter
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

  ///////////////////////////////////////////
  //             PUBLIC                    //
  ///////////////////////////////////////////

  /** dev can register their global middleware here */
  public registerMiddleware(
    middlewares: MiddlewareFunction | Array<MiddlewareFunction>
  ): void {
    const _middlewares = toArray(middlewares)
    console.log(_middlewares)
  }

  // This is a global override for the status when validation failed
  public set validationErrorStatus(status: number) {
    this._validationErrStatus = status || 417
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

  /* return stuff about the server */
  public get fastApiInfo() {
    return {
      port: this._uwsInstance.getPortNum(),
      host: this._uwsInstance.hostName
    }
  }
}
