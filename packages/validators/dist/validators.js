"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
const tslib_1 = require("tslib");
const validator_1 = require("@jsonql/validator");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('velocejs:validator:main');
/**
  Instead of one ast per init
   we now pass the entire ast here
   then get it back via the propertyName
**/
class Validators {
    /** main */
    constructor(_astMap) {
        this._astMap = _astMap;
        this._validationRules = new Map();
        this._validators = new Map();
        this._plugin = new validator_1.ValidatorPlugins();
        for (const propertyName in this._astMap) {
            this._validators.set(propertyName, new validator_1.ValidatorFactory(this._astMap[propertyName], this._plugin));
        }
    }
    /** get the validator */
    getValidator(propertyName) {
        if (this._validators.has(propertyName)) {
            const obj = this._validators.get(propertyName);
            // we need to overload the methods here
            return {
                addValidationRules: this.addValidationRules(propertyName, obj === null || obj === void 0 ? void 0 : obj.addValidationRules.bind(obj)),
                validate: obj === null || obj === void 0 ? void 0 : obj.validate.bind(obj)
            };
        }
        throw new Error(`${propertyName} validator is not registered!`);
    }
    // ------------------- OVERLOAD ----------------------//
    registerPlugin(name, pluginConfig) {
        this._plugin.registerPlugin(name, pluginConfig);
    }
    loadExtPlugin(name, pluginConfig) {
        this._plugin.loadExtPlugin(name, pluginConfig);
    }
    addValidationRules(propertyName, orgAddValidationRule) {
        return (input) => {
            this._appendRules(propertyName, input);
            orgAddValidationRule(input);
        };
    }
    export() {
        debug('@TODO export all schema');
    }
    /** store the rules for later export */
    _appendRules(propertyName, input) {
        let existingRules = [];
        if (this._validationRules.has(propertyName)) {
            existingRules = this._validationRules.get(propertyName);
        }
        existingRules = existingRules.concat([input]);
        this._validationRules.set(propertyName, existingRules.concat([input]));
    }
}
exports.Validators = Validators;
