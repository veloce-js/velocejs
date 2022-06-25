"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rest = void 0;
const tslib_1 = require("tslib");
const keys_1 = require("./keys");
const ast_1 = require("@jsonql/ast");
const constants_1 = require("../lib/constants");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('velocejs:fastapi:rest');
// import debug from 'debug'
// const debugFn = debug('velocejs:fastapi:decorator:Rest')
/** This should be generic that could apply to different Decorator init */
// @NOTE no matter what you do here - there will always be warning, just one or many many ...
// export function Rest<T extends { new (...args: AnyTypeArr): Record<string, unknown> }>(constructor: T) {
/** if we follow what the type hint said, the this object becomes useless */
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
                debug('ast map', map);
                const target = constructor.prototype;
                const existingRoutes = Reflect.getOwnMetadata(keys_1.routeKey, target) || [];
                const validations = Reflect.getOwnMetadata(keys_1.validationKey, target) || [];
                const protectedRoute = Reflect.getOwnMetadata(keys_1.protectedKey, target) || [];
                // @NOTE little trick to get rip of the method-not-exist warning
                this[constants_1.METHOD_TO_RUN](map, existingRoutes, validations, protectedRoute);
            });
        }
    };
}
exports.Rest = Rest;
