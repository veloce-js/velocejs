"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
const validators_1 = require("@jsonql/validators");
/**
  Here we take the parent methods and onlly deal with the
  generate files / contract
**/
class Validators extends validators_1.Validators {
    /** main */
    constructor(astMap) {
        super(astMap);
    }
    /**
      directly call the addValidationRules with the propertyName
      on the client side this get call after the contract loaded
    */
    addRules(propertyName, rules) {
        const val = this.getValidator(propertyName);
        val.addValidationRules(rules);
        return val; // we return the validator to use
    }
    /** On the client side we don't need a map */
    registerPlugins(pluginConfigs) {
        for (const name in pluginConfigs) {
            const config = pluginConfigs[name];
            this.registerPlugin(name, config);
        }
    }
}
exports.Validators = Validators;
