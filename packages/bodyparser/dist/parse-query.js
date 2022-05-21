"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processQueryParameters = exports.parseQuery = void 0;
const tslib_1 = require("tslib");
const constants_1 = require("./constants");
const url_pattern_1 = require("./url-pattern");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('velocejs:bodypaser:parse-query');
// the actual function to take the query apart
function parseQuery(query, config) {
    const { stripUnderscoreParam, originalRouteDef } = config;
    let params = processQueryParameters(query, stripUnderscoreParam);
    // process the query parameter first if any
    // next if we provide the url for analysis and if it's a dynamic route
    if (originalRouteDef) {
        params = Object.assign(params, processDynamicRoute(query, originalRouteDef));
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
    return { [constants_1.QUERY_PARAM]: result };
}
exports.processQueryParameters = processQueryParameters;
/** process dynamic route */
function processDynamicRoute(query, originalRouteDef) {
    const url = originalRouteDef;
    if (url_pattern_1.UrlPattern.check(url)) {
        debug(`originalRouteDef`, query);
        const obj = new url_pattern_1.UrlPattern(url);
        return {
            [constants_1.DYNAMIC_PARAM]: obj.parse(query),
            [constants_1.DYNAMIC_NAMES]: obj.names
        };
    }
    return {};
}
