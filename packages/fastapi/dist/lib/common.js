"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertDynamicRouteArgs = exports.prepareSpreadArg = exports.isSpreadFn = exports.hasSpreadArg = exports.convertStrToType = exports.prepareArgs = exports.extractArgs = void 0;
const tslib_1 = require("tslib");
const constants_1 = require("@jsonql/constants");
const constants_2 = require("./constants");
const utils_1 = require("@jsonql/utils");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('velocejs:fastapi:common');
// ugly but simple and it works
function extractArgs(fnStr) {
    return splitMethod(fnStr);
}
exports.extractArgs = extractArgs;
// 0.103 -- this is 50% faster then regex!
function splitMethod(fnStr) {
    return fnStr.split('(')[1]
        .split(')')[0]
        .split(',')
        .map(t => t.trim())
        .filter(t => t !== '');
}
/** The validate result now comes in an object, we need to turn into array for apply */
function prepareArgs(argList, result) {
    return argList.map(name => result[name]);
}
exports.prepareArgs = prepareArgs;
/*
Moving some of the smaller function out from the fastapi to reduce the complexity
*/
/** convert the string from url to the right type for dynamic route */
function convertStrToType(argNames, argsList, params) {
    return argNames.map((name, i) => {
        switch (argsList[i].type) {
            case 'number':
                return (0, utils_1.strToNum)(params[name]);
            case 'boolean':
                return (0, utils_1.strToBool)(params[name]);
            default:
                return params[name];
        }
    });
}
exports.convertStrToType = convertStrToType;
/** take the spread argument def if there is one */
function hasSpreadArg(argsList) {
    // you could only have one
    return argsList.filter(isSpreadFn)[0];
}
exports.hasSpreadArg = hasSpreadArg;
/** check if this handler is using a spread argument  */
function isSpreadFn(list) {
    return (list && // spread argument?
        list[constants_1.TS_TYPE_NAME] &&
        list[constants_1.TS_TYPE_NAME] === constants_1.SPREAD_ARG_TYPE);
}
exports.isSpreadFn = isSpreadFn;
/** just a loop to take the value out from the params for spread fn */
function prepareSpreadArg(params) {
    const args = [];
    for (const key in params) {
        args.push(params[key]);
    }
    return args;
}
exports.prepareSpreadArg = prepareSpreadArg;
/** check if the dynamic route parameter is valid or not, this throw to hail */
function assertDynamicRouteArgs(argsList) {
    if (argsList.filter((arg) => {
        let tk = 'type';
        if (isSpreadFn(arg)) {
            tk = 'types';
        }
        return !constants_2.DYNAMIC_ROUTE_ALLOW_TYPES.includes(arg[tk]);
    }).length) {
        throw new Error(`We only support ${constants_2.DYNAMIC_ROUTE_ALLOW_TYPES.join(',')} in dynamic route handler`);
    }
}
exports.assertDynamicRouteArgs = assertDynamicRouteArgs;
