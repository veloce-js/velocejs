"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastApi = void 0;
const tslib_1 = require("tslib");
// this will allow you to create a series of API in no time
const server_1 = require("@velocejs/server");
const server_2 = require("@velocejs/server");
const server_3 = require("@velocejs/server");
const bodyparser_1 = tslib_1.__importDefault(require("@velocejs/bodyparser"));
const utils_1 = require("@jsonql/utils");
// here
const validator_1 = require("./lib/validator");
const isDebug = process.env.DEBUG;
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
    _onConfigReady;
    _onConfigWait = placeholderFn;
    _onConfigError = placeholderFn;
    _jsonValidationErrorStatus = server_3.C417;
    // protected properties
    payload;
    res;
    req;
    writer = placeholderFn;
    jsonWriter = () => placeholderFn;
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
            const { path, type, propertyName, validation, onAbortedHandler } = m;
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
                        handler: this.mapMethodToHandler(propertyName, m.args, validation, onAbortedHandler)
                    };
            }
        });
    }
    // transform the string name to actual method
    mapMethodToHandler(propertyName, argsList, validationInput, // this is the raw rules input by dev
    onAbortedHandler) {
        const handler = this[propertyName];
        // the args now using the info from ast map , we strip one array only contains names for user here
        const argNames = argsList.map(arg => arg.name);
        const validateFn = (0, validator_1.createValidator)(propertyName, argsList, validationInput);
        // @TODO need to rethink about how this work
        return async (res, req) => {
            const args1 = [res, req];
            // add onAbortedHandler
            if (onAbortedHandler) {
                args1.push(this[onAbortedHandler]);
            }
            // process input
            const result = await Reflect.apply(bodyparser_1.default, null, args1);
            // this is a bit tricky if there is a json result
            // then it will be the first argument
            this.setTemp(result, res);
            const { params, type } = result;
            // @TODO apply the validaton here, if it didn't pass then it will abort the rest
            // @TODO create a middleware stack machine here
            this.handleProtectedRoute()
                .then(() => {
                validateFn(params)
                    // success
                    .then(() => this.handleContent(argNames, params, handler, type, propertyName))
                    .catch(({ errors, fields }) => {
                    this.handleValidationError(errors, fields);
                });
            });
        };
    }
    /** this is where the stack get exeucted */
    runMiddlewareStacks(middlewares) {
        console.log('@TODO', middlewares);
    }
    // handle protected route
    async handleProtectedRoute() {
        console.log('@TODO handle protected route');
        return true;
    }
    // break out from above to make the code cleaner
    async handleContent(argNames, params, handler, type, propertyName) {
        const args2 = this.applyArgs(argNames, params);
        try {
            const reply = await Reflect.apply(handler, this, args2);
            if (reply && !this._written) {
                this.write(type, reply);
            }
        }
        catch (e) {
            console.log(`ERROR with`, propertyName, e);
            this.res?.close();
        }
        finally {
            this.unsetTemp();
        }
    }
    // handle the errors return from validation
    handleValidationError(errors, fields) {
        console.log('errors', errors);
        console.log('fields', fields);
        // clean up
        this.unsetTemp();
    }
    // take the argument list and the input to create the correct arguments
    applyArgs(args, params) {
        return args.map(arg => params[arg]);
    }
    // When we call the user provided method, we will pass them the payload.params pass instead of
    // the whole payload, and we keep them in a temporary place, and destroy it once the call is over
    setTemp(payload, res
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
        const _writer = (0, server_1.getWriter)(res);
        this.writer = (...args) => {
            if (!this._written) {
                this._written = true;
                Reflect.apply(_writer, null, args);
            }
        };
        const _jsonWriter = (0, server_1.jsonWriter)(res);
        this.jsonWriter = (...args) => {
            if (!this._written) {
                this._written = true;
                Reflect.apply(_jsonWriter, null, args);
            }
        };
    }
    // call this after the call finish
    unsetTemp() {
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
    write(type, payload /* | object */) {
        switch (type) {
            case server_2.IS_OTHER:
                this.writer(payload, this._headers, this._status);
                break;
            default:
                // check if they set a different content-type header
                // if so then we don't use the jsonWriter
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
    // using a setter to trigger series of things to do with the validation map
    /*
    private set validationMap(validationMap: Array<any>) {
      console.log(validationMap)
    }
    */
    /** dev can register their global middleware here */
    registerMiddleware(middlewares) {
        const _middlewares = (0, utils_1.toArray)(middlewares);
        console.log(_middlewares);
    }
    // This is a global override for the status when validation failed
    set validationErrorStatus(status) {
        this._jsonValidationErrorStatus = (0, server_3.lookupStatus)(status) || server_3.C417;
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
                .catch(e => {
                rejecter(e);
            });
        });
    }
    // wrapper around the shutdown
    stop() {
        this._uwsInstance.shutdown();
    }
}
exports.FastApi = FastApi;
