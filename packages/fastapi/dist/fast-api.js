"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastApi = void 0;
const tslib_1 = require("tslib");
const server_1 = require("@velocejs/server");
const bodyparser_1 = tslib_1.__importStar(require("@velocejs/bodyparser"));
const config_1 = require("@velocejs/config");
const contract_1 = require("@jsonql/contract");
const utils_1 = require("@jsonql/utils");
// here
const constants_1 = require("./lib/constants");
const common_1 = require("./lib/common");
const validator_1 = require("./lib/validator");
const validators_1 = require("@velocejs/validators");
// setup
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('velocejs:fast-api:main');
// dummy stuff
const placeholderVal = -1;
const placeholderFn = (...args) => { console.log(args); };
// We are not going to directly sub-class from the uws-server-class
// instead we create an instance of it
class FastApi {
    _uwsInstance;
    _config;
    _contract;
    _routeForContract = {};
    _written = false;
    _headers = {};
    _status = placeholderVal;
    _onConfigReady;
    _onConfigWait = placeholderFn;
    _onConfigError = placeholderFn;
    _validators;
    _validationErrStatus = 417;
    _dynamicRoutes = new Map();
    _staticRouteIndex = [];
    _hasCatchAll = false;
    // protected properties
    payload;
    res;
    req;
    // store the UWS server instance when init
    constructor(config) {
        this._uwsInstance = new server_1.UwsServer(config);
        // Due to the Decorator now using a Promise to apply the init property to the class
        // so we need to create an onWait mechanism that let the listen method to know
        // everything is ready
        this._onConfigReady = new Promise((resolver, rejecter) => {
            this._onConfigWait = resolver;
            this._onConfigError = rejecter;
        });
    }
    ////////////////////////////////////////////////////////
    /**                 PRIVATE METHODS                   */
    ////////////////////////////////////////////////////////
    /** whether to setup a contract or not, if there is contract setup then we return a new route */
    _prepareContract(apiType) {
        return async (routes) => {
            return this._config.getConfig(config_1.CONTRACT_KEY)
                .then((config) => {
                debug('config', config);
                if (config && config.cacheDir) {
                    debug(apiType, this._routeForContract);
                    this._contract = new contract_1.JsonqlContractWriter(this._routeForContract); // we didn't provde the apiType here @TODO when we add jsonql
                    return this._insertContractRoute(routes, config);
                    // return a new route info here
                }
                return routes; // just return it if there is none
            });
        };
    }
    /** generate an additonal route for the contract */
    _insertContractRoute(routes, config) {
        /* it doesn't make much sense to include the contract route
        because the client needs to know where to find it first
        this._contract.data(name, { name, params, route: config.path, method: config.method}) */
        routes.push({
            path: config.path,
            type: config.method,
            handler: this._mapMethodToHandler(constants_1.CONTRACT_METHOD_NAME, [], false)
        });
        return routes;
    }
    /** create a catch all route to handle those unhandle url(s) */
    _createCatchAllRoute() {
        return {
            path: constants_1.CATCH_ALL_ROUTE,
            type: constants_1.CATCH_ALL_TYPE,
            handler: this._mapMethodToHandler(constants_1.CATCH_ALL_METHOD_NAME, [], false)
        };
    }
    /** check if there is a catch all route, otherwise create one at the end */
    _checkCatchAllRoute(path, type) {
        if (!this._hasCatchAll) {
            this._hasCatchAll = path === constants_1.CATCH_ALL_TYPE && type === constants_1.CATCH_ALL_TYPE;
        }
    }
    /** Mapping all the string name to method and supply to UwsServer run method */
    async _prepareRoutes(meta) {
        const checkFn = this._prepareDynamicRoute(new WeakSet());
        // @ ts-ignore fix this later undefined not assignable to string crap again
        return meta.map((m, i) => {
            const { path, type, propertyName } = m;
            this._checkCatchAllRoute(path, type);
            switch (type) {
                case server_1.STATIC_TYPE:
                    this._staticRouteIndex.push(i);
                    return {
                        path,
                        propertyName,
                        type: server_1.STATIC_ROUTE,
                        // the method just return the path to the files
                        // We require the method to be a getter that returns a path
                        // @TODO should we allow them to use dynamic route to perform url rewrite?
                        handler: (0, server_1.serveStatic)(this[propertyName])
                    };
                case server_1.WEBSOCKET_ROUTE_NAME: // socket route just return the value from getter for now
                    if (!m.excluded) {
                        this._prepareRouteForContract(propertyName, [], type, path);
                    }
                    return {
                        path, type, propertyName, handler: this._prepareSocketRoute(propertyName)
                    };
                case server_1.RAW_TYPE:
                    // this will always excluded from contract
                    return {
                        path,
                        type: m.route,
                        handler: this[propertyName] // pass it straight through
                    };
                default:
                    return this._prepareNormalRoute(m, checkFn);
            }
        });
    }
    /** create this wrapper for future development */
    _prepareSocketRoute(propertyName) {
        const config = this[propertyName];
        // @TODO we are going to create a new wrapper class to take over the Socket
        if (!config['open']) {
            throw new Error(`You must provide an open method for your websocket setup!`);
        }
        return config;
    }
    /** TS script force it to make it looks so damn bad for all their non-sense rules */
    _prepareNormalRoute(meta, checkFn) {
        const { type, path, propertyName, args, validation, excluded } = meta;
        const _route = checkFn(type, path, args);
        // also add this to the route that can create contract - if we need it
        const _path = _route !== '' ? _route : path;
        if (!excluded) {
            this._prepareRouteForContract(propertyName, args, type, path);
        }
        return {
            type,
            propertyName,
            path: _path,
            handler: this._mapMethodToHandler(propertyName, args, validation, _route)
        };
    }
    /** check if there is a dynamic route and prepare it */
    _prepareDynamicRoute(tmpSet) {
        // @TODO we don't need to create the object anymore, its been handle by bodyParser
        return (type, path, args) => {
            debug(`checkFn`, path);
            let dynamicRoute = '', upObj = null;
            if (type === constants_1.DEFAULT_CONTRACT_METHOD && bodyparser_1.UrlPattern.check(path)) {
                // now we need to check if the types are supported
                (0, common_1.assertDynamicRouteArgs)(args);
                upObj = new bodyparser_1.UrlPattern(path);
                dynamicRoute = upObj.route; // this is the transformed route
                debug('transformed dynamicRoute', dynamicRoute);
            }
            if (tmpSet.has({ dynamicRoute })) {
                throw new Error(`${dynamicRoute} already existed!`);
            }
            tmpSet.add({ route: dynamicRoute === '' ? path : dynamicRoute });
            if (upObj !== null) {
                this._dynamicRoutes.set(dynamicRoute, upObj);
            }
            return dynamicRoute;
        };
    }
    // transform the string name to actual method
    _mapMethodToHandler(propertyName, argsList, validationInput, // this is the rules provide via Decorator
    dynamicRoute
    // onAbortedHandler?: string // take out
    ) {
        const handler = this[propertyName];
        return async (res, req) => {
            // @BUG this is still a bit problematic when error happens inside, the catch has no effect
            this._handleMiddlewares([
                this._bodyParser(dynamicRoute),
                this._prepareCtx(propertyName, res, dynamicRoute),
                this._handleProtectedRoute(propertyName),
                this._prepareValidator(propertyName, argsList, validationInput),
                async (ctx) => {
                    const { type, args } = ctx;
                    return this._handleContent(args, handler, type, propertyName);
                }
            ], res, req);
        };
    }
    /** wrap this together to make it clearer what it does */
    _bodyParser(dynamicRoute) {
        return async (res, req) => {
            const config = await this._getBodyParserConfig(dynamicRoute);
            return (0, bodyparser_1.default)(res, req, config);
        };
    }
    /** fetch the bodyParser config */
    async _getBodyParserConfig(dynamicRoute) {
        return this._config.getConfig()
            .then((config) => {
            debug('config', config);
            const bodyParserConfig = config[config_1.BODYPARSER_KEY] || config_1.VeloceConfig.getDefaults(config_1.BODYPARSER_KEY);
            if (dynamicRoute) { // this is a dynamic route
                bodyParserConfig[bodyparser_1.URL_PATTERN_OBJ] = this._dynamicRoutes.get(dynamicRoute);
            }
            debug('bodyParserConfig', bodyParserConfig);
            return {
                config: bodyParserConfig,
                onAborted: () => debug(`@TODO`, 'From fastApi - need to define our own onAbortedHandler')
            };
        })
            .catch((err) => {
            debug('_getBodyParserConfig err?', err);
            throw new Error(err);
        });
    }
    /** take this out from above to keep related code in one place */
    _prepareValidator(propertyName, argsList, validationInput) {
        let validateFn;
        // first need to check if they actually apply the @Validate decorator
        if (!validationInput) {
            debug(`skip validation --> ${propertyName}`);
            // return a dummy handler - we need to package it up for consistency!
            validateFn = async (values) => values; //  we don't need to do anyting now
        }
        else {
            const validatorInstance = this._validators.getValidator(propertyName);
            validateFn = (0, validator_1.createValidator)(propertyName, argsList, validatorInstance, validationInput);
        }
        const argNames = argsList.map(arg => arg.name);
        return async (ctx) => {
            const args = this._applyArgs(argNames, argsList, ctx);
            debug('args before validateFn -->', args);
            return validateFn(args)
                .then((validatedResult) => {
                debug('validatedResult -->', validatedResult);
                // the validatedResult could have new props
                return (0, utils_1.assign)(ctx, { args: validatedResult });
            });
        };
    }
    /** get call after the bodyParser, and prepare for the operation */
    _prepareCtx(propertyName, res, route) {
        return async (result) => {
            const ctx = (0, utils_1.assign)(result, { propertyName, route });
            this._setTemp(ctx, res);
            debug('ctx', ctx);
            return ctx;
        };
    }
    /** just wrap this together to make it look neater */
    _prepareRouteForContract(propertyName, args, type, path) {
        const entry = {
            [propertyName]: {
                params: (0, utils_1.toArray)(args),
                method: type,
                route: path
            }
        };
        this._routeForContract = (0, utils_1.assign)(this._routeForContract, entry);
    }
    /** binding method to the uws server */
    async _run(routes) {
        let _routes = routes;
        // we need to put the serverStatic route to the bottom
        if (this._staticRouteIndex.length > 0) {
            const a = [];
            const b = [];
            const c = routes.length;
            for (let i = 0; i < c; ++i) {
                if (this._staticRouteIndex.includes(i)) {
                    b.push(routes[i]);
                }
                else {
                    a.push(routes[i]);
                }
            }
            _routes = a.concat(b);
        }
        // @TODO if there is no static route / or catchAll route
        // we put one to the bottom of the stack to handle 404 route
        if (!this._hasCatchAll) {
            _routes.push(this._createCatchAllRoute());
        }
        debug('all setup routes', _routes);
        return this._uwsInstance.run(_routes);
    }
    /** split out from above because we still need to handle the user provide middlewares */
    _handleMiddlewares(...args) {
        // @TODO if there is any middleware we insert that before the validation pos 1
        return Reflect.apply(utils_1.queuePromisesProcess, null, args)
            .catch(this._handleValidationError.bind(this))
            .finally(() => {
            this._unsetTemp();
        });
    }
    /** handle the errors return from validation */
    _handleValidationError(error) {
        debug('_handleValidationError', error);
        const { detail, message, className } = error;
        const payload = { errors: { message, detail, className } };
        if (this.res && !this._written) {
            return (0, server_1.jsonWriter)(this.res)(payload, this._validationErrStatus);
        }
    }
    /** @TODO handle protected route, also we need another library to destruct those pattern route */
    _handleProtectedRoute(propertyName) {
        // need to check out the route info
        debug(`@TODO checking for protected route --->`, propertyName);
        return async (bodyParserProcessedResult) => {
            debug('bodyParserProcessedResult', bodyParserProcessedResult);
            // the value is bodyParser processed result
            // console.info('@TODO handle protected route') //, bodyParserProcessedResult)
            return bodyParserProcessedResult;
        };
    }
    // break out from above to make the code cleaner
    async _handleContent(args, handler, type, propertyName) {
        // const args2 = this._applyArgs(argNames, params)
        try {
            const reply = await Reflect.apply(handler, this, args);
            // @TODO we should get rip of this
            // @TODO create a register test handler to test this output directly?
            if (reply && !this._written) {
                this._render(type, reply);
            }
        }
        catch (e) {
            debug(`ERROR with`, propertyName, e);
            this.res?.close(); // this will trigger the onAbortHandler
            // @TODO have to rethink about this we want this to get handled
        }
    }
    // take the argument list and the input to create the correct arguments
    // @TODO check if this is the dynamic route and we need to convert the data
    _applyArgs(argNames, argsList, ctx) {
        const { params, route, names } = ctx;
        const isDynamic = (0, common_1.notUndef)(this._dynamicRoutes.get(route));
        const isSpread = (0, common_1.notUndef)((0, common_1.hasSpreadArg)(argsList));
        // debug('_applyArgs', argNames, argsList, ctx)
        switch (true) {
            case isDynamic && isSpread:
                return (0, common_1.prepareArgsFromDynamicToSpread)(argNames, argsList, params, names);
            case isDynamic && !isSpread:
                return (0, common_1.convertStrToType)(argNames, argsList, params);
            case !isDynamic && isSpread:
                return (0, common_1.prepareSpreadArg)(params);
            default:
                // now the body and query are handle in two different props which means
                // one of them will get lost @TODO how to allow using both? or not KISS?
                if (ctx.method === bodyparser_1.GET_NAME) {
                    return argNames.map(argName => ctx[bodyparser_1.QUERY_PARAM][argName]);
                }
                return argNames.map(argName => params[argName]);
        }
    }
    // When we call the user provided method, we will pass them the payload.params pass instead of
    // the whole payload, and we keep them in a temporary place, and destroy it once the call is over
    _setTemp(payload, res
    /*, req?: HttpRequest */
    ) {
        this._headers = {};
        this._status = placeholderVal;
        this._written = false;
        this.payload = payload;
        this.res = res;
        // we have the dynamic generate _writer _jsonWriter they are useless
    }
    // call this after the call finish
    _unsetTemp() {
        // create a nextTick effect
        setTimeout(() => {
            ['res', 'payload'].forEach(fn => {
                this[fn] = undefined;
            });
            this._written = false;
            this._headers = {};
            this._status = placeholderVal;
        }, 0);
    }
    /** Write the output
    This will be only output
    */
    _render(type, payload) {
        const res = this.res;
        const writer = (0, server_1.getWriter)(res);
        switch (type) {
            case server_1.IS_OTHER:
                writer(payload, this._headers, this._status);
                break;
            default:
                // check if they set a different content-type header
                // if so we don't use the jsonWriter
                for (const key in this._headers) {
                    if (key.toLowerCase() === server_1.CONTENT_TYPE) {
                        // exit here
                        return writer(payload, this._headers, this._status);
                    }
                }
                (0, server_1.jsonWriter)(res)(payload, this._status);
        }
    }
    /** prepare validator using veloce/validators */
    _initValidators(astMap, validations) {
        if (!(Array.isArray(validations) && validations.length === 0)) {
            this._validators = new validators_1.Validators(astMap);
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
    $prepare(astMap, existingRoutes, validations, protectedRoutes, apiType = constants_1.REST_NAME // @TODO reserved for support more api type in the future
    ) {
        if (constants_1.isDebug) {
            console.time('FastApiStartUp');
        }
        const routes = (0, common_1.mergeInfo)(astMap, existingRoutes, validations, protectedRoutes);
        this._initValidators(astMap, validations);
        this._uwsInstance.autoStart = false;
        // @0.4.0 we change this to a chain promise start up sequence
        // check the config to see if there is one to generate contract
        this._config = new config_1.VeloceConfig();
        (0, utils_1.chainProcessPromises)((routes) => this._config.isReady.then(() => routes), // this is just pause for the isReady
        this._prepareRoutes.bind(this), // repare the normal route as well as the contract route
        this._prepareContract(apiType), // here if we have setup the contract then insert route as well
        this._run.bind(this) // actually run it
        )(routes)
            .then(() => {
            this._onConfigWait(true);
        })
            .catch((e) => {
            this._onConfigError(e);
        });
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
    $writeHeader(key, value) {
        this._headers[key] = value;
    }
    $writeStatus(status) {
        this._status = status;
    }
    /**
      We have experience a lot of problem when delivery the content try to intercept
      the content type, instead we now force the finally output to use one of the following
      all with a $ to start to make sure no conflict with the regular public names
    */
    /** Apart from serving the standard html, when using the json contract system
    this will get wrap inside the delivery format - next protobuf as well */
    $json(content) {
        if (this.res && !this._written) {
            return (0, server_1.jsonWriter)(this.res)(content);
        }
    }
    /** just a string */
    $text(content, type = 'text') {
        if (this.res && !this._written) {
            return (0, server_1.getRenderFn)(this.res)(type, content);
        }
    }
    /** serving up the html content with correct html header */
    $html(content) {
        this.$text(content, 'html');
    }
    /** for serving up image / video or any non-textual content */
    $binary(url, content) {
        if (this.res && !this._written) {
            return (0, server_1.renderFile)(this.res)(url, content);
        }
    }
    /** streaming content */
    $stream(content, type) {
        debug('@TODO streaming content', type, content);
        throw new Error(`stream is not implemented`);
    }
    /** @TODO for generate ssr content, should provide options via config but they could override here */
    $ssr(data, options) {
        debug('@TODO ssr method', data, options);
        throw new Error(`ssr is not implemented`);
    }
    /** @TODO SSG but this should only call when data been update and generate static files
    then it get serve up via the @ServeStatic TBC
  
    */
    ///////////////////////////////////////////
    //             PUBLIC                    //
    ///////////////////////////////////////////
    /** overload the ValidatorPlugins registerPlugin better approach is to do that in the velocejs.config.js */
    $registerValidationPlugin(name, plugin) {
        if (this._validators) {
            this._validators.registerPlugin(name, plugin);
            return true;
        }
        return false;
    }
    // @TODO instead of using a old middleware or register style
    // we create series of hooks that allow the dev to override
    // also our Decorator will lock down on just the public method
    // and the override methods will be protected methods
    // this is good for unit testing just on the class itself
    /** register a method that will check the route */
    $registerAuthMethod() {
        debug(`@TODO registerProtectedRouteMethod`);
    }
    /* This is a global override for the status when validation failed */
    set validationErrorStatus(status) {
        this._validationErrStatus = status || 417;
    }
    /**
     The interface to serve up the contract, it's public but prefix underscore to avoid override
     */
    $_serveContract() {
        // debug('call _serveContract') // @BUG if I remove this then it doens't work???
        Promise.resolve(constants_1.isDev ?
            this._contract.output() :
            this._config.getConfig(`${config_1.CONTRACT_KEY}.${config_1.CACHE_DIR}`)
                .then((cacheDir) => this._contract.serve(cacheDir))).then((json) => {
            debug('_serveContract contract:', json);
            this.$json(json);
        });
    }
    /** @TODO this is reserved for serving up generated (js) script for validator */
    $_serveScript() {
        debug('@TODO for serving up server generated script');
    }
    /**
      When there is no catch all route, we will insert this to the end and serve up a 404
      because when the route unmatch the server just hang up
    */
    $_catchAll() {
        // @TODO check if it's open by a browser then we should serve up a 404 page
        // debug(ctx) // to see what's going on
        (0, server_1.write404)(this.res);
    }
    /**
     * We remap some of the methods from UwsServer to here for easier to use
     */
    async $start(port, host) {
        if (port) {
            this._uwsInstance.portNum = port;
        }
        if (host) {
            this._uwsInstance.hostName = host;
        }
        return new Promise((resolver, rejecter) => {
            this._uwsInstance.onStart = resolver;
            this._uwsInstance.onError = rejecter;
            // finally start up the server
            this._onConfigReady
                .then(() => {
                this._uwsInstance.start();
                if (constants_1.isDebug) {
                    console.timeEnd('FastApiStartUp');
                }
            })
                .catch((e) => {
                rejecter(e);
            });
        });
    }
    // wrapper around the shutdown
    $stop() {
        this._uwsInstance.shutdown();
    }
    /* return stuff about the server,
      we don't really need it but good for debug */
    get $fastApiInfo() {
        return {
            dev: constants_1.isDev,
            port: this._uwsInstance.getPortNum(),
            host: this._uwsInstance.hostName,
            useContract: this._contract !== undefined,
            hasConfig: this._config !== undefined, // @TODO return the config
        };
    }
}
exports.FastApi = FastApi;
