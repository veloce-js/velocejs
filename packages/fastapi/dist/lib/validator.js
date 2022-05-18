"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidator = void 0;
const tslib_1 = require("tslib");
// wrap the @jsonql/validator here
const validator_1 = require("@jsonql/validator");
const constants_1 = require("./constants");
const utils_1 = require("@jsonql/utils");
const errors_1 = require("../lib/errors");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('velocejs:fastapi:lib:validator');
function createValidator(propertyName, argsList, // @TODO fix types
validationInput, // @TODO fix types
plugins // @TODO fix types
) {
    // first need to check if they actually apply the @Validate decorator
    if (validationInput === false) {
        debug(`skip validation --> ${propertyName}`);
        // return a dummy handler - we need to package it up for consistency!
        return async (values) => values; //  we don't need to do anyting now
    }
    debug('input -->', validationInput);
    assert(propertyName, argsList, validationInput);
    // @TODO we might need to subclass this and create a set global plugin
    const vObj = new validator_1.ValidatorFactory(argsList);
    if (plugins && plugins.length) {
        console.info('create plugins', plugins);
    }
    if (validationInput[constants_1.RULES_KEY] !== constants_1.RULE_AUTOMATIC) {
        vObj.addValidationRules(validationInput[constants_1.RULES_KEY]);
    }
    // if we return it directly then it won't run
    return async (values) => vObj.validate(values);
}
exports.createValidator = createValidator;
/** validate aginst the dev input first */
function assert(propertyName, argsList, validationInput // @TODO fix types
) {
    // silly mistake
    if (!argsList.length) {
        throw new Error(`${propertyName} has no parameters and therefore can not apply validation!`);
    }
    // check the name matches
    if (validationInput[constants_1.RULES_KEY] !== constants_1.RULE_AUTOMATIC) {
        const names = [];
        for (const name in validationInput[constants_1.RULES_KEY]) {
            names.push(name);
        }
        const wrongName = argsList.filter(arg => !(0, utils_1.inArray)(names, arg.name));
        if (wrongName.length) {
            throw new errors_1.VeloceError(`${propertyName}: Some of your validation argument name is wrong!
        ${names.join(',')} NOT IN ${wrongName.map(w => w.name).join(',')}`);
        }
    }
}
