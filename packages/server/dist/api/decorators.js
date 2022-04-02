"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// all decorators are here
require("reflect-metadata");
const constants_1 = require("../base/constants");
// The key to id the meta info
const routeKey = Symbol("FastApiRouteKey");
// this is the inner decorator factory method
function innerDecoratorFactory(type, path, routeType) {
    // this is the actual api facing the class method
    return (target, propertyName) => {
        // all it does it to record all this meta info and we can re-use it later
        const existingRoutes = Reflect.getOwnMetadata(routeKey, target) || [];
        const meta = { propertyName, path, type: '' };
        switch (type) {
            case constants_1.RAW_TYPE:
                meta.type = constants_1.RAW_TYPE;
                meta.route = routeType;
                break;
            case constants_1.STATIC_TYPE:
                meta.type = constants_1.STATIC_TYPE;
                meta.route = constants_1.STATIC_ROUTE;
                break;
            default:
                meta.type = type;
        }
        existingRoutes.push(meta);
        // console.log('existingRoutes', existingRoutes)
        Reflect.defineMetadata(routeKey, existingRoutes, target);
    };
}
// Factory method to create factory method
function routeDecoratorFactory(routeType) {
    return function (path) {
        return innerDecoratorFactory(routeType, path);
    };
}
// allow dev to define a raw handler - we don't do any processing
function RAW(route, path) {
    return innerDecoratorFactory(constants_1.RAW_TYPE, path, route);
}
exports.RAW = RAW;
// special decorator to create a serveStatic method
function SERVE_STATIC(path) {
    return innerDecoratorFactory(constants_1.STATIC_TYPE, path);
}
exports.SERVE_STATIC = SERVE_STATIC;
// This must be run on the overload method in the sub-class
// otherwise the meta data becomes empty
function PREPARE(target, _, // propertyName is unused, just placeholder it
descriptor) {
    const fn = descriptor.value;
    // console.log(descriptor)
    descriptor.value = function () {
        const meta = Reflect.getOwnMetadata(routeKey, target);
        if (!fn) {
            throw new Error(`Class method is undefined!`);
        }
        return Reflect.apply(fn, this, [meta]);
    };
}
exports.PREPARE = PREPARE;
// making the decorators
exports.ANY = routeDecoratorFactory('any');
exports.GET = routeDecoratorFactory('get');
exports.POST = routeDecoratorFactory('post');
exports.PUT = routeDecoratorFactory('put');
exports.OPTIONS = routeDecoratorFactory('options');
exports.DEL = routeDecoratorFactory('del');
exports.PATCH = routeDecoratorFactory('patch');
exports.HEAD = routeDecoratorFactory('head');
// TBC what these two for
// export const CONNECT = routeDecoratorFactory('connect')
// export const TRACE = routeDecoratorFactory('trace')
// this decorator is going to pass as the onAbort handler
function ABORTED(type, path) {
    return (target, propertyName
    // descriptor: TypedPropertyDescriptor<(meta: RouteMetaInfo[]) => void>
    ) => {
        const meta = Reflect.getOwnMetadata(routeKey, target);
        const existingRoutes = meta.map((m) => {
            if (m.type === type && m.path === path) {
                m.onAbortedHandler = propertyName;
            }
            return m;
        });
        Reflect.defineMetadata(routeKey, existingRoutes, target);
    };
}
exports.ABORTED = ABORTED;
// just for testing
/*
export function TEST_META(...args: any[]) {
  console.log(args)
}
*/
