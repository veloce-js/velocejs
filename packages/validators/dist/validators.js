"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
const validators_1 = require("@jsonql/validators");
const common_1 = require("./common");
const fs_extra_1 = require("fs-extra");
const constants_1 = require("./constants");
const KEYS = [constants_1.PLUGIN_FN_KEY, constants_1.VALIDATE_KEY, constants_1.VALIDATE_ASYNC_KEY];
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
        const o = { [constants_1.SCHEMA_KEY]: {}, [constants_1.PLUGINS_KEY]: e[constants_1.PLUGINS_KEY] };
        // do our processing here
        for (const propName in e[constants_1.SCHEMA_KEY]) {
            o[constants_1.SCHEMA_KEY][propName] = e[constants_1.SCHEMA_KEY][propName][constants_1.RULES_KEY];
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
        // for schema
        /*
        for (const propName in json.schema) {
    
        }
        */
        // for plugins, we might only support deliver plugin and inline fucntion all treat as server only
        const ctn = KEYS.length;
        const files = plugins.map((plugin) => {
            for (let i = 0; i < ctn; ++i) {
                const key = KEYS[i];
                if (plugin[key]) {
                    return `const ${plugin[constants_1.NAME_KEY]} = ${(0, common_1.transformMainFn)(plugin[key].toString())}`;
                }
            }
            return '';
        });
        if (!filename) {
            return files.join('\n');
        }
        return (0, fs_extra_1.outputFileSync)(filename, files.join(''));
    }
}
exports.Validators = Validators;
