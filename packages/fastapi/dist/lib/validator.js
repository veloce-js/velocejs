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
function createValidator(propertyName, argsList, validationInput) {
    // first need to check if they actually apply the @Validate decorator
    if (validationInput === false) {
        debug(`${propertyName} skip validation`);
        // return a dummy handler
        return async (values) => values;
    }
    debug(`propertyName`, propertyName);
    debug('argsList', argsList);
    debug('input', validationInput);
    assert(propertyName, argsList, validationInput);
    // @TODO we might need to subclass this and create a set global plugin
    const vObj = new validator_1.ValidatorFactory(argsList);
    if (validationInput[constants_1.RULES_KEY] !== constants_1.RULE_AUTOMATIC) {
        vObj.createSchema(validationInput[constants_1.RULES_KEY]);
    }
    // return the validate method directly
    return vObj.validate;
}
exports.createValidator = createValidator;
/** validate aginst the dev input first */
function assert(propertyName, argsList, validationInput) {
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