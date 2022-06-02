"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processQueryParameters = exports.parseQuery = void 0;
const tslib_1 = require("tslib");
const constants_1 = require("./constants");
const url_pattern_1 = require("./url-pattern");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('velocejs:bodypaser:parse-query');
// the actual function to take the query apart
function parseQuery(url, query, config) {
    const c = config;
    let params = {
        [constants_1.QUERY_PARAM]: processQueryParameters(query, c[constants_1.STRIP_UNDERSCORE])
    };
    // process the query parameter first if any
    // next if we provide the url for analysis and if it's a dynamic route
    if (c[constants_1.URL_PATTERN_OBJ] || c[constants_1.ORG_ROUTE_REF]) {
        params = Object.assign(params, processDynamicRoute(url, c));
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
/** wrap this together and divide the task here */
function processDynamicRoute(url, config) {
    if (config[constants_1.URL_PATTERN_OBJ]) {
        debug('parse url using UrlPattern');
        return processDynamicRouteByUrlPattern(url, config[constants_1.URL_PATTERN_OBJ]);
    }
    debug('parse url with pattern url');
    return processDynamicRouteWithOrgRef(url, config[constants_1.ORG_ROUTE_REF]);
}
/** process dynamic route */
function processDynamicRouteWithOrgRef(url, originalRouteDef) {
    const orgUrl = originalRouteDef;
    if (url_pattern_1.UrlPattern.check(orgUrl)) {
        const obj = new url_pattern_1.UrlPattern(orgUrl);
        return processDynamicRouteByUrlPattern(url, obj);
    }
    return {};
}
/** if we pass this instance straight means we already did all the work before we call here*/
function processDynamicRouteByUrlPattern(url, urlPatternObj) {
    return {
        [constants_1.DYNAMIC_PARAM]: urlPatternObj.parse(url),
        [constants_1.DYNAMIC_NAMES]: urlPatternObj.names
    };
}
