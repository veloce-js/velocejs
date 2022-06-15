"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeClient = void 0;
const tslib_1 = require("tslib");
const http_client_1 = require("./http-client");
const node_fetch_fn_1 = tslib_1.__importDefault(require("./node-fetch-fn"));
/** factory method to create a new node client */
function nodeClient(contract, host) {
    return new http_client_1.HttpClient(contract, node_fetch_fn_1.default, host);
}
exports.nodeClient = nodeClient;
