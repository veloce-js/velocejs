"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQuery = void 0;
// the actual function to take the query apart
function parseQuery(query) {
    const params = new URLSearchParams(query);
    const result = {};
    for (const pair of params.entries()) {
        result[pair[0]] = pair[1];
    }
    return result;
}
exports.parseQuery = parseQuery;
