"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
const validators_1 = require("@jsonql/validators");
// also call Validators just include from different path  
class Validators extends validators_1.Validators {
    /**
      @TODO we might not init it this way
    */
    constructor(astMap) {
        super(astMap);
    }
}
exports.Validators = Validators;
