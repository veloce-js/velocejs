"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeloceFetchClient = exports.f = void 0;
// built-in fetch client
const client_1 = require("./client");
/** Fetch Wrapper */
async function f(url, method, params, options) {
    const opts = {
        method,
        headers: { 'Content-Type': 'application/json' }, // @TODO change to jsonql next
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
        opts['body'] = JSON.stringify(params);
    }
    const _opt = options ? Object.assign(opts, options) : opts;
    return fetch(url, _opt)
        .then((res) => res.json()); // always return a json
}
exports.f = f;
/** Supply our fetch client here */
class VeloceFetchClient extends client_1.VeloceClient {
    constructor(options) {
        super(f, options);
    }
}
exports.VeloceFetchClient = VeloceFetchClient;
