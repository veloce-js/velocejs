"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
const validators_1 = require("@jsonql/validators");
const fs_extra_1 = require("fs-extra");
const KEYS = [validators_1.VALIDATE_KEY, validators_1.VALIDATE_ASYNC_KEY, validators_1.PLUGIN_FN_KEY];
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
    /** wrap around the parent export method to add our processing */
    exportAll() {
        const e = this.export();
        const o = { schema: {}, plugins: e.plugins };
        // do our processing here
        for (const propName in e.schema) {
            o.schema[propName] = e.schema[propName].rule;
        }
        return o;
    }
    /**
      We only want the function and generate name for it and replace
      the function inside the json file (for the contract)
      then we will import it again on the client, they could use the name
      to call it again
    */
    createScriptFile(filename) {
        const { plugins } = this.exportAll();
        let file = '';
        // for schema
        /*
        for (const propName in json.schema) {
    
        }
        */
        // for plugins, we might only support deliver plugin and inline fucntion all treat as server only
        plugins.forEach((plugin) => {
            KEYS.forEach((key) => {
                if (plugin[key]) {
                    file += `const ${plugin[validators_1.NAME_KEY]} = ${plugin[key].toString()}\n`;
                }
            });
        });
        if (!filename) {
            return file;
        }
        return (0, fs_extra_1.outputFileSync)(filename, file);
    }
}
exports.Validators = Validators;
