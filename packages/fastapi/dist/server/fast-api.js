"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastApi = void 0;
// this will allow you to create a series of API in no time
const src_1 = require("@velocejs/server/src"); // point to the source ts
const constants_1 = require("@velocejs/server/src/base/constants");
const status_1 = require("@velocejs/server/src/base/status");
const validator_1 = require("./lib/validator");
// dummy stuff
const placeholder = -1;
const placeholderFn = (...args) => { console.log(args); };
// We are not going to directly sub-class from the uws-server-class
// instead we create an instance of it
class FastApi {
    uwsInstance;
    written = false;
    headers = {};
    status = placeholder;
    onConfigReady;
    onConfigWait = placeholderFn;
    onConfigError = placeholderFn;
    jsonValidationErrorStatus = status_1.C417;
    // protected properties
    payload;
    res;
    req;
    writer = placeholderFn;
    jsonWriter = () => placeholderFn;
    // store the UWS server instance when init
    constructor(config) {
        this.uwsInstance = new src_1.UwsServer(config);
        // Due to the Decorator now using a Promise to apply the init property to the class
        // so we need to create an onWait mechanism that let the listen method to know
        // everything is ready
        this.onConfigReady = new Promise((resolver, rejecter) => {
            this.onConfigWait = resolver;
            this.onConfigError = rejecter;
        });
    }
    // instead of using a Prepare decorator and ugly call the super.run
    // we use a class decorator to call this method on init
    // Dev can do @Rest(config)
    prepare(routes, validations //Array<JsonValidationEntry>
    ) {
        // console.dir(routes, { depth: null })
        console.dir(validations, { depth: null });
        // set the autoStart to false
        this.uwsInstance.autoStart = false;
        try {
            // @TODO prepare the validation rules before as pass arg
            this.uwsInstance.run(this.prepareRoutes(routes, validations));
            // create a nextTick effect
            setTimeout(() => {
                this.onConfigWait(true);
            }, 0);
        }
        catch (e) {
            this.onConfigError(e);
        }
    }
    // Mapping all the string name to method and supply to UwsServer run method
    prepareRoutes(meta, validations //Array<JsonValidationEntry>
    ) {
        return meta.map(m => {
            const { path, type, propertyName, onAbortedHandler } = m;
            const inputRule = validations[propertyName];
            switch (type) {
                case constants_1.STATIC_TYPE:
                    return {
                        path,
                        type: constants_1.STATIC_ROUTE,
                        // the method just return the path to the files
                        // We change this to be a accessor decorator which a getter
                        handler: (0, src_1.serveStatic)(this[propertyName])
                    };
                case constants_1.RAW_TYPE:
                    return {
                        path,
                        type: m.route,
                        handler: this[propertyName] // pass it straight through
                    };
                default:
                    return {
                        type,
                        path,
                        handler: this.mapMethodToHandler(propertyName, m.args, inputRule, onAbortedHandler)
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
        const validateFn = (0, validator_1.createValidator)(argNames, validationInput);
        return async (res, req) => {
            const args1 = [res, req];
            // add onAbortedHandler
            if (onAbortedHandler) {
                args1.push(this[onAbortedHandler]);
            }
            // process input
            const result = await Reflect.apply(src_1.bodyParser, null, args1);
            // this is a bit tricky if there is a json result
            // then it will be the first argument
            this.setTemp(result, res);
            const { params, type } = result;
            // @TODO apply the validaton here, if it didn't pass then it will abort the rest
            validateFn(params)
                // success
                .then(async () => {
                const args2 = this.applyArgs(argNames, params);
                // @TODO apply the valdiator here
                // if there is an error then it won't get call
                let reply = '';
                try {
                    reply = await Reflect.apply(handler, this, args2);
                    if (reply && !this.written) {
                        this.write(type, reply);
                    }
                }
                catch (e) {
                    console.log(`ERROR with`, propertyName, e);
                    res.close();
                }
                finally {
                    this.unsetTemp();
                }
            })
                .catch(({ errors, fields }) => {
                this.handleValidationError(errors, fields);
            });
        };
    }
    // handle the errors return from validation
    handleValidationError(errors, fields) {
        console.log(errors);
        console.log(fields);
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
        this.headers = {};
        this.status = placeholder;
        this.written = false;
        this.payload = payload;
        this.res = res;
        // this.req = req
        // create a jsonWriter and a writer
        // add a guard to prevent accidental double write
        const _writer = (0, src_1.getWriter)(res);
        this.writer = (...args) => {
            if (!this.written) {
                this.written = true;
                Reflect.apply(_writer, null, args);
            }
        };
        const _jsonWriter = (0, src_1.jsonWriter)(res);
        this.jsonWriter = (...args) => {
            if (!this.written) {
                this.written = true;
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
            this.written = false;
            this.headers = {};
            this.status = placeholder;
        }, 0);
    }
    // write to the client
    write(type, payload /* | object */) {
        switch (type) {
            case constants_1.IS_OTHER:
                this.writer(payload, this.headers, this.status);
                break;
            default:
                // check if they set a different content-type header
                // if so then we don't use the jsonWriter
                for (const key in this.headers) {
                    if (key.toLowerCase() === constants_1.CONTENT_TYPE) {
                        // exit here
                        return this.writer(payload, this.headers, this.status);
                    }
                }
                this.jsonWriter(payload, this.status);
        }
    }
    // if the dev use this to provide an extra header
    // then we can check if the contentType is already provided
    // if so then we don't use the default one
    writeHeader(key, value) {
        this.headers[key] = value;
    }
    writeStatus(status) {
        this.status = status;
    }
    // using a setter to trigger series of things to do with the validation map
    /*
    private set validationMap(validationMap: Array<any>) {
      console.log(validationMap)
    }
    */
    // This is a global override for the status when validation failed
    set validationErrorStatus(status) {
        this.jsonValidationErrorStatus = (0, status_1.lookupStatus)(status) || status_1.C417;
    }
    /**
     * We remap some of the methods from UwsServer to here for easier to use
     */
    async start(port, host) {
        if (port) {
            this.uwsInstance.portNum = port;
        }
        if (host) {
            this.uwsInstance.hostName = host;
        }
        return new Promise((resolver, rejecter) => {
            this.uwsInstance.onStart = resolver;
            this.uwsInstance.onError = rejecter;
            // finally start up the server
            this.onConfigReady
                .then(() => {
                this.uwsInstance.start();
            })
                .catch(e => {
                rejecter(e);
            });
        });
    }
    // wrapper around the shutdown
    stop() {
        this.uwsInstance.shutdown();
    }
}
exports.FastApi = FastApi;
