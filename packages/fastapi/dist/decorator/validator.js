"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = void 0;
const keys_1 = require("./keys");
const constants_1 = require("../lib/constants");
// Validate Decorator
function Validate(rules, // @TODO need to reply the types here
options) {
    return (target, propertyName) => {
        // @TODO should the dev input also get validated?
        const existingMap = Reflect.getOwnMetadata(keys_1.validationKey, target) || {};
        // const existingRoute = Reflect.getOwnMetadata(routeKey, target) || []
        if (!existingMap[propertyName]) {
            // if this get apply to method but not rules, then we use the type info
            // and just check the type itself
            existingMap[propertyName] = {
                [constants_1.RULES_KEY]: rules || constants_1.RULE_AUTOMATIC,
                [constants_1.OPTIONS_KEY]: options || {}
            };
        }
        Reflect.defineMetadata(keys_1.validationKey, existingMap, target);
    };
}
exports.Validate = Validate;
