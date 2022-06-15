"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJsonLike = exports.createQueryUrl = exports.getParamsForDynamicRoute = exports.hasArgs = exports.getNamesFromDynamicUrl = exports.prepareUrl = void 0;
const tslib_1 = require("tslib");
const url_pattern_1 = tslib_1.__importDefault(require("url-pattern"));
const constants_1 = require("./constants");
/**  construct the url for different type of methods */
function prepareUrl(entry, args) {
    const route = entry.route;
    // handle dynamic route
    if (route.indexOf(constants_1.DYNAMIC_ROUTE_PATTERN) > -1) {
        const lib = new url_pattern_1.default(route);
        const names = getNamesFromDynamicUrl(route);
        const params = getParamsForDynamicRoute(args, names);
        return lib.stringify(params);
    }
    // ugly but works ...
    if (entry.type === constants_1.DEFAULT_REQUEST_METHOD && hasArgs(args)) {
        return createQueryUrl(route, args);
    }
    return route;
}
exports.prepareUrl = prepareUrl;
/** extract the name from the dynamic url for reconstruct the url, from bodyparser */
function getNamesFromDynamicUrl(url) {
    const parts = url.split(constants_1.DYNAMIC_ROUTE_PATTERN);
    parts.shift();
    return parts.map((part) => part.replace('(', '').replace(')', ''));
}
exports.getNamesFromDynamicUrl = getNamesFromDynamicUrl;
/** just check if the arguments has key but not account for the value is array */
function hasArgs(args) {
    return !!Object.keys(args).length;
}
exports.hasArgs = hasArgs;
/** extra the array argument to pass to the UrlPattern lib to construct dynamic url */
function getParamsForDynamicRoute(args, names) {
    let params = []; // it has to be primitive type for url pattern
    // good thing is in the previous call they already been prepared
    for (const key in args) {
        const value = args[key];
        if (Array.isArray(value)) {
            params = params.concat(value);
        }
        else {
            params.push(value);
        }
    }
    return params.map((param, i) => ({
        [names[i]]: param
    })).reduce((a, b) => Object.assign(a, b), {});
}
exports.getParamsForDynamicRoute = getParamsForDynamicRoute;
/** wrap this in one function and we could replace the internal later */
function createQueryUrl(route, args) {
    const url = route + '?';
    const params = [];
    for (const key in args) {
        params.push(`${key}=${args[key]}`);
    }
    return url + params.join('&');
}
exports.createQueryUrl = createQueryUrl;
/** check if the incoming header looks like json */
function isJsonLike(headers) {
    const ct = constants_1.CONTENT_TYPE.toLowerCase();
    return (headers[ct] && headers[ct].indexOf('json') > -1);
}
exports.isJsonLike = isJsonLike;
