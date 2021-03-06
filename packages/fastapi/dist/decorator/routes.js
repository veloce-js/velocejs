"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aborted = exports.Websocket = exports.Head = exports.Patch = exports.Del = exports.Options = exports.Put = exports.Post = exports.Get = exports.Any = exports.ServeStatic = exports.Raw = void 0;
const bodyparser_1 = require("@velocejs/bodyparser");
const server_1 = require("@velocejs/server");
const keys_1 = require("./keys");
/** make sure the dynamic route only apply on GET route */
const assertRoutePath = (type, path) => {
    if (type !== server_1.GET_ROUTE_NAME && bodyparser_1.UrlPattern.check(path)) {
        throw new Error(`Dynamic route is not allow with ${type} route`);
    }
};
// util
const getOpt = (name, opts) => opts ? opts[name] : opts;
/** The actual factory metod to generate the call **/
function innerDecoratorFactory(type, path, opts) {
    // validate the url here then we won't get problem later in the class
    assertRoutePath(type, path);
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
                meta.route = opts ? opts.routeType : server_1.GET_ROUTE_NAME; // this is the GET, POST etc etc
                break;
            case server_1.STATIC_TYPE:
                meta.type = server_1.STATIC_TYPE;
                meta.route = server_1.STATIC_ROUTE;
                break;
            default:
                meta.type = type;
                meta.excluded = getOpt('excluded', opts); // passing this back for use later
            // meta.protected = getOpt('protected', opts)
        }
        // we should check if the same type already defined the same path
        if (!existingRoutes.filter(// not found
        (route) => route.type === type && route.path === path).length) {
            existingRoutes.push(meta);
            // console.log('existingRoutes', existingRoutes)
            Reflect.defineMetadata(keys_1.routeKey, existingRoutes, target);
        }
        else {
            throw new Error(`${path} already defined with ${type}!`);
        }
    };
}
// allow dev to define a raw handler - we don't do any processing
function Raw(routeType, path) {
    return innerDecoratorFactory(server_1.RAW_TYPE, path, { routeType });
}
exports.Raw = Raw;
/** special decorator to create a serveStatic method, you could specify a routeType default to GET */
// Accessor Decorator
function ServeStatic(path) {
    // @TODO the options is not apply fully
    return innerDecoratorFactory(server_1.STATIC_TYPE, path);
}
exports.ServeStatic = ServeStatic;
// Factory method to create factory method
function routeDecoratorFactory(routeType) {
    // @TODO if they didn't provide a path then we could use the propertyName as path
    return (path, opts) => {
        // 0.7.4 We use the opts to do further customization for the route such as exclude from contract
        return innerDecoratorFactory(routeType, path, opts);
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
// Websocket - the s is lowercase to avoid the WebSocket type
exports.Websocket = routeDecoratorFactory(server_1.WEBSOCKET_ROUTE_NAME);
// TBC what these two for
// export const CONNECT = routeDecoratorFactory('connect')
// export const TRACE = routeDecoratorFactory('trace')
// this decorator is going to pass as the onAbortHandler
// @BUG there is a problem here how to id this aborter with the route
// May be we should only allow one aborter to handle all
/** @deprecated it will move to the override hook */
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
