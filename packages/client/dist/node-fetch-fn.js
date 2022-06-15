"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// using node-fetch
// as experiement interface keep the same as the fetch api for compatibility
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const constants_1 = require("./constants");
const common_1 = require("./common");
// main
async function main(params) {
    const { url, method, payload } = params;
    const options = {};
    if (method) {
        options.method = method;
        if (payload) {
            options.body = JSON.stringify(payload);
        }
    }
    options.headers = Object.assign(params.headers || {}, constants_1.DEFAULT_HEADERS);
    // console.log('fetch options', options, params)
    // just stub it for now
    return (0, node_fetch_1.default)(url, options)
        .then((res) => (0, common_1.isJsonLike)(res.headers.raw()) ? res.json() : res.text());
    // @TODO if the result contains `error` then we need to deal with it here
}
exports.default = main;
