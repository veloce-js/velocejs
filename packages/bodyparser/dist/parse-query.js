"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processQueryParameters = exports.parseQuery = void 0;
const constants_1 = require("./constants");
const url_pattern_1 = require("./url-pattern");
// import debugFn from 'debug'
// const debug = debugFn('velocejs:bodypaser:parse-query')
// the actual function to take the query apart
function parseQuery(url, query, config) {
    const c = config;
    let params = {
        [constants_1.QUERY_PARAM]: processQueryParameters(query, c[constants_1.STRIP_UNDERSCORE])
    };
    // process the query parameter first if any
    // next if we provide the url for analysis and if it's a dynamic route
    if (c[constants_1.ORG_ROUTE_REF]) {
        params = Object.assign(params, processDynamicRoute(url, c[constants_1.ORG_ROUTE_REF]));
    }
    // only one way or the other, not allow to mix and match
    return params;
}
exports.parseQuery = parseQuery;
/** break up the process to make the main interface cleaner */
function processQueryParameters(query, stripUnderscoreParam) {
    const params = new URLSearchParams(query);
    const result = {};
    for (const pair of params.entries()) {
        const key = pair[0];
        if (stripUnderscoreParam) {
            if (key.substring(0, 1) === '_') {
                continue;
            }
        }
        result[key] = pair[1];
    }
    return result;
}
exports.processQueryParameters = processQueryParameters;
/** process dynamic route */
function processDynamicRoute(url, originalRouteDef) {
    const orgUrl = originalRouteDef;
    if (url_pattern_1.UrlPattern.check(orgUrl)) {
        const obj = new url_pattern_1.UrlPattern(orgUrl);
        return {
            [constants_1.DYNAMIC_PARAM]: obj.parse(url),
            [constants_1.DYNAMIC_NAMES]: obj.names
        };
    }
    return {};
}
