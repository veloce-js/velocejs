"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
const tslib_1 = require("tslib");
const validators_1 = require("@jsonql/validators");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('velocejs:validator:main');
/**
  Here we take the parent methods and onlly deal with the
  generate files / contract
**/
class Validators extends validators_1.Validators {
    /** main */
    constructor(astMap) {
        super(astMap);
    }
    exportSchema() {
        debug('@TODO export the schema for contract');
    }
    exportScript() {
        debug('@TODO export the extra validation rule to a file');
    }
}
exports.Validators = Validators;
