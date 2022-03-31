"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABORTED = exports.HEAD = exports.PATCH = exports.DEL = exports.OPTIONS = exports.PUT = exports.POST = exports.GET = exports.ANY = exports.PREPARE = void 0;
// all decorators are here
require("reflect-metadata");
// The key to id the meta info
const routeKey = Symbol("FastApiRouteKey");
// Factory method to create factory method
function routeDecoratorFactory(routeType) {
    return function (path) {
        return (target, propertyName) => {
            // all it does it to record all this meta info and we can re-use it later
            const existingRoutes = Reflect.getOwnMetadata(routeKey, target) || [];
            const meta = { propertyName, path, type: routeType };
            existingRoutes.push(meta);
            // console.log('existingRoutes', existingRoutes)
            Reflect.defineMetadata(routeKey, existingRoutes, target);
        };
    };
}
// this will not get expose as we only use this internally
// This must be run on the overload method in the sub-class
// otherwise the meta data becomes empty
function PREPARE(target, _, // propertyName is unused, just placeholder it
descriptor) {
    const fn = descriptor.value;
    descriptor.value = function () {
        const meta = Reflect.getOwnMetadata(routeKey, target);
        if (!fn) {
            throw new Error(`Fn is undefined!`);
        }
        // console.log('meta', meta)
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
