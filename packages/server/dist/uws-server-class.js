"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UwsServer = void 0;
const tslib_1 = require("tslib");
const constants_1 = require("./lib/constants");
const create_app_1 = require("./create-app");
const create_socket_handler_1 = require("./create-socket-handler");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debugFn = (0, debug_1.default)(`velocejs:server:uws-server-class`);
// main
class UwsServer {
    opts;
    autoStart = true;
    running = false;
    // privates
    app;
    // privates
    port = 0;
    host = '';
    token = '';
    constructor(opts) {
        this.opts = opts;
    }
    /** stock start function */
    onStartFn = (url) => {
        debugFn(`Server started: ${url}`);
    };
    onStartErrorFn = () => {
        throw new Error(`Server could not start!`);
    };
    /** Taking the app.listen out because there are more options to deal with now */
    listen(app) {
        const cb = (token) => {
            if (token) {
                this.token = token;
                this.running = true;
                this.onStartCb();
            }
            else {
                this.onStartErrorFn();
            }
        };
        const params = [this.portNum, cb];
        if (this.host) {
            params.unshift(this.host);
        }
        Reflect.apply(app.listen, app, params);
    }
    /** overwrite the port number via the start up env */
    get portNum() {
        const p = process.env.PORT;
        const port = p ? parseInt(p) : p;
        if (p && isNaN(port)) {
            throw new Error(`"${p}" from process.env.PORT is not a correct port number!`);
        }
        //@BUG if they didn't pass a number than what
        return port ? port : this.port;
    }
    /** setter for post number */
    set portNum(port) {
        this.port = port;
    }
    /**
      we could specify the host like 0.0.0.0
      listen(
        host: RecognizedString,
        port: number,
        cb: (listenSocket: us_listen_socket) => void
      ): TemplatedApp;
      @TODO what about ipv6 address?
    */
    get hostName() {
        const h = process.env.HOST;
        return h ? h : this.host;
    }
    /** setter for host name */
    set hostName(host) {
        this.host = host;
    }
    /** set a custom on start callback */
    set onStart(cb) {
        this.onStartFn = cb;
    }
    /** allow to pass a callback when server couldn't start */
    set onError(cb) {
        this.onStartErrorFn = cb;
    }
    /** this doesn't do anything just for overwrite or display a debug message */
    onStartCb() {
        const portNum = this.portNum || this.getPortNum();
        const hostName = this.getHostName();
        this.onStartFn(`${hostName}:${portNum}`);
    }
    /** to init, bind handlers and then optionally start up the UWS Server */
    run(handlers) {
        const app = (0, create_app_1.createApp)(this.opts);
        if (!handlers.length) {
            throw new Error(`You must provide at least 1 handler!`);
        }
        handlers.forEach(o => {
            const { type, path, handler } = o;
            // @BUG if we use Reflect.apply here, uws throw a string out of bound error
            if (type === constants_1.WEBSOCKET_ROUTE_NAME) {
                debugFn(`Create ${constants_1.WEBSOCKET_ROUTE_NAME} for ${path} with `, handler);
                Reflect.apply(app[type], app, [path, (0, create_socket_handler_1.createSocketHandler)(handler)]);
            }
            else if (constants_1.SUPPORT_REST_ROUTES.includes(type)) {
                debugFn(`Create ${type} route for ${path}`);
                // app[type](path, handler)
                Reflect.apply(app[type], app, [path, handler]);
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
    /** manually start the server */
    start() {
        if (!this.running) {
            this.listen(this.app);
        }
    }
    /** gracefully shutdown the server */
    shutdown() {
        if (this.running) {
            (0, create_app_1.shutdownServer)(this.token);
            this.running = false;
        }
    }
    /** get the port number if it's randomly assign port */
    getPortNum() {
        return this.token ? (0, create_app_1.getPort)(this.token) : -1;
    }
    /** get fully constructed hostname */
    getHostName() {
        const s = this.opts ? 's' : '';
        const proto = `http${s}://`;
        return this.hostName ? proto + this.hostName : `${proto}localhost`;
    }
}
exports.UwsServer = UwsServer;
