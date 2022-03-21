"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const tslib_1 = require("tslib");
const uWebSockets_js_1 = tslib_1.__importDefault(require("uWebSockets.js"));
/**
 *
 *
 */
function createApp(opt) {
    return opt ? uWebSockets_js_1.default.SSLApp(opt) : uWebSockets_js_1.default.App();
}
exports.createApp = createApp;
