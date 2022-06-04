"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
const validators_1 = require("@jsonql/validators");
const constants_1 = require("./constants");
/**
  Here we take the parent methods and onlly deal with the
  generate files / contract
**/
class Validators extends validators_1.Validators {
    /** main */
    constructor(astMap) {
        super(astMap);
    }
    /** directly call the addValidationRules with the propertyName */
    addRules(propertyName, rules) {
        const val = this.getValidator(propertyName);
        val.addValidationRules(rules);
        return val; // we return the validator to use
    }
    /** This is created for FastApi to dump a whole set of plugins registration from a Map */
    registerPlugins(pluginConfigs) {
        pluginConfigs.forEach((config, name) => {
            this.registerPlugin(name, config);
        });
    }
    /** wrap around the parent export method to add our processing */
    exportAll() {
        const e = this.export();
        const o = { [constants_1.SCHEMA_KEY]: {}, [constants_1.PLUGINS_KEY]: e[constants_1.PLUGINS_KEY] };
        // do our processing here
        for (const propName in e[constants_1.SCHEMA_KEY]) {
            o[constants_1.SCHEMA_KEY][propName] = e[constants_1.SCHEMA_KEY][propName][constants_1.RULES_KEY];
        }
        return o;
    }
}
exports.Validators = Validators;
