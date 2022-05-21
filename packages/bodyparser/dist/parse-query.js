"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQuery = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('velocejs:bodypaser:parse-query');
// the actual function to take the query apart
function parseQuery(query, config) {
    const params = new URLSearchParams(query);
    const result = {};
    for (const pair of params.entries()) {
        result[pair[0]] = pair[1];
    }
    if (config) {
        debug('config', config); // we will use this to decide what should keep
    }
    return result;
}
exports.parseQuery = parseQuery;
