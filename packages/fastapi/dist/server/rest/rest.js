"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rest = void 0;
const keys_1 = require("./keys");
const ts_ast_parser_1 = require("../lib/ts-ast-parser");
const constants_1 = require("../../constants");
// @BUG it's a shame we couldn't make this more elegant
// because if we use the process.argv[1] to find the file location - it change depends on where we call it
// therefore the parser couldn't find the file
// hence we need this ugly hack to get around the problem
function Rest(constructor) {
    // Voodoo magic
    const stacks = new Error().stack?.split('\n').filter(line => line.indexOf('__decorateClass') > -1);
    // @ts-ignore: stop fucking around this is Voodoo magic
    console.log(stacks);
    const where = stacks ? (stacks.length === 1 ? stacks[0] : stacks[1]).split('(')[1].split(':')[0] : '';
    // from https://stackoverflow.com/questions/51124979/typescript-calling-class-methods-inside-constructor-decorator
    // But this will create a Typescript error `method prepare does not exist on Anonymous class`
    // another way to get around with the properties not able to bind to the constructor.protoype
    // https://stackoverflow.com/questions/48599889/typescript-adding-methods-with-decorator-type-does-not-exist
    return class extends constructor {
        constructor(...args) {
            super(...args);
            (0, ts_ast_parser_1.astParser)(where)
                .then(map => {
                const existingRoutes = Reflect.getOwnMetadata(keys_1.routeKey, constructor.prototype) || [];
                const validations = Reflect.getOwnMetadata(keys_1.argsKey, constructor.prototype) || [];
                // @TODO merge the argument list into the exitingRoutes
                // @TODO merge the map into the valdiations
                // @ts-ignore: prepare does not exist on Anonymous class (it does on FastApi)
                this.prepare(mergeMapToRoute(map, existingRoutes), mergeMapToValidation(map, validations));
            });
        }
    };
}
exports.Rest = Rest;
// merge the AST Map data into the route info map
// then we don't need to extract the param twice
function mergeMapToRoute(map, existingRoutes) {
    return existingRoutes.map(route => {
        if (map[route.propertyName]) {
            route.args = map[route.propertyName];
        }
        return route;
    });
}
// merge map info to the valdiation info
function mergeMapToValidation(map, validations) {
    const tmp = {};
    for (const propertyName in validations) {
        tmp[propertyName] = Object.assign(validations[propertyName], { [constants_1.PARAMS_KEY]: map[propertyName] });
    }
    return tmp;
}
