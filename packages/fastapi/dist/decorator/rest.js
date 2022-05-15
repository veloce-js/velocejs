"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rest = void 0;
const keys_1 = require("./keys");
const ast_1 = require("@jsonql/ast");
const server_1 = require("@velocejs/server");
const constants_1 = require("../lib/constants");
// import debug from 'debug'
// const debugFn = debug('velocejs:fastapi:decorator:Rest')
/** This should be generic that could apply to different Decorator init */
function Rest(constructor) {
    // Voodoo magic
    const where = (0, ast_1.pickInputFile)(new Error());
    // from https://stackoverflow.com/questions/51124979/typescript-calling-class-methods-inside-constructor-decorator
    // But this will create a Typescript error `method prepare does not exist on Anonymous class`
    // another way to get around with the properties not able to bind to the constructor.protoype
    // https://stackoverflow.com/questions/48599889/typescript-adding-methods-with-decorator-type-does-not-exist
    return class extends constructor {
        constructor(...args) {
            super(...args);
            (0, ast_1.tsClassParser)(where)
                .then(map => {
                const target = constructor.prototype;
                const existingRoutes = Reflect.getOwnMetadata(keys_1.routeKey, target) || [];
                const validations = Reflect.getOwnMetadata(keys_1.validationKey, target) || [];
                const protectedRoute = Reflect.getOwnMetadata(keys_1.protectedKey, target) || [];
                // little trick to get rip of the warning
                this[constants_1.METHOD_TO_RUN](mergeInfo(map, existingRoutes, validations, protectedRoute));
            });
        }
    };
}
exports.Rest = Rest;
// just put them all together
// @TODO protected route as well
function mergeInfo(map, existingRoutes, validations, // @TODO fix this type
protectedRoutes) {
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
/** skip the static and raw type */
function prepareValidateRoute(type, propertyName, validations) {
    return (type === server_1.STATIC_TYPE || type === server_1.RAW_TYPE) ?
        false :
        validations[propertyName] || false;
}
