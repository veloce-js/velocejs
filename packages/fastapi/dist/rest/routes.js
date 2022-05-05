"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aborted = exports.Head = exports.Patch = exports.Del = exports.Options = exports.Put = exports.Post = exports.Get = exports.Any = exports.ServeStatic = exports.Raw = void 0;
const server_1 = require("@velocejs/server");
const keys_1 = require("./keys");
// The inner decorator factory method
function innerDecoratorFactory(type, path, routeType) {
    // this is the actual api facing the class method
    // @TODO create a type fo a generic class instance
    return (target, propertyName
    /*, descriptor: DescriptorMeta*/
    ) => {
        // console.log('descriptor', descriptor)
        const existingRoutes = Reflect.getOwnMetadata(keys_1.routeKey, target) || [];
        const meta = {
            propertyName,
            path,
            type: ''
        };
        switch (type) {
            case server_1.RAW_TYPE:
                meta.type = server_1.RAW_TYPE;
                meta.route = routeType; // this is the GET, POST etc etc
                break;
            case server_1.STATIC_TYPE:
                meta.type = server_1.STATIC_TYPE;
                meta.route = server_1.STATIC_ROUTE;
                break;
            default:
                // this get replace by the AST map
                // meta.args = extractArgs(descriptor.value.toString())
                meta.type = type;
        }
        existingRoutes.push(meta);
        // console.log('existingRoutes', existingRoutes)
        Reflect.defineMetadata(keys_1.routeKey, existingRoutes, target);
    };
}
// allow dev to define a raw handler - we don't do any processing
function Raw(route, path) {
    return innerDecoratorFactory(server_1.RAW_TYPE, path, route);
}
exports.Raw = Raw;
// special decorator to create a serveStatic method
// Accessor Decorator
function ServeStatic(path) {
    return innerDecoratorFactory(server_1.STATIC_TYPE, path);
}
exports.ServeStatic = ServeStatic;
// Factory method to create factory method
function routeDecoratorFactory(routeType) {
    // @TODO if they didn't provide a path then we should just use the propertyName as path
    return (path /*, opts?: RouteOptions*/) => {
        return innerDecoratorFactory(routeType, path /*, opts */);
    };
}
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
// this decorator is going to pass as the onAbortHandler
// @BUG there is a problem here how to id this aborter with the route
// May be we should only allow one aborter to handle all 
function Aborted(type, path) {
    return (target, propertyName
    // descriptor: TypedPropertyDescriptor<(meta: RouteMetaInfo[]) => void>
    ) => {
        const meta = Reflect.getOwnMetadata(keys_1.routeKey, target);
        const existingRoutes = meta.map((m) => {
            if (m.type === type && m.path === path) {
                m.onAbortedHandler = propertyName;
            }
            return m;
        });
        Reflect.defineMetadata(keys_1.routeKey, existingRoutes, target);
    };
}
exports.Aborted = Aborted;
