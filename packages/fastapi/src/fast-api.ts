// this will allow you to create a series of API in no time
import type {
  AppOptions,
  HttpResponse,
  HttpRequest,
  UwsRouteSetup,
  UwsRouteHandler,
  UwsRespondBody,
  // UwsWriter,
  // UwsJsonWriter,
  UwsStringPairObj,
  // RecognizedString
} from '@velocejs/server/index' // point to the source ts
// our deps
import type {
  RouteMetaInfo,
  VeloceCtx,
  VeloceMiddleware,
  // JsonValidationEntry,
} from './types'
import {
  UwsServer,
  serveStatic,
  getWriter,
  jsonWriter,
  getRenderFn,
  renderFile,
  STATIC_TYPE,
  STATIC_ROUTE,
  RAW_TYPE,
  IS_OTHER,
  CONTENT_TYPE,
  WEBSOCKET_ROUTE_NAME,
} from '@velocejs/server'
import {
  SPREAD_ARG_TYPE,
  TS_TYPE_NAME,
  REST_NAME,
} from '@jsonql/constants'

import bodyParser, {
  UrlPattern
} from '@velocejs/bodyparser'
import {
  VeloceConfig,
  CONTRACT_KEY,
  CACHE_DIR,
} from '@velocejs/config'
import { JsonqlValidationError } from '@jsonql/errors'
import { JsonqlContractWriter } from '@jsonql/contract'
import {
  chainProcessPromises,
  queuePromisesProcess,
  toArray,
  assign
} from '@jsonql/utils'
// here
import {
  isDebug,
  isDev,
  CONTRACT_METHOD_NAME,
  DEFAULT_CONTRACT_METHOD,
} from './lib/constants'
import { prepareArgs } from './lib/extract'
import { createValidator } from './lib/validator'
import {
  FastApiInterface
} from './lib/fast-api-interface'
// setup
import debugFn from 'debug'
const debug = debugFn('velocejs:fast-api:main')
// dummy stuff
const placeholderVal = -1
const placeholderFn = (...args: any[] ) => { console.log(args) }

// We are not going to directly sub-class from the uws-server-class
// instead we create an instance of it
export class FastApi implements FastApiInterface {
  private _uwsInstance: UwsServer
  private _config!: VeloceConfig
  private _contract!: JsonqlContractWriter
  private _routeForContract = {}
  private _written = false
  private _headers: UwsStringPairObj = {}
  private _status: number = placeholderVal
  private _onConfigReady: Promise<any> // fucking any script
  private _onConfigWait: (value: unknown) => void = placeholderFn
  private _onConfigError: (value: unknown) => void = placeholderFn
  private _middlewares: Array<VeloceMiddleware> = []
  private _validationErrStatus = 417
  private _dynamicRoutes = new Map()
  private _staticRouteIndex: Array<number> = []
  // protected properties
  protected payload: UwsRespondBody | undefined
  protected res: HttpResponse | undefined
  protected req: HttpRequest | undefined
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

  ////////////////////////////////////////////////////////
  /**                 PRIVATE METHODS                   */
  ////////////////////////////////////////////////////////

  /** whether to setup a contract or not, if there is contract setup then we return a new route */
  private _prepareContract(
    apiType: string
  ): (routes: Array<UwsRouteSetup>) => Promise<any> {

    return async(routes: Array<UwsRouteSetup>) => {

      return this._config.getConfig(CONTRACT_KEY)
        .then((config: {[key: string]: string}) => {
          debug('config', config)
          if (config && config.cacheDir) {
            debug(apiType, this._routeForContract)
            this._contract = new JsonqlContractWriter(
              this._routeForContract
            ) // we didn't provde the apiType here @TODO when we add jsonql
            return this._createContractRoute(routes, config)
            // return a new route info here
          }
          return routes // just return it if there is none
      })
    }
  }

  /** generate an additonal route for the contract */
  private _createContractRoute(
    routes: Array<UwsRouteSetup>,
    config: {[key: string]: string}
  ): Array<UwsRouteSetup> {
    /* it doesn't make much sense to include the contract route
    because the client needs to know where to find it first
    this._contract.data(name, { name, params, route: config.path, method: config.method}) */
    routes.push({
      path: config.path,
      type: config.method,
      handler: this._mapMethodToHandler(CONTRACT_METHOD_NAME, [], false)
    })
    return routes
  }

  /** Mapping all the string name to method and supply to UwsServer run method */
  private async _prepareRoutes(
    meta: RouteMetaInfo[]
  ): Promise<Array<UwsRouteSetup>> {
    const checkFn = this._prepareDynamicRoute(new WeakSet())

    return meta.map((m: RouteMetaInfo, i: number) => {
      const { path, type, propertyName, validation } = m
      switch (type) {
        case STATIC_TYPE:
          this._staticRouteIndex.push(i)
          return {
            path,
            type: STATIC_ROUTE, // @TODO m.route || STATIC_ROUTE (get)
            // the method just return the path to the files
            // We require the method to be a getter that returns a path
            // @TODO should we allow them to use dynamic route to perform url rewrite?
            handler: serveStatic(this[propertyName])
          }
        case WEBSOCKET_ROUTE_NAME: // socket route just return the value from getter for now
          return {
            path, type, handler: this._prepareSocketRoute(propertyName)
          }
        case RAW_TYPE:
          return {
            path,
            type: m.route,
            handler: this[propertyName] // pass it straight through
          }
        default:
          return this._prepareNormalRoute(type, path, propertyName, m.args, validation, checkFn)
        }
    })
  }

  /** create this wrapper for future development */
  private _prepareSocketRoute(propertyName: string) {
    return this[propertyName]
  }

  /** TS script force it to make it looks so damn bad for all their non-sense rules */
  private _prepareNormalRoute(
    type: string,
    path: string,
    propertyName: string,
    args: any,
    validation: any,
    checkFn: (t: string, p: string) => string
  ) {
    const _route = checkFn(type, path)
    // also add this to the route that can create contract - if we need it
    const _path = _route !== '' ? _route : path
    this._prepareRouteForContract(propertyName, args, type, path)

    return {
      type,
      path: _path,
      handler: this._mapMethodToHandler(
        propertyName,
        args,
        validation,
        _route
      )
    }
  }

  /** just wrap this together to make it look neater */
  private _prepareRouteForContract(
    propertyName: string,
    args: any[],
    type: string,
    path: string,
  ): void {
    const entry = {
      [propertyName]: {
        params: toArray(args),
        method: type,
        route: path
      }
    }
    this._routeForContract = assign(this._routeForContract, entry)
  }

  /** check if there is a dynamic route and prepare it */
  private _prepareDynamicRoute(tmpSet: WeakSet<object>) {

    return (type: string, path: string): string => {
      let route = '', upObj: any
      if (type === DEFAULT_CONTRACT_METHOD && UrlPattern.check(path)) {
        upObj = new UrlPattern(path)
        route = upObj.route
      }
      if (tmpSet.has({ route })) {
        throw new Error(`${route} already existed!`)
      }
      tmpSet.add({ route: route === '' ? path : route })
      if (upObj) {
        this._dynamicRoutes.set(route, upObj)
      }
      return route
    }
  }

  // transform the string name to actual method
  private _mapMethodToHandler(
    propertyName: string,
    argsList: Array<any>,
    validationInput: any, // this is the rules provide via Decorator
    route?: string
    // onAbortedHandler?: string // take out
  ): UwsRouteHandler {
    const handler = this[propertyName]
    // @TODO need to rethink about how this work
    return async (res: HttpResponse, req: HttpRequest) => {
      // @0.3.0 we change the whole thing into one middlewares stack
      const stacks = [
        bodyParser,
        this._prepareCtx(propertyName, res, route),
        this._handleProtectedRoute(propertyName),
        this._prepareValidator(propertyName, argsList, validationInput),
        async (ctx: VeloceCtx) => {
          const { type, args } = ctx
          return this._handleContent(args, handler, type as string, propertyName)
        }
      ]
      this._handleMiddlewares(
        stacks,
        res,
        req,
        () => console.log(`@TODO`, 'define our own onAbortedHandler')
      )
    }
  }

  /** take this out from above to keep related code in one place */
  private _prepareValidator(
    propertyName: string,
    argsList: Array<any>,
    validationInput: any, // this is the raw rules input by dev
  ) {
    const argNames = argsList.map(arg => arg.name)
    const validateFn = this._createValidator(propertyName, argsList, validationInput)

    return async (ctx: VeloceCtx) => {
      const args = this._applyArgs(argNames, ctx.params, argsList)

      return validateFn(args)
                .then((validatedResult: VeloceCtx) => {
                  debug('validatedResult', validatedResult, argNames)
                  // the validatedResult could have new props
                  return assign(ctx, {
                    args: prepareArgs(argNames, validatedResult)
                  })
                })
    }
  }

  /** get call after the bodyParser, and prepare for the operation */
  private _prepareCtx(
    propertyName: string,
    res: HttpResponse,
    route?: string,
  ) {

    return async (result: UwsRespondBody): Promise<VeloceCtx> => {
      const ctx: VeloceCtx = assign(result, { propertyName })
      // 0.3.0 handle dynamic route
      if (route) {
        const obj = this._dynamicRoutes.get(route)
        // the data extracted will become the argument
        const urlParams = obj.parse(ctx.url)
        ctx.params = urlParams === null ? {} : urlParams
        // @TODO we need to process the params as well
      }
      this._setTemp(ctx, res)
      debug('ctx', ctx)
      return ctx
    }
  }

  /** binding method to the uws server */
  private async _run(routes: Array<UwsRouteSetup>) {
    let _routes = routes
    if (this._staticRouteIndex.length > 0) { // we have a static route
      const a: UwsRouteSetup[] = []
      const b: UwsRouteSetup[] = []
      const c = routes.length
      for (let i=0; i<c; ++i) {
        if (this._staticRouteIndex.includes(i)) {
          b.push(routes[i])
        } else {
          a.push(routes[i])
        }
      }
      _routes = a.concat(b)
    }
    debug('routes', _routes)

    return this._uwsInstance.run(_routes)
  }

  /** split out from above because we still need to handle the user provide middlewares */
  private _handleMiddlewares(...args: any[]) {
    // @TODO if there is any middleware we insert that before the validation pos 1
    return Reflect.apply(queuePromisesProcess, null, args)
              .catch(this._handleValidationError.bind(this))
              .finally(() => {
                this._unsetTemp()
              })
  }

  // handle the errors return from validation
  private _handleValidationError(error: JsonqlValidationError) {
    const { detail } = error
    const payload = {
      errors: {
        detail: detail
      }
    }
    debug('errors', payload)
    // @TODO should replace with the jsonWriter
    if (this.res && !this._written) {
      return jsonWriter(this.res)(payload, this._validationErrStatus)
    }
    debug(`error json already written?`)
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

  /** @TODO handle protected route, also we need another library to destruct those pattern route */
  private _handleProtectedRoute(propertyName: string) {
    // need to check out the route info
    debug(`checking the route`, propertyName)
    return async (bodyParserProcessedResult: VeloceCtx): Promise<VeloceCtx> => {
      // the value is bodyParser processed result
      // console.info('@TODO handle protected route') //, bodyParserProcessedResult)
      return bodyParserProcessedResult
    }
  }
  // break out from above to make the code cleaner
  private async _handleContent(
    args: any[],
    handler: any, // Function
    type: string,
    propertyName: string
  ) {
    // const args2 = this._applyArgs(argNames, params)
    try {
      const reply = await Reflect.apply(handler, this, args)
      // @TODO we should get rip of this
      // @TODO create a register test handler to test this output directly?
      if (reply && !this._written) {
        this._render(type, reply)
      }
    } catch (e) {
      debug(`ERROR with`, propertyName, e)
      this.res?.close() // this will trigger the onAbortHandler
      // @TODO have to rethink about this we want this to get handled
    }
  }

  // take the argument list and the input to create the correct arguments
  private _applyArgs(
    argNames: Array<string>,
    params: object,
    argsList: Array<UwsStringPairObj>
  ) {
    // spread argument
    if (argsList[0] &&
        argsList[0][TS_TYPE_NAME] &&
        argsList[0][TS_TYPE_NAME] === SPREAD_ARG_TYPE
    ) {
      const _args: any[] = []
      for (const key in params) {
        _args.push(params[key])
      }
      return _args
    }
    // the normal key value pair
    return argNames.map(argName => params[argName])
  }

  // When we call the user provided method, we will pass them the payload.params pass instead of
  // the whole payload, and we keep them in a temporary place, and destroy it once the call is over
  private _setTemp(
    payload: UwsRespondBody,
    res: HttpResponse
    /*, req?: HttpRequest */
  ): void {
    this._headers = {}
    this._status = placeholderVal
    this._written = false
    this.payload = payload
    this.res = res
    // we have the dynamic generate _writer _jsonWriter they are useless
  }

  // call this after the call finish
  private _unsetTemp() {
    // create a nextTick effect
    setTimeout(() => {
      ['res', 'payload'].forEach(fn => {
        this[fn] = undefined
      })
      this._written = false
      this._headers = {}
      this._status = placeholderVal
    }, 0)
  }

  /** Write the output
  This will be only output
  */
  private _render(type: string, payload: any): void {
    const res = this.res as HttpResponse
    const writer = getWriter(res)

    switch (type) {
      case IS_OTHER:
        writer(payload, this._headers, this._status)
        break
      default:
        // check if they set a different content-type header
        // if so we don't use the jsonWriter
        for (const key in this._headers) {
          if (key.toLowerCase() === CONTENT_TYPE) {
            // exit here
            return writer(payload, this._headers, this._status)
          }
        }
        jsonWriter(res)(payload, this._status)
    }
  }

  ////////////////////////////////////////////////
  /**           PROTECTED METHODS               */
  ////////////////////////////////////////////////

  /**
    instead of using a Prepare decorator and ugly call the super.run
    we use a class decorator to call this method on init
    Dev can do @Rest(config), also for none-TS env dev can
    subclass then call this method to arhive the same effects
  */
  protected $prepare(
    routes: Array<RouteMetaInfo>,
    apiType: string = REST_NAME
  ):void {
    if (isDebug) {
      console.time('FastApiStartUp')
    }
    this._uwsInstance.autoStart = false
    // @0.4.0 we change this to a chain promise start up sequence
    // check the config to see if there is one to generate contract
    this._config = new VeloceConfig()
    chainProcessPromises(
      (routes) => this._config.isReady.then(() => routes), // this is just pause for the isReady
      this._prepareRoutes.bind(this),  // repare the normal route as well as the contract route
      this._prepareContract(apiType), // here if we have setup the contract then insert route as well
      this._run.bind(this) // actually run it
    )(routes)
      .then(() => {
        this._onConfigWait(true)
      })
      .catch((e: Error) => {
        this._onConfigError(e)
      })
  }

  ///////////////////////////////////
  /**         HOOKS                */
  ////////////////////////////////////

  /**
    We are not going to implement this tranditional middleware system
    instead we provide several hooks for the dev to customize how the
    input / output will be and they just have to overwrite this hooks to
    get the result
  */


  // if the dev use this to provide an extra header
  // then we can check if the contentType is already provided
  // if so then we don't use the default one
  protected $writeHeader(key: string, value: string) {
    this._headers[key] = value
  }

  protected $writeStatus(status: number) {
    this._status = status
  }

  /**
    We have experience a lot of problem when delivery the content try to intercept
    the content type, instead we now force the finally output to use one of the following
    all with a $ to start to make sure no conflict with the regular public names
  */

  /** Apart from serving the standard html, when using the json contract system
  this will get wrap inside the delivery format - next protobuf as well */
  protected $json(content: any) {
    if (this.res && !this._written) {
      return jsonWriter(this.res)(content)
    }
  }

  /** just a string */
  protected $text(content: string | Buffer, type = 'text') {
    if (this.res && !this._written) {
      return getRenderFn(this.res)(type, content)
    }
  }

  /** serving up the html content with correct html header */
  protected $html(content: string | Buffer) {
    this.$text(content, 'html')
  }

  /** for serving up image / video or any non-textual content */
  protected $binary(url: string, content?: Buffer) {
    if (this.res && !this._written) {
      return renderFile(this.res)(url, content)
    }
  }

  /** streaming content */
  protected $stream(content: Buffer, type: string) {
    debug('@TODO streaming content', type, content)
    throw new Error(`stream is not implemented`)
  }

  /** @TODO for generate ssr content, should provide options via config but they could override here */
  protected $ssr(data: any, options?: any) {
    debug('@TODO ssr method', data, options)
    throw new Error(`ssr is not implemented`)
  }

  /** @TODO SSG but this should only call when data been update and generate static files
  then it get serve up via the @ServeStatic TBC
  */

  ///////////////////////////////////////////
  //             PUBLIC                    //
  ///////////////////////////////////////////

  // @TODO instead of using a old middleware or register style
  // we create series of hooks that allow the dev to override
  // also our Decorator will lock down on just the public method
  // and the override methods will be protected methods
  // this is good for unit testing just on the class itself

  /** register a method that will check the route */
  public $registerProtectedRouteMethod(): void {
    debug(`@TODO registerProtectedRouteMethod`)
  }

  /** dev can register their global middleware here */
  public $use(
    middlewares: VeloceMiddleware | Array<VeloceMiddleware>
  ): void {
    if (middlewares) {
      const _middlewares = toArray(middlewares).map(m => {
        // @TODO prepare the middleware
        return m
      })
      // @TODO should this be a Set and check if already registered
      this._middlewares = this._middlewares.length ?
             this._middlewares.concat(_middlewares) :
                                      _middlewares
      debug(this._middlewares)
    }
  }

  /* This is a global override for the status when validation failed */
  public set validationErrorStatus(status: number) {
    this._validationErrStatus = status || 417
  }

  /**
   The interface to serve up the contract, it's public but prefix underscore to avoid override
   */
  public _serveContract() {
    // debug('call _serveContract') // @BUG if I remove this then it doens't work???
    Promise.resolve(
      isDev ?
          this._contract.output() :
          this._config.getConfig(`${CONTRACT_KEY}.${CACHE_DIR}`)
            .then((cacheDir: string) => this._contract.serve(cacheDir))
    ).then((json: any) => {
      debug('contract', json)
      this.$json(json)
    })
  }

  /**
   * We remap some of the methods from UwsServer to here for easier to use
   */
  public async $start(
    port?: number,
    host?: string
  ): Promise<string> {
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
        .catch((e: Error) => {
          rejecter(e)
        })
    })
  }
  // wrapper around the shutdown
  public $stop(): void {
    this._uwsInstance.shutdown()
  }

  /* return stuff about the server,
    we don't really need it but good for debug */
  public get $fastApiInfo() {
    return {
      dev: isDev,
      port: this._uwsInstance.getPortNum(),
      host: this._uwsInstance.hostName,
      useContract: this._contract !== undefined,
      hasConfig: this._config !== undefined,
    }
  }
}
