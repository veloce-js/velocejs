"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareValidateRoute = exports.mergeInfo = exports.notUndef = exports.prepareArgsFromDynamicToSpread = exports.assertDynamicRouteArgs = exports.prepareSpreadArg = exports.isSpreadFn = exports.hasSpreadArg = exports.convertStrToTypeAction = exports.convertStrToType = exports.prepareArgs = exports.extractArgs = void 0;
const tslib_1 = require("tslib");
const server_1 = require("@velocejs/server");
const constants_1 = require("@jsonql/ast/dist/lib/constants");
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
        return convertStrToTypeAction(argsList[i].type, params[name]);
    });
}
exports.convertStrToType = convertStrToType;
/** The actual method to convert the string to their type */
function convertStrToTypeAction(type, value) {
    switch (type) {
        case 'number':
            return (0, utils_1.strToNum)(value);
        case 'boolean':
            return (0, utils_1.strToBool)(value);
        default:
            return value;
    }
}
exports.convertStrToTypeAction = convertStrToTypeAction;
/** take the spread argument def if there is one */
function hasSpreadArg(argsList) {
    // you could only have one
    return argsList.filter(isSpreadFn)[0];
}
exports.hasSpreadArg = hasSpreadArg;
/** check if this handler is using a spread argument  */
function isSpreadFn(list) {
    // debug('list isSpreadFn', list)
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
        const tk = isSpreadFn(arg) ? 'types' : 'type';
        return !constants_2.DYNAMIC_ROUTE_ALLOW_TYPES.includes(arg[tk]);
    }).length) {
        throw new Error(`We only support ${constants_2.DYNAMIC_ROUTE_ALLOW_TYPES.join(',')} in dynamic route handler`);
    }
}
exports.assertDynamicRouteArgs = assertDynamicRouteArgs;
/** this is a mouthful! */
function prepareArgsFromDynamicToSpread(argNames, argsList, params, paramNames) {
    debug('names', paramNames, params, paramNames);
    const processedNames = [];
    const result = argsList.map((list, i) => {
        if (isSpreadFn(list)) {
            const tmp = [];
            paramNames.forEach((name) => {
                if (!processedNames.includes(name)) {
                    tmp.push(convertStrToTypeAction(list.types, params[name]));
                }
            });
            return tmp;
        }
        else {
            const name = argNames[i];
            processedNames.push(name);
            return params[name];
        }
    });
    return (0, utils_1.flatMap)(result);
}
exports.prepareArgsFromDynamicToSpread = prepareArgsFromDynamicToSpread;
/** check if a value is undefined, wrapper to make the code looks cleaner */
const notUndef = (value) => value !== undefined;
exports.notUndef = notUndef;
// just put them all together
/** This method was in the rest.ts now move inside the FastApi class def
because we need to re-organize how to init the validation object among others
*/
function mergeInfo(map, existingRoutes, validations, protectedRoutes) {
    return existingRoutes.map(route => {
        const { propertyName, type } = route;
        if (map[propertyName]) {
            route.args = map[propertyName];
        }
        route.protected = protectedRoutes && protectedRoutes.indexOf(propertyName) > -1;
        route.validation = prepareValidateRoute(type, propertyName, validations);
        return route;
    });
}
exports.mergeInfo = mergeInfo;
/** skip the static and raw type */
function prepareValidateRoute(type, propertyName, validations) {
    if (type !== server_1.STATIC_TYPE && type !== server_1.RAW_TYPE) {
        return validations[propertyName];
    }
    return undefined;
}
exports.prepareValidateRoute = prepareValidateRoute;
