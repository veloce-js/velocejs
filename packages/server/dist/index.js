"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveStatic = exports.readJsonAsync = exports.createApp = void 0;
const tslib_1 = require("tslib");
// Main entry point
const uWebSockets_js_1 = tslib_1.__importDefault(require("uWebSockets.js"));
const create_app_1 = require("./create-app");
Object.defineProperty(exports, "createApp", { enumerable: true, get: function () { return create_app_1.createApp; } });
const read_json_async_1 = require("./read-json-async");
Object.defineProperty(exports, "readJsonAsync", { enumerable: true, get: function () { return read_json_async_1.readJsonAsync; } });
const serve_static_1 = require("./serve-static");
Object.defineProperty(exports, "serveStatic", { enumerable: true, get: function () { return serve_static_1.serveStatic; } });
// default export
exports.default = uWebSockets_js_1.default;
