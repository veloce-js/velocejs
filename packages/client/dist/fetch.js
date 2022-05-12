"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeloceFetchClient = exports.f = void 0;
const tslib_1 = require("tslib");
// built-in fetch client
const client_1 = require("./client");
/** Fetch Wrapper */
function f(url, method, params, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const opts = {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: ''
        };
        // @TODO lots of things to do here
        if (method === 'get') {
            const query = [];
            for (const key in params) {
                query.push(`${key}=${params[key]}`);
            }
            url = url + '?' + query.join('&');
        }
        else {
            opts.body = JSON.stringify(params);
        }
        return fetch(url, options ? Object.assign(opts, options) : opts)
            .then((res) => res.json()); // always return a json
    });
}
exports.f = f;
/** Supply out fetch client here */
class VeloceFetchClient extends client_1.VeloceClient {
    constructor(options) {
        super(f, options);
    }
}
exports.VeloceFetchClient = VeloceFetchClient;
