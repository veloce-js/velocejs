// this will allow you to create a series of API in no time
import type {
  AppOptions,
  HttpResponse,
  HttpRequest,
  UwsRouteSetup,
  UwsRouteHandler,
  UwsRespondBody,
  UwsStringPairObj,
} from '@velocejs/server/index'
import type {
  VeloceAstMap,
} from '@jsonql/validators/index'
import type {
  JsonqlRouteForContract,
  JsonqlProcessedEntry,
} from '@jsonql/contract/index'
import type {
  RouteMetaInfo,
  VeloceCtx,
  BodyParserConfig,
  JsonqlObjectValidateInput,
  ArgsListType,
  // ValidatorsInstance,
  DynamicRouteCheckFn,
  JsonqlValidationRule,
  JsonqlValidationPlugin,
  ValidateFn,
} from './types'
// our deps
import {
  UwsServer,
  serveStatic,
  getWriter,
  jsonWriter,
  getRenderFn,
  renderFile,
  write404,
  STATIC_TYPE,
  STATIC_ROUTE,
  RAW_TYPE,
  IS_OTHER,
  CONTENT_TYPE,
  WEBSOCKET_ROUTE_NAME,
  DEFAULT_CHARTSET,
} from '@velocejs/server'
import bodyParser, {
  UrlPattern,
  GET_NAME,
  QUERY_PARAM,
  URL_PATTERN_OBJ,
} from '@velocejs/bodyparser'
import {
  VeloceConfig,
  CONTRACT_KEY,
  CACHE_DIR,
  BODYPARSER_KEY,
} from '@velocejs/config'
import ValidationError from '@jsonql/errors/dist/validation-error'
import {
  ContractWriter
} from '@jsonql/contract'

import {
  chainProcessPromises,
  queuePromisesProcess,
  toArray,
  assign,
} from '@jsonql/utils'
// here
import {
  isDebug,
  isDev,
  CONTRACT_METHOD_NAME,
  DEFAULT_CONTRACT_METHOD,
  CATCH_ALL_ROUTE,
  CATCH_ALL_METHOD_NAME,
  CATCH_ALL_TYPE,
  REST_NAME,
  RULES_KEY,
  RULE_AUTOMATIC,
  DEFAULT_ERROR_STATUS,
  JSONQL_CONTENT_TYPE,
} from './lib/constants'
import {
  convertStrToType,
  hasSpreadArg,
  prepareSpreadArg,
  assertDynamicRouteArgs,
  notUndef,
  prepareArgsFromDynamicToSpread,
  mergeInfo,
  isJsonql,
  formatJsonql,
} from './lib/common'
import {
  ValidatorsServer as Validators
} from '@jsonql/validators/dist/validators-server'
import {
  FastApiInterface
} from './lib/fast-api-interface'
// setup
import debugFn from 'debug'
const debug = debugFn('velocejs:fast-api:main')
// dummy stuff
const placeholderVal = -1
const placeholderFn = (...args: unknown[] ) => { console.log(args) }

// We are not going to directly sub-class from the uws-server-class
// instead we create an instance of it
export class FastApi implements FastApiInterface {
  private _uwsInstance: UwsServer
  private _config!: VeloceConfig
  private _contract!: ContractWriter
  private _routeForContract: JsonqlRouteForContract = []
  private _written = false
  private _incomingHeaders: UwsStringPairObj = {}
  private _headers: UwsStringPairObj = {}
  private _status: number = placeholderVal
  private _jsonql: boolean | null = null
  private _onConfigReady: Promise<unknown>
  private _onConfigWait: (value: unknown) => void = placeholderFn
  private _onConfigError: (value: unknown) => void = placeholderFn
  // validations
  private _validators!: Validators
  private _validationErrStatus = DEFAULT_ERROR_STATUS
  private _validationPlugins = new Map<string, JsonqlValidationPlugin>()
  // special routes
  private _dynamicRoutes = new Map()
  private _staticRouteIndex: Array<number> = []
  private _hasCatchAll = false
  // protected properties
  protected payload: UwsRespondBody | undefined
  protected res: HttpResponse | undefined
  protected req: HttpRequest | undefined

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
  ): (routes: Array<UwsRouteSetup>) => Promise<UwsRouteSetup[]> {

    return async(routes: Array<UwsRouteSetup>) => {

      return this._config.getConfig(CONTRACT_KEY)
        .then((config: {[key: string]: string}) => {
          debug('config', config)
          if (config && config.cacheDir) {
            debug(apiType, this._routeForContract)
            // console.dir(this._routeForContract, { depth: null })
            this._contract = new ContractWriter(
              this._routeForContract
            ) // we didn't provde the apiType here @TODO when we add jsonql
            return this._insertContractRoute(routes, config)
            // return a new route info here
          }
          return routes // just return it if there is none
      })
    }
  }

  /** generate an additonal route for the contract */
  private _insertContractRoute(
    routes: Array<UwsRouteSetup>,
    config: {[key: string]: string}
  ): Array<UwsRouteSetup> {
    /* it doesn't make much sense to include the contract route
    because the client needs to know where to find it first
    this._contract.data(name, { name, params, route: config.path, method: config.method}) */
    routes.push({
      path: config.path,
      type: config.method,
      handler: this._mapMethodToHandler(CONTRACT_METHOD_NAME)
    })
    return routes
  }

  /** create a catch all route to handle those unhandle url(s) */
  private _createCatchAllRoute() {
    return {
      path: CATCH_ALL_ROUTE,
      type: CATCH_ALL_TYPE,
      handler: this._mapMethodToHandler(CATCH_ALL_METHOD_NAME)
    }
  }

  /** check if there is a catch all route, otherwise create one at the end */
  private _checkCatchAllRoute(path: string, type: string) {
    if (!this._hasCatchAll) {
      this._hasCatchAll = path === CATCH_ALL_TYPE && type === CATCH_ALL_TYPE
    }
  }

  /** Mapping all the string name to method and supply to UwsServer run method */
  private async _prepareRoutes(
    meta: RouteMetaInfo[]
  ) /*: Promise<Array<UwsRouteSetup>>*/ {
    const checkFn = this._prepareDynamicRoute(new WeakSet())
    // @ ts-ignore fix this later undefined not assignable to string crap again
    return meta.map((m: RouteMetaInfo, i: number) => {
      const { path, type, propertyName } = m
      this._checkCatchAllRoute(path, type)
      switch (type) {
        case STATIC_TYPE:
          this._staticRouteIndex.push(i)
          return {
            path,
            propertyName,
            type: STATIC_ROUTE, // @TODO m.route || STATIC_ROUTE (get)
            // the method just return the path to the files
            // We require the method to be a getter that returns a path
            // @TODO should we allow them to use dynamic route to perform url rewrite?
            handler: serveStatic(this[propertyName])
          }
        case WEBSOCKET_ROUTE_NAME: // socket route just return the value from getter for now
          if (!m.excluded) {
            // @TODO we set the validate to false for now, chanage later when we got to it
            this._prepareRouteForContract(propertyName, [], type, path, false)
          }
          return {
            path, type, propertyName, handler: this._prepareSocketRoute(propertyName)
          }
        case RAW_TYPE:
          // this will always excluded from contract
          return {
            path,
            type: m.route,
            handler: this[propertyName] // pass it straight through
          }
        default:
          return this._prepareNormalRoute(m, checkFn)
        }
    })
  }

  /** create this wrapper for future development */
  private _prepareSocketRoute(propertyName: string) {
    const config = this[propertyName]
    // @TODO we are going to create a new wrapper class to take over the Socket
    if (!config['open']) {
      throw new Error(`You must provide an open method for your websocket setup!`)
    }
    return config
  }

  /** TS script force it to make it looks so damn bad for all their non-sense rules */
  private _prepareNormalRoute(
    meta: RouteMetaInfo,
    checkFn: DynamicRouteCheckFn
  ) {
    const { type, path, propertyName, args, validation, excluded } = meta
    const _route = checkFn(type, path, args)
    // also add this to the route that can create contract - if we need it
    const _path = _route !== '' ? _route : path
    if (!excluded) {
      this._prepareRouteForContract(
        propertyName,
        toArray(args),
        type,
        path,
        validation ? true : false
      )
    }
    return {
      type,
      propertyName, // add this for debug purposes
      path: _path,
      handler: this._mapMethodToHandler(
        propertyName,
        args,
        validation,
        _route
      )
    }
  }

  /** check if there is a dynamic route and prepare it */
  private _prepareDynamicRoute(tmpSet: WeakSet<object>) {
  // @TODO we don't need to create the object anymore, its been handle by bodyParser
    return (
      type: string,
      path: string,
      args: ArgsListType[]
    ): string => {
      debug(`checkFn`, path)
      let dynamicRoute = '', upObj: UrlPattern | null = null
      if (type === DEFAULT_CONTRACT_METHOD && UrlPattern.check(path)) {
        // now we need to check if the types are supported
        assertDynamicRouteArgs(args)
        upObj = new UrlPattern(path)
        dynamicRoute = upObj.route // this is the transformed route
        debug('transformed dynamicRoute', dynamicRoute)
      }
      if (tmpSet.has({ dynamicRoute })) {
        throw new Error(`${dynamicRoute} already existed!`)
      }
      tmpSet.add({ route: dynamicRoute === '' ? path : dynamicRoute })
      if (upObj !== null) {
        this._dynamicRoutes.set(dynamicRoute, upObj)
      }
      return dynamicRoute
    }
  }

  /** transform the string name to actual method */
  private _mapMethodToHandler(
    propertyName: string,
    argsList: Array<ArgsListType> = [],
    validationInput?: JsonqlValidationRule, // this is the rules provide via Decorator
    dynamicRoute?: string
    // onAbortedHandler?: string // take out
  ): UwsRouteHandler {
    const handler = this[propertyName]
    // @NOTE we need to prepare the validator here before it gets hit
    // otherwise the validation info is not getting register by validators
    const validateFn = this._prepareValidationFn(propertyName, validationInput)

    return async (res: HttpResponse, req: HttpRequest) => {
      // @BUG if we add this here, it will just hang for a while but the 500 never reported
      res.onAborted(() => {
        res.writeStatus('500')
        res.end()
      })
      // @BUG this is still a bit problematic when error happens inside, the catch has no effect
      this._handleMiddlewares([
        this._bodyParser(dynamicRoute),
        this._prepareCtx(propertyName, res, dynamicRoute),
        this._handleProtectedRoute(propertyName),
        this._prepareValidator(validateFn, argsList),
        async (ctx: VeloceCtx) => {
          const { type, args } = ctx
          return this._handleContent(args, handler, type as string, propertyName)
        }
      ],
      res, req)
    }
  }

  /** wrap this together to make it clearer what it does */
  private _bodyParser(dynamicRoute?: string) {
    return async (res: HttpResponse, req: HttpRequest) => {
      const config = await this._getBodyParserConfig(dynamicRoute)

      return await bodyParser(res, req, config)
    }
  }

  /** fetch the bodyParser config */
  private async _getBodyParserConfig(
    dynamicRoute?: string
  ): Promise<BodyParserConfig> {
    return this._config.getConfig()
      .then((config: {[key: string]: string}) => {
        debug('config', config)
        const bodyParserConfig = config[BODYPARSER_KEY]
                               || VeloceConfig.getDefaults(BODYPARSER_KEY)
        if (dynamicRoute) { // this is a dynamic route
          bodyParserConfig[URL_PATTERN_OBJ] = this._dynamicRoutes.get(dynamicRoute)
        }
        debug('bodyParserConfig', bodyParserConfig)
        return {
          config: bodyParserConfig,
          onAborted: () => debug(
            `@TODO`, 'From fastApi - need to define our own onAbortedHandler'
          )
        }
      })
      .catch((err: string) => {
        debug('_getBodyParserConfig err?', err)
        throw new Error(err)
      })
  }

  /** this is split out from _prepareValidator */
  private _prepareValidationFn(
    propertyName: string,
    validationInput?: JsonqlValidationRule, // this is the raw rules input by dev
  ): ValidateFn {
    // first need to check if they actually apply the @Validate decorator
    if (!validationInput) {
      debug(`skip validation --> ${propertyName}`)
      // return a dummy handler - we need to package it up for consistency!
      return async (values: unknown[]) => values //  we don't need to do anyting now
    }
    const validator = this._validators.getValidator(propertyName)
    // @NOTE we ditch the entire createValidator and let the Validators class to deal with it
    if (validationInput[RULES_KEY] !== RULE_AUTOMATIC) {
      debug('addValidationRules', validationInput[RULES_KEY])
      validator.addValidationRules(validationInput[RULES_KEY])
    }
    return validator.validate
  }

  /** take this out from above to keep related code in one place */
  private _prepareValidator(
    validateFn: ValidateFn,
    argsList: Array<ArgsListType>
  ) {
    const argNames = argsList.map(arg => arg.name)

    return async (ctx: VeloceCtx) => {
      const args = this._applyArgs(argNames, argsList, ctx)
      debug('args before validateFn -->', args)
      return validateFn(args)
                .then((validatedResult: VeloceCtx) => {
                  debug('validatedResult -->', validatedResult)
                  // the validatedResult could have new props
                  return assign(ctx, { args: validatedResult })
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
      const ctx: VeloceCtx = assign(result, { propertyName, route })
      this._setTemp(ctx, res)
      debug('ctx', ctx)
      return ctx
    }
  }

  /** just wrap this together to make it look neater */
  private _prepareRouteForContract(
    propertyName: string,
    args: UwsStringPairObj[],
    type: string,
    path: string,
    validate?: boolean
  ): void {
    const entry = { type, validate, name: propertyName, params: args, route: path }

    this._routeForContract.push(entry as unknown as JsonqlProcessedEntry)
  }

  /** binding method to the uws server */
  private async _run(routes: Array<UwsRouteSetup>) {
    let _routes = routes
    // we need to put the serverStatic route to the bottom
    if (this._staticRouteIndex.length > 0) {
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
    // @TODO if there is no static route / or catchAll route
    // we put one to the bottom of the stack to handle 404 route
    if (!this._hasCatchAll) {
      _routes.push(this._createCatchAllRoute())
    }
    debug('ALL ROUTES', _routes)
    return this._uwsInstance.run(_routes)
  }

  /** split out from above because we still need to handle the user provide middlewares */
  private _handleMiddlewares(...args: unknown[]) {
    // @TODO if there is any middleware we insert that before the validation pos 1
    return Reflect.apply(queuePromisesProcess, null, args)
              .catch(this._handleValidationError.bind(this))
              .finally(() => {
                this._unsetTemp()
              })
  }

  /** handle the errors return from validation */
  private _handleValidationError(error: ValidationError) {
    debug('_handleValidationError', error)
    const { detail, message, className } = error
    const payload = formatJsonql({ error: { message, detail, className } })
    if (this.res && !this._written) {
      // @TODO need to allow jsonWriter to accep extra headers
      return jsonWriter(this.res)(payload, this._validationErrStatus)
    }
  }

  /** @TODO handle protected route, also we need another library to destruct those pattern route */
  private _handleProtectedRoute(propertyName: string) {
    // need to check out the route info
    debug(`@TODO checking for protected route --->`, propertyName)
    return async (bodyParserProcessedResult: VeloceCtx): Promise<VeloceCtx> => {
      debug('bodyParserProcessedResult', bodyParserProcessedResult)
      // the value is bodyParser processed result
      // console.info('@TODO handle protected route') //, bodyParserProcessedResult)
      return bodyParserProcessedResult
    }
  }

  /** handle rendering content */
  private async _handleContent(
    args: UwsStringPairObj[],
    handler: (...arg: unknown[]) => Promise<unknown>,
    type: string,
    propertyName: string
  ) {
    try {
      const reply = await Reflect.apply(handler, this, args)
      if (reply && !this._written) {
        debug('_handleContent', reply)
        this._render(type, reply)
      }
    } catch (e) {
      debug(`ERROR with`, propertyName, e)
      this.res?.close() // this will trigger the onAbortHandler
      // @TODO have to rethink about this we want this to get handled
    }
  }

  // take the argument list and the input to create the correct arguments
  // @TODO check if this is the dynamic route and we need to convert the data
  private _applyArgs(
    argNames: Array<string>,
    argsList: Array<ArgsListType>,
    ctx: VeloceCtx
  ) {
    const { params, route, names } = ctx
    const isDynamic = notUndef(this._dynamicRoutes.get(route))
    const isSpread = notUndef(hasSpreadArg(argsList))
    // debug('_applyArgs', argNames, argsList, ctx)
    switch (true) {
      case isDynamic && isSpread:
        return prepareArgsFromDynamicToSpread(argNames, argsList, params, names)
      case isDynamic && !isSpread:
        return convertStrToType(argNames, argsList, params)
      case !isDynamic && isSpread:
        return prepareSpreadArg(params)
      default:
        // now the body and query are handle in two different props which means
        // one of them will get lost @TODO how to allow using both? or not KISS?
        if (ctx.method === GET_NAME) {
          return argNames.map(argName => ctx[QUERY_PARAM][argName])
        }
        return argNames.map(argName => params[argName])
    }
  }

  // When we call the user provided method, we will pass them the payload.params pass instead of
  // the whole payload, and we keep them in a temporary place, and destroy it once the call is over
  private _setTemp(
    payload: UwsRespondBody,
    res: HttpResponse
    /*, req?: HttpRequest */
  ): void {
    const { headers } = payload
    // @TODO check for auth header
    this._jsonql = isJsonql(headers)
    this._incomingHeaders = headers
    debug('_incomingHeaders', this._incomingHeaders) // this will be useful in the future
    this._status = placeholderVal
    this._written = false
    this.payload = payload
    this.res = res
  }

  // call this after the call finish
  private _unsetTemp() {
    // create a nextTick effect
    setTimeout(() => {
      ['res', 'payload'].forEach(fn => {
        this[fn] = undefined
      })
      this._jsonql = null
      this._written = false
      this._incomingHeaders = {}
      this._status = placeholderVal
    }, 0)
  }

  /** Write the output to client */
  private _render(type: string, payload: unknown): void {
    const res = this.res as HttpResponse
    const writer = getWriter(res)
    debug('_render', type)
    if (type === IS_OTHER) {
      return writer(payload, this._headers, this._status)
    }
    const _payload = this._jsonql
                   ? JSON.stringify(formatJsonql({ data: payload }))
                   : payload
    // check if they set a different content-type header
    // if so we don't use the jsonWriter
    // this create a problem with node-fetch ?
    for (const key in this._headers) {
      if (key.toLowerCase() === CONTENT_TYPE) {
        // we need to only send part of the headers back not all of them
        return writer(_payload, this._headers, this._status)
      }
    }
    jsonWriter(res)(_payload, this._status)
  }

  /** prepare validators */
  private _initValidators(
    astMap: object,
    validations: JsonqlObjectValidateInput
  ) {
    if (!(Array.isArray(validations) && validations.length === 0)) {
      // @TODO we might want to exclucded some of the api from the astMap
      // because if they don't need validation then there is no point to init it
      this._validators = new Validators(astMap as VeloceAstMap)
      debug('call registerPlugins', this._validationPlugins)
      this._validators.registerPlugins(this._validationPlugins)
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
    astMap: object,
    existingRoutes: Array<RouteMetaInfo>,
    validations: JsonqlObjectValidateInput,
    protectedRoutes: string[],
    apiType: string = REST_NAME // @TODO reserved for support more api type in the future
  ):void {
    if (isDebug) {
      console.time('FastApiStartUp')
    }
    const routes: Array<RouteMetaInfo> = mergeInfo(
      astMap, existingRoutes, validations, protectedRoutes
    )
    this._initValidators(astMap, validations)
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
    they all start with a $ to make sure no conflict with the regular public names
  */

  /** Apart from serving the standard html, when using the json contract system
  this will get wrap inside the delivery format - next protobuf as well */
  protected $json(content: UwsStringPairObj) {
    if (this.res && !this._written) {
      const payload = this._jsonql ? formatJsonql({ data: content }) : content
      return jsonWriter(this.res)(payload)
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
  protected $ssr(data: UwsStringPairObj, options?: UwsStringPairObj) {
    debug('@TODO ssr method', data, options)
    throw new Error(`ssr is not implemented`)
  }

  /** @TODO SSG but this should only call when data been update and generate static files
  then it get serve up via the @ServeStatic TBC
  */

  ///////////////////////////////////////////
  //             PUBLIC                    //
  ///////////////////////////////////////////

  /** overload the ValidatorPlugins registerPlugin better approach is
      to do that in the velocejs.config.js
      We got a problem here when we call this probably right after init the Fastapi
      but the validator instance is not yet ready so it was never registered
      so we just store it here and let the init validator deal with it
  */
  public $registerValidationPlugin(
    name: string,
    plugin: JsonqlValidationPlugin
  ): boolean {
    if (!this._validationPlugins.has(name)) {
      this._validationPlugins.set(name, plugin)
      return true
    }
    return false
  }

  // @TODO instead of using a old middleware or register style
  // we create series of hooks that allow the dev to override
  // also our Decorator will lock down on just the public method
  // and the override methods will be protected methods
  // this is good for unit testing just on the class itself

  /** register a method that will check the route */
  public $registerAuthMethod(): void {
    debug(`@TODO registerProtectedRouteMethod`)
  }

  /* This is a global override for the status when validation failed */
  public set $validationErrorStatus(status: number) {
    this._validationErrStatus = status || DEFAULT_ERROR_STATUS
  }

  /**
   The interface to serve up the contract, it's public but prefix underscore to avoid name collison
   */
  public $_serveContract() {
    // debug('call _serveContract') // @BUG if I remove this then it doens't work???
    Promise.resolve(
      isDev ?
          this._contract.outputPublic(this._validators) :
          this._config.getConfig(`${CONTRACT_KEY}.${CACHE_DIR}`)
            .then((cacheDir: string) => this._contract.serve(cacheDir))
    ).then((json: UwsStringPairObj) => {
      debug('_serveContract contract:', json)
      // we need to diy the render here otherwise it will get double warp
      if (this.res && !this._written) {
        const jsonqlHeader = {
          [CONTENT_TYPE]: [JSONQL_CONTENT_TYPE, DEFAULT_CHARTSET].join('; ')
        }
        // set our jsonql headers as well
        jsonWriter(this.res, jsonqlHeader)(json)
      }
    })
  }

  /** @TODO this is reserved for serving up generated (js) script for validator */
  public $_serveScript() {
    debug('@TODO for serving up server generated script')
  }

  /**
    When there is no catch all route, we will insert this to the end and serve up a 404
    because when the route unmatch the server just hang up
  */
  public $_catchAll() {
    // @TODO check if it's open by a browser then we should serve up a 404 page
    // debug(ctx) // to see what's going on
    write404(this.res as HttpResponse)
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
    // @TODO should we provide a logger here
  }

  /* return stuff about the server,
    we don't really need it but good for debug */
  public get $fastApiInfo() {
    return {
      dev: isDev,
      port: this._uwsInstance.getPortNum(),
      host: this._uwsInstance.hostName,
      useContract: this._contract !== undefined, // @TODO return the contract
      hasConfig: this._config !== undefined, // @TODO return the config
    }
  }
}
