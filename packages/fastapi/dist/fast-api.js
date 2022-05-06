"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastApi = void 0;
const tslib_1 = require("tslib");
// this will allow you to create a series of API in no time
const server_1 = require("@velocejs/server");
const server_2 = require("@velocejs/server");
const bodyparser_1 = tslib_1.__importDefault(require("@velocejs/bodyparser"));
const utils_1 = require("@jsonql/utils");
// here
const extract_1 = require("./lib/extract");
const validator_1 = require("./lib/validator");
const isDebug = process.env.DEBUG;
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('velocejs:fast-api:main');
// dummy stuff
const placeholder = -1;
const placeholderFn = (...args) => { console.log(args); };
// We are not going to directly sub-class from the uws-server-class
// instead we create an instance of it
class FastApi {
    _uwsInstance;
    _written = false;
    _headers = {};
    _status = placeholder;
    _onConfigReady; // fucking any script
    _onConfigWait = placeholderFn;
    _onConfigError = placeholderFn;
    _middlewares = [];
    _validationErrStatus = 417;
    // protected properties
    payload;
    res;
    req;
    writer = placeholderFn;
    jsonWriter = () => placeholderFn;
    // override this then we could use this to add to the plugin list
    validatorPlugins = []; // @TODO fix type
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
    // instead of using a Prepare decorator and ugly call the super.run
    // we use a class decorator to call this method on init
    // Dev can do @Rest(config)
    prepare(routes) {
        if (isDebug) {
            console.time('FastApiStartUp');
        }
        this._uwsInstance.autoStart = false;
        try {
            // @TODO prepare the validation rules before as pass arg
            this._uwsInstance.run(this.prepareRoutes(routes));
            // create a nextTick effect
            setTimeout(() => {
                this._onConfigWait(true);
            }, 0);
        }
        catch (e) {
            this._onConfigError(e);
        }
    }
    // Mapping all the string name to method and supply to UwsServer run method
    prepareRoutes(meta) {
        return meta.map(m => {
            const { path, type, propertyName, validation } = m;
            switch (type) {
                case server_2.STATIC_TYPE:
                    return {
                        path,
                        type: server_2.STATIC_ROUTE,
                        // the method just return the path to the files
                        // We change this to be a accessor decorator which a getter
                        handler: (0, server_1.serveStatic)(this[propertyName])
                    };
                case server_2.RAW_TYPE:
                    return {
                        path,
                        type: m.route,
                        handler: this[propertyName] // pass it straight through
                    };
                default:
                    return {
                        type,
                        path,
                        handler: this._mapMethodToHandler(propertyName, m.args, validation)
                    };
            }
        });
    }
    // transform the string name to actual method
    _mapMethodToHandler(propertyName, argsList, validationInput) {
        const handler = this[propertyName];
        // the args now using the info from ast map , we strip one array only contains names for user here
        const argNames = argsList.map(arg => arg.name);
        const validateFn = this._createValidator(propertyName, argsList, validationInput);
        // @TODO need to rethink about how this work
        return async (res, req) => {
            // @0.3.0 we change the whole thing into one middlewares stack
            const stacks = [
                bodyparser_1.default,
                this._prepareCtx(propertyName, res),
                this._handleProtectedRoute(propertyName),
                async (ctx) => {
                    const args = this._applyArgs(argNames, ctx.params);
                    return validateFn(args)
                        .then((validatedResult) => {
                        debug('validatedResult', validatedResult, argNames);
                        // the validatedResult could have new props
                        return (0, utils_1.assign)(ctx, {
                            args: (0, extract_1.prepareArgs)(argNames, validatedResult)
                        });
                    });
                },
                // last of the calls
                async (ctx) => {
                    const { type, args } = ctx;
                    // console.log(`Before handler call`, ctx)
                    // if we use the catch the server hang, if we call close the client hang
                    return this._handleContent(args, handler, type, propertyName);
                }
            ];
            this._handleMiddlewares(stacks, res, req, () => console.log(`@TODO`, 'define our own onAbortedHandler'));
        };
    }
    /** get call after the bodyParser, and prepare for the operation */
    _prepareCtx(propertyName, res) {
        return async (result) => {
            const ctx = (0, utils_1.assign)(result, { propertyName });
            this._setTemp(result, res);
            return ctx;
        };
    }
    /** split out from above because we still need to handle the user provide middlewares */
    _handleMiddlewares(...args) {
        // @TODO if there is any middleware we insert that before the validation pos 1
        // run the middleware stacks
        return Reflect.apply(utils_1.queuePromisesProcess, null, args)
            .catch(this._handleValidationError.bind(this))
            .finally(() => {
            this._unsetTemp();
        });
    }
    // handle the errors return from validation
    _handleValidationError(error) {
        const { detail } = error;
        const payload = {
            errors: {
                detail: detail
            }
        };
        debug('errors', payload);
        // @TODO should replace with the jsonWriter
        if (this.res) {
            this.res.writeStatus(this._validationErrStatus + '');
            /// console.log('this._status', this._status)
            this.res.write(JSON.stringify(payload));
            // this._render(type, payload)
            this.res.end();
        }
    }
    /** wrap the _createValidator with additoinal property */
    _createValidator(propertyName, argsList, // @TODO fix type
    validationInput // @TODO fix type
    ) {
        return (0, validator_1.createValidator)(propertyName, argsList, validationInput, this.validatorPlugins);
    }
    /** @TODO handle protected route, also we need another library to destruct those pattern route */
    _handleProtectedRoute(propertyName) {
        // need to check out the route info
        debug(`checking the route`, propertyName);
        return async (bodyParserProcessedResult) => {
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
    _applyArgs(args, params) {
        return args.map(arg => params[arg]);
    }
    // When we call the user provided method, we will pass them the payload.params pass instead of
    // the whole payload, and we keep them in a temporary place, and destroy it once the call is over
    _setTemp(payload, res
    /*, req?: HttpRequest */
    ) {
        this._headers = {};
        this._status = placeholder;
        this._written = false;
        this.payload = payload;
        this.res = res;
        // this.req = req
        // create a jsonWriter and a writer
        // add a guard to prevent accidental double write
        const _writer = (0, server_1.getWriter)(this.res);
        this.writer = (...args) => {
            if (!this._written) {
                this._written = true;
                Reflect.apply(_writer, null, args);
            }
        };
        const _jsonWriter = (0, server_1.jsonWriter)(this.res);
        this.jsonWriter = (...args) => {
            if (!this._written) {
                this._written = true;
                Reflect.apply(_jsonWriter, null, args);
            }
        };
    }
    // call this after the call finish
    _unsetTemp() {
        // create a nextTick effect
        setTimeout(() => {
            ['res', 'payload', 'writer', 'jsonWriter'].forEach(fn => {
                this[fn] = undefined;
            });
            this._written = false;
            this._headers = {};
            this._status = placeholder;
        }, 0);
    }
    // write to the client
    _render(type, payload) {
        switch (type) {
            case server_2.IS_OTHER:
                this.writer(payload, this._headers, this._status);
                break;
            default:
                // check if they set a different content-type header
                // if so we don't use the jsonWriter
                for (const key in this._headers) {
                    if (key.toLowerCase() === server_2.CONTENT_TYPE) {
                        // exit here
                        return this.writer(payload, this._headers, this._status);
                    }
                }
                this.jsonWriter(payload, this._status);
        }
    }
    // if the dev use this to provide an extra header
    // then we can check if the contentType is already provided
    // if so then we don't use the default one
    writeHeader(key, value) {
        this._headers[key] = value;
    }
    writeStatus(status) {
        this._status = status;
    }
    ///////////////////////////////////////////
    //             PUBLIC                    //
    ///////////////////////////////////////////
    // @TODO instead of using a old middleware or register style
    // we create series of hooks that allow the dev to override
    // also our Decorator will lock down on just the public method
    // and the override methods will be protected methods
    // this is good for unit testing just on the class itself
    /** register a method that will check the route */
    registerProtectedRouteMethod() {
        debug(`@TODO registerProtectedRouteMethod`);
    }
    /** dev can register their global middleware here */
    use(middlewares) {
        if (middlewares) {
            const _middlewares = (0, utils_1.toArray)(middlewares).map(m => {
                // @TODO prepare the middleware
                return m;
            });
            // @TODO should this be a Set and check if already registered
            this._middlewares = this._middlewares.length ?
                this._middlewares.concat(_middlewares) :
                _middlewares;
            debug(this._middlewares);
        }
    }
    // This is a global override for the status when validation failed
    set validationErrorStatus(status) {
        this._validationErrStatus = status || 417;
    }
    /**
     * We remap some of the methods from UwsServer to here for easier to use
     */
    async start(port, host) {
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
                if (isDebug) {
                    console.timeEnd('FastApiStartUp');
                }
            })
                .catch((e) => {
                rejecter(e);
            });
        });
    }
    // wrapper around the shutdown
    stop() {
        this._uwsInstance.shutdown();
    }
    /* return stuff about the server */
    get fastApiInfo() {
        return {
            port: this._uwsInstance.getPortNum(),
            host: this._uwsInstance.hostName
        };
    }
}
exports.FastApi = FastApi;
