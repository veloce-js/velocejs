"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastApi = void 0;
const tslib_1 = require("tslib");
const body_parser_1 = require("../base/body-parser");
// We are not going to directly sub-class from the uws-server-class
// instead we create an instance of it
class FastApi {
    constructor(uwsInstance) {
        this.uwsInstance = uwsInstance;
    }
    createServer(routes) {
        this.uwsInstance.run(routes);
    }
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
            // @TODO how to deal with different headers? 
            // output
            res.end(reply);
        });
    }
    // it looks like unnecessary but we might want to do something with
    // the array so we do it like this here
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
