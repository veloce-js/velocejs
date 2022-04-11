"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookupStatus = exports.getContentType = exports.getWriter = exports.bodyParser = exports.Rest = exports.ServeStatic = exports.Aborted = exports.Head = exports.Patch = exports.Del = exports.Options = exports.Put = exports.Post = exports.Get = exports.Any = exports.Raw = exports.FastApi = void 0;
// fast api
require("reflect-metadata");
var fast_api_1 = require("./server/fast-api");
Object.defineProperty(exports, "FastApi", { enumerable: true, get: function () { return fast_api_1.FastApi; } });
var routes_1 = require("./server/rest/routes");
Object.defineProperty(exports, "Raw", { enumerable: true, get: function () { return routes_1.Raw; } });
Object.defineProperty(exports, "Any", { enumerable: true, get: function () { return routes_1.Any; } });
Object.defineProperty(exports, "Get", { enumerable: true, get: function () { return routes_1.Get; } });
Object.defineProperty(exports, "Post", { enumerable: true, get: function () { return routes_1.Post; } });
Object.defineProperty(exports, "Put", { enumerable: true, get: function () { return routes_1.Put; } });
Object.defineProperty(exports, "Options", { enumerable: true, get: function () { return routes_1.Options; } });
Object.defineProperty(exports, "Del", { enumerable: true, get: function () { return routes_1.Del; } });
Object.defineProperty(exports, "Patch", { enumerable: true, get: function () { return routes_1.Patch; } });
Object.defineProperty(exports, "Head", { enumerable: true, get: function () { return routes_1.Head; } });
Object.defineProperty(exports, "Aborted", { enumerable: true, get: function () { return routes_1.Aborted; } });
Object.defineProperty(exports, "ServeStatic", { enumerable: true, get: function () { return routes_1.ServeStatic; } });
var rest_1 = require("./server/rest/rest");
Object.defineProperty(exports, "Rest", { enumerable: true, get: function () { return rest_1.Rest; } });
// re-export the bodyParser for the Raw method
var src_1 = require("@velocejs/server/src");
Object.defineProperty(exports, "bodyParser", { enumerable: true, get: function () { return src_1.bodyParser; } });
Object.defineProperty(exports, "getWriter", { enumerable: true, get: function () { return src_1.getWriter; } });
Object.defineProperty(exports, "getContentType", { enumerable: true, get: function () { return src_1.getContentType; } });
Object.defineProperty(exports, "lookupStatus", { enumerable: true, get: function () { return src_1.lookupStatus; } });
