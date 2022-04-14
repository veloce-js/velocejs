"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookupStatus = exports.getContentType = exports.getWriter = exports.bodyParser = void 0;
const tslib_1 = require("tslib");
// fast api
require("reflect-metadata");
// re-export 
tslib_1.__exportStar(require("./server/fast-api"), exports);
tslib_1.__exportStar(require("./server/rest/routes"), exports);
tslib_1.__exportStar(require("./server/rest/rest"), exports);
tslib_1.__exportStar(require("./server/rest/validator"), exports);
// re-export some of the methods that is useful here
var src_1 = require("@velocejs/server/src");
Object.defineProperty(exports, "bodyParser", { enumerable: true, get: function () { return src_1.bodyParser; } });
Object.defineProperty(exports, "getWriter", { enumerable: true, get: function () { return src_1.getWriter; } });
Object.defineProperty(exports, "getContentType", { enumerable: true, get: function () { return src_1.getContentType; } });
Object.defineProperty(exports, "lookupStatus", { enumerable: true, get: function () { return src_1.lookupStatus; } });
