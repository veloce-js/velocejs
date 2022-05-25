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
            // overload the method here
            return {
                addValidationRules: this.addValidationRules(propertyName, obj),
                validate: obj.validate.bind(obj)
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
    addValidationRules(propertyName, obj) {
        return (input) => {
            this._appendRules(propertyName, input);
            return Reflect.apply(obj.addValidationRules, obj, [input]);
        };
    }
    export() {
        const result = {};
        this._validationRules.forEach((value, key) => {
            result[key] = value;
        });
        debug('export schema', result);
        return result;
    }
    /*
    @TODO
    When to add
    1. when a rule is add we check if this is internal plugin and not mark as `server`
    2. When a rule is insert via loadExtPlugin and the original plugin was not mark as server
  
    IDEA
    we could extract the inline code and store it in file (or just in memeory)
    and insert a new url (e.g. /veloce/plugin) then serve it up to the client
    */
    /** store the rules for later export */
    _appendRules(propertyName, input) {
        if (this._validationRules.has(propertyName)) {
            const existingRules = this._validationRules.get(propertyName);
            this._validationRules.set(propertyName, existingRules.concat([input]));
        }
        else {
            debug('adding new rule', input);
            this._validationRules.set(propertyName, [input]);
        }
    }
}
exports.Validators = Validators;
