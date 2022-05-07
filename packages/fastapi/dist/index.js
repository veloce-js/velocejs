"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookupStatus = exports.getContentType = exports.getWriter = void 0;
const tslib_1 = require("tslib");
// fast api
require("reflect-metadata");
// re-export
tslib_1.__exportStar(require("./fast-api"), exports);
tslib_1.__exportStar(require("./decorator/routes"), exports);
tslib_1.__exportStar(require("./decorator/rest"), exports);
tslib_1.__exportStar(require("./decorator/validator"), exports);
// re-export some of the methods that is useful here
var server_1 = require("@velocejs/server");
Object.defineProperty(exports, "getWriter", { enumerable: true, get: function () { return server_1.getWriter; } });
Object.defineProperty(exports, "getContentType", { enumerable: true, get: function () { return server_1.getContentType; } });
Object.defineProperty(exports, "lookupStatus", { enumerable: true, get: function () { return server_1.lookupStatus; } });
