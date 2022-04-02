"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this is from the examples/RateLimit.js
function rateLimit(limit, interval) {
    let now = 0;
    // we couldn't use the symbol as key here, the problem is in the Type definition
    // the ws has ws[string]: any but not Symbol they need to expand this crap
    // const last: symbol = Symbol('last')
    // const count: symbol = Symbol('count')
    setInterval(() => {
        ++now;
    }, interval);
    return (ws) => {
        if (ws.last != now) {
            ws.last = now;
            ws.count = 1;
        }
        else {
            return ++ws.count > limit;
        }
    };
}
exports.rateLimit = rateLimit;
