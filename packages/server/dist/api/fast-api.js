"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastApi = void 0;
const tslib_1 = require("tslib");
// this will allow you to create a series of REST API in no time
require("reflect-metadata");
const body_parser_1 = require("../base/body-parser");
// We are not going to directly sub-class from the uws-server-class
// instead we create an instance of it
class FastApi {
    // store the UWS server instance as protected
    constructor(uwsInstance) {
        this.uwsInstance = uwsInstance;
    }
    // wrapper for the UwsServer create server method
    createServer(routes) {
        this.uwsInstance.run(routes);
    }
    // transform the string name to actual method
    mapMethodToHandler(propertyName, onAbortedHandler) {
        const fn = this[propertyName];
        return (res, req) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            // add onAbortedHandler
            if (onAbortedHandler) {
                res.onAborted(() => {
                    Reflect.apply(this[onAbortedHandler], this, []);
                });
            }
            // process input
            const result = yield (0, body_parser_1.bodyParser)(res, req);
            const extra = { res, req };
            const payload = Object.assign(result, extra);
            const reply = Reflect.apply(fn, this, [payload]);
            // if the method return a result then we will handle it
            // otherwise we assume the dev handle it in their method
            if (reply) {
                res.end(reply);
            }
        });
    }
    // Mapping all the string name to method and supply to UwsServer run method
    run(meta) {
        this.createServer(meta.map(m => {
            const { path, type, propertyName, onAbortedHandler } = m;
            const handler = this.mapMethodToHandler(propertyName, onAbortedHandler);
            return {
                type,
                path,
                handler
            };
        }));
    }
}
exports.FastApi = FastApi;
