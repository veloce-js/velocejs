"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UwsServer = void 0;
const create_app_1 = require("./create-app");
const serve_static_1 = require("./serve-static");
class UwsServer {
    constructor(opts) {
        this.opts = opts;
        this.port = 0;
        this.token = null;
    }
    // overwrite the port number via the start up env
    get portNum() {
        return process.env.PORT || this.port;
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
            // provide a shorthand options
            if (handler === 'static') {
                // Reflect.apply( app[type], null, [path, serveStatic] )
                // if we use the above call signature, we get a internal field out of bound error
                app[type](path, serve_static_1.serveStatic);
            }
            else {
                app[type](path, handler);
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
        return (0, create_app_1.getPort)(this.token);
    }
}
exports.UwsServer = UwsServer;
