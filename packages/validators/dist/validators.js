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
}
exports.Validators = Validators;
