"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aborted = exports.Head = exports.Patch = exports.Del = exports.Options = exports.Put = exports.Post = exports.Get = exports.Any = exports.ServeStatic = exports.Raw = void 0;
const constants_1 = require("@velocejs/server/src/base/constants");
const routekey_1 = require("./routekey");
// The inner decorator factory method
function innerDecoratorFactory(type, path, routeType) {
    // this is the actual api facing the class method
    return (target, propertyName) => {
        // all it does it to record all this meta info and we can re-use it later
        const existingRoutes = Reflect.getOwnMetadata(routekey_1.routeKey, target) || [];
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
        Reflect.defineMetadata(routekey_1.routeKey, existingRoutes, target);
    };
}
// Factory method to create factory method
function routeDecoratorFactory(routeType) {
    return function (path) {
        return innerDecoratorFactory(routeType, path);
    };
}
// allow dev to define a raw handler - we don't do any processing
function Raw(route, path) {
    return innerDecoratorFactory(constants_1.RAW_TYPE, path, route);
}
exports.Raw = Raw;
// special decorator to create a serveStatic method
function ServeStatic(path) {
    return innerDecoratorFactory(constants_1.STATIC_TYPE, path);
}
exports.ServeStatic = ServeStatic;
// making the decorators
exports.Any = routeDecoratorFactory('any');
exports.Get = routeDecoratorFactory('get');
exports.Post = routeDecoratorFactory('post');
exports.Put = routeDecoratorFactory('put');
exports.Options = routeDecoratorFactory('options');
exports.Del = routeDecoratorFactory('del');
exports.Patch = routeDecoratorFactory('patch');
exports.Head = routeDecoratorFactory('head');
// TBC what these two for
// export const CONNECT = routeDecoratorFactory('connect')
// export const TRACE = routeDecoratorFactory('trace')
// this decorator is going to pass as the onAbort handler
function Aborted(type, path) {
    return (target, propertyName
    // descriptor: TypedPropertyDescriptor<(meta: RouteMetaInfo[]) => void>
    ) => {
        const meta = Reflect.getOwnMetadata(routekey_1.routeKey, target);
        const existingRoutes = meta.map((m) => {
            if (m.type === type && m.path === path) {
                m.onAbortedHandler = propertyName;
            }
            return m;
        });
        Reflect.defineMetadata(routekey_1.routeKey, existingRoutes, target);
    };
}
exports.Aborted = Aborted;
