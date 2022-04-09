"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UwsServer = void 0;
const tslib_1 = require("tslib");
const create_app_1 = require("./base/create-app");
const constants_1 = require("./constants");
const debug_1 = tslib_1.__importDefault(require("debug"));
// construct the debug fn
const debugFn = (0, debug_1.default)(`velocejs:server:uws-server-class`);
// main
class UwsServer {
    opts;
    autoStart = true;
    running = false;
    // privates
    app;
    port = 0;
    host = '';
    token = '';
    onStartFn = (url) => {
        debugFn(`Server started at ${url}`);
    };
    constructor(opts) {
        this.opts = opts;
    }
    // overwrite the port number via the start up env
    get portNum() {
        const p = process.env.PORT;
        return p ? parseInt(p) : this.port;
    }
    // setter for post number
    set portNum(port) {
        this.port = port;
    }
    // we could specify the host like 0.0.0.0
    // listen(host: RecognizedString, port: number, cb: (listenSocket: us_listen_socket) => void): TemplatedApp;
    get hostName() {
        const h = process.env.HOST;
        return h ? h : this.host;
    }
    // setter for host name
    set hostName(host) {
        this.host = host;
    }
    set onStart(cb) {
        this.onStartFn = cb;
    }
    // this doesn't do anything just for overwrite or display a debug message
    onStartCb() {
        const portNum = this.portNum || this.getPortNum();
        const s = this.opts ? 's' : '';
        const proto = `http${s}://`;
        const hostName = this.hostName ? proto + this.hostName : `${proto}localhost`;
        this.onStartFn(`${hostName}:${portNum}`);
    }
    // to init, bind handlers and then start up the UWS Server
    run(handlers) {
        const app = (0, create_app_1.createApp)(this.opts);
        if (!handlers.length) {
            throw new Error(`You must have at least 1 handler!`);
        }
        handlers.forEach(o => {
            const { type, path, handler } = o;
            // @BUG if we use Reflect.apply here, uws throw a string out of bound error
            if (constants_1.SUPPORT_REST_ROUTES.includes(type)) {
                debugFn(`Create ${type} route for ${path}`);
                app[type](path, handler);
            }
            else {
                throw new Error(`Route ${type} is not supported!`);
            }
        });
        // run it
        if (this.autoStart) {
            this.listen(app);
        }
        else {
            this.app = app;
        }
    }
    // Taking the app.listen out because there are more options to deal with now
    listen(app) {
        const cb = (token) => {
            if (token) {
                this.token = token;
                this.running = true;
                this.onStartCb();
            }
            else {
                throw new Error(`Server could not start!`);
            }
        };
        const params = [this.portNum, cb];
        if (this.host) {
            params.unshift(this.host);
        }
        Reflect.apply(app.listen, app, params);
    }
    // manually start the server
    start() {
        if (!this.running) {
            this.listen(this.app);
        }
    }
    // gracefully shutdown the server
    shutdown() {
        (0, create_app_1.shutdownServer)(this.token);
        this.running = false;
    }
    // get the port number if it's randomly assign port
    getPortNum() {
        return this.token ? (0, create_app_1.getPort)(this.token) : -1;
    }
}
exports.UwsServer = UwsServer;
