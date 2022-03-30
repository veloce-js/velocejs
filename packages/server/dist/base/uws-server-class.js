"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UwsServer = void 0;
const tslib_1 = require("tslib");
const create_app_1 = require("./create-app");
const constants_1 = require("./constants");
const debug_1 = tslib_1.__importDefault(require("debug"));
// construct the debug fn
const debugFn = (0, debug_1.default)(`velocejs:server:uws-server-class`);
// main
class UwsServer {
    constructor(opts) {
        this.opts = opts;
        this.port = 0;
        this.token = null;
    }
    // overwrite the port number via the start up env
    get portNum() {
        return process.env.PORT ? parseInt(process.env.PORT) : this.port;
    }
    set portNum(port) {
        this.port = port;
    }
    // this doesn't do anything just for overwrite
    onStart() {
        debugFn(`Server started on ${this.portNum}`);
    }
    // the core method
    run(handlers) {
        const app = (0, create_app_1.createApp)(this.opts);
        if (!handlers.length) {
            throw new Error(`You must have at least 1 handler!`);
        }
        handlers.forEach(o => {
            const { type, path, handler } = o;
            // @BUG if we use Reflect.apply here, uws throw a string out of bound error
            if (constants_1.SUPPORT_REST_ROUTES.includes(type)) {
                app[type](path, handler);
            }
            else {
                throw new Error(`Route ${type} is not supported!`);
            }
        });
        app.listen(this.portNum, (token) => {
            if (token) {
                this.token = token;
                this.onStart();
            }
            else {
                throw new Error(`Server could not start!`);
            }
        });
    }
    // gracefully shutdown the server
    shutdown() {
        (0, create_app_1.shutdownServer)(this.token);
    }
    // get the port number if it's randomly assign port
    getPortNum() {
        return this.token ? (0, create_app_1.getPort)(this.token) : -1;
    }
}
exports.UwsServer = UwsServer;
