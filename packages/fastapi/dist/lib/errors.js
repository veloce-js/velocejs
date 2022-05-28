"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeloceError = void 0;
const tslib_1 = require("tslib");
// we subclass the JsonqlErrors and create our VeloceError here
const error_1 = tslib_1.__importDefault(require("@jsonql/errors/dist/error"));
class VeloceError extends error_1.default {
    constructor(...args) {
        super(...args);
        this.className = VeloceError.name;
    }
}
exports.VeloceError = VeloceError;
