"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidator = void 0;
const tslib_1 = require("tslib");
const constants_1 = require("./constants");
const utils_1 = require("@jsonql/utils");
const errors_1 = require("../lib/errors");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('velocejs:fastapi:lib:validator');
/** get the validator for the propertyName and add extra rules here */
function createValidator(propertyName, argsList, vObj, validationInput) {
    debug('createValidator input -->', validationInput);
    assert(propertyName, argsList, validationInput);
    if (validationInput[constants_1.RULES_KEY] !== constants_1.RULE_AUTOMATIC) {
        debug('addValidationRules', validationInput[constants_1.RULES_KEY]);
        vObj.addValidationRules(validationInput[constants_1.RULES_KEY]);
    }
    // if we return it directly then it won't run
    return async (values) => vObj.validate(values);
}
exports.createValidator = createValidator;
/** validate aginst the dev input first */
function assert(propertyName, argsList, validationInput // @TODO fix types if I use the ValidationInput then it doesnt work below
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
