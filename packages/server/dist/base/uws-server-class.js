"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UwsServer = void 0;
const create_app_1 = require("./create-app");
// for validation @TODO apply via the param decorator
// const availbleRoutes = [`any`, `get`, `post`, `put`, `options` ,`del`, `patch`, `head`, `connect`, `trace`, `ws`]
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
    // this doesn't do anything just for overwrite
    onStart() {
        console.info(`Server started on ${this.portNum}`);
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
            app[type](path, handler);
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
        if (this.token) {
            (0, create_app_1.shutdownServer)(this.token);
        }
        else {
            throw new Error(`No token to be found, can not gracefully shutdown`);
        }
    }
    // get the port number if it's randomly assign port
    getPortNum() {
        return this.token ? (0, create_app_1.getPort)(this.token) : -1;
    }
}
exports.UwsServer = UwsServer;
