"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeloceValidationError = exports.VeloceError = void 0;
// we subclass the JsonqlErrors and create our VeloceError here
const errors_1 = require("@jsonql/errors");
class VeloceError extends errors_1.JsonqlError {
    constructor(message, details) {
        super(message, details);
        // @TODO fix the className
    }
}
exports.VeloceError = VeloceError;
class VeloceValidationError extends errors_1.JsonqlError {
    constructor(message, details) {
        super(message, details);
        // @TODO fix the className
    }
}
exports.VeloceValidationError = VeloceValidationError;
