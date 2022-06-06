"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
const validators_server_1 = require("@jsonql/validators/dist/validators-server");
const constants_1 = require("./constants");
// main
class Validators extends validators_server_1.ValidatorsServer {
    /** main */
    constructor(astMap) {
        super(astMap);
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
}
exports.Validators = Validators;
