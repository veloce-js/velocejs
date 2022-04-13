"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = void 0;
// Validator Decorator
// import { DescriptorMeta } from '../../types'
const keys_1 = require("./keys");
const constants_1 = require("../../constants");
/**
@TODO if we apply the Validate after the Route definition
      it won't work - the Route received the descriptor as promise<pending>
      if it's an async method, if we use async await
      then the route setup will not able to get any routes (not resolve by that time)
      but as soon as we switch the order (Validate before  route)
      it works. This could potentially lead to other unforseen bug
**/
function Validate(options) {
    return async (target, propertyName) => {
        // @TODO should the dev input also get validated?
        const existingMap = Reflect.getOwnMetadata(keys_1.validationKey, target) || {};
        if (!existingMap[propertyName]) {
            existingMap[propertyName] = { [constants_1.RULES_KEY]: options };
        }
        Reflect.defineMetadata(keys_1.validationKey, existingMap, target);
    };
}
exports.Validate = Validate;
