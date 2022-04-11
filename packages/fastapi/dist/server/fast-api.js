"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastApi = void 0;
// this will allow you to create a series of API in no time
const src_1 = require("@velocejs/server/src"); // point to the source ts
const constants_1 = require("@velocejs/server/src/base/constants");
// We are not going to directly sub-class from the uws-server-class
// instead we create an instance of it
class FastApi {
    uwsInstance;
    written = false;
    payload;
    res;
    req;
    // this will be storing the write queue
    writer = () => { console.log('stupid'); };
    jsonWriter = () => { console.log('stupid'); };
    // store the UWS server instance when init
    constructor(config) {
        this.uwsInstance = new src_1.UwsServer(config);
    }
    // instead of using a Prepare decorator and ugly call the super.run
    // we use a class decorator to call this method on init
    // Dev can do @Rest(config)
    prepare(routes, validations) {
        console.log('REST CONFIG', routes, validations);
        // set the autoStart to false
        this.uwsInstance.autoStart = false;
        // @TODO prepare the validation rules before as pass arg
        this.uwsInstance.run(this.prepareRoutes(routes /*, valdiation */));
    }
    // When we call the user provided method, we will pass them the payload.params pass instead of
    // the whole payload, and we keep them in a temporary place, and destroy it once the call is over
    setTemp(payload, res
    /*, req?: HttpRequest */
    ) {
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
        ['res', 'payload', 'writer', 'jsonWriter'].forEach(fn => {
            this[fn] = undefined;
        });
        this.written = false;
    }
    // using a setter to trigger series of things to do with the validation map
    /*
    private set validationMap(validationMap: Array<any>) {
      console.log(validationMap)
    }
    */
    // transform the string name to actual method
    mapMethodToHandler(propertyName, 
    /*validationRule */
    onAbortedHandler) {
        const handler = this[propertyName];
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
            const { params, type } = result;
            const args2 = [params];
            this.setTemp(result, res);
            // @TODO apply the valdiator here
            // if there is an error then it will be the second parameter
            let reply;
            try {
                reply = await Reflect.apply(handler, this, args2);
                // now we destroy the temp stuff
                // we wrap this in a set timeout is a node.js thing to create a nextTick effect
                // if the method return a result then we will handle it
                // otherwise we assume the dev handle it in their method
                if (reply && !this.written) {
                    switch (type) {
                        case constants_1.IS_OTHER:
                            (0, src_1.getWriter)(res)(reply);
                            break;
                        default:
                            (0, src_1.jsonWriter)(res)(reply);
                    }
                }
            }
            catch (e) {
                console.log(`ERROR with`, propertyName, e);
                res.close();
            }
            finally {
                setTimeout(() => {
                    this.unsetTemp();
                }, 0);
            }
        };
    }
    // Mapping all the string name to method and supply to UwsServer run method
    prepareRoutes(meta
    // validations?: Array<JsonValidationEntry>
    ) {
        return meta.map(m => {
            const { path, type, propertyName, onAbortedHandler } = m;
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
                        handler: this.mapMethodToHandler(propertyName, onAbortedHandler)
                    };
            }
        });
    }
    /**
      We remap some of the methods from UwsServer to here for easier to use
      const myApp = new MyApi(new UwsServer())
      myApp.start()
           .then(serverInfo => {
             do things with it
           })
    **/
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
            this.uwsInstance.start();
        });
    }
    // wrapper around the shutdown
    stop() {
        this.uwsInstance.shutdown();
    }
}
exports.FastApi = FastApi;
