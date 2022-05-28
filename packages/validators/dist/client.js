"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientValidators = void 0;
const validators_1 = require("@jsonql/validators");
class ClientValidators extends validators_1.Validators {
    /**
      @TODO we might not init it this way
    */
    constructor(astMap) {
        super(astMap);
    }
}
exports.ClientValidators = ClientValidators;
