"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = void 0;
// Validator Decorator
// import { DescriptorMeta } from '../../types'
const keys_1 = require("./keys");
const constants_1 = require("../../constants");
/**
@TODO fix the type for rules

style one follow the async-validator

{
  fieldName: {
    rules: [

    ]
  }
}

follow the order of the arguments

[
  [
    {rules},
    {rules}
  ] // <== argument 1
]
**/
function Validate(rules, options) {
    return (target, propertyName) => {
        // @TODO should the dev input also get validated?
        const existingMap = Reflect.getOwnMetadata(keys_1.validationKey, target) || {};
        if (!existingMap[propertyName]) {
            // if this get apply to method but not rules, then we use the type info
            // and just check the type itself
            existingMap[propertyName] = {
                [constants_1.RULES_KEY]: rules || constants_1.AUTOMATIC,
                [constants_1.OPTIONS_KEY]: options || {}
            };
        }
        Reflect.defineMetadata(keys_1.validationKey, existingMap, target);
    };
}
exports.Validate = Validate;
