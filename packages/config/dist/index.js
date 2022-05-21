"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STRIP_UNDERSCORE = exports.ORG_ROUTE_REF = exports.BODYPARSER_KEY = exports.SERVER_KEY = exports.CACHE_DIR = exports.CONTRACT_KEY = exports.SUPPORT_EXT = exports.FILE_NAME = exports.VELOCE_DEFAULT_URL = void 0;
// start your project here
const veloce_config_1 = require("./veloce-config");
exports.default = veloce_config_1.VeloceConfig; // breaking change 0.5.0
var constants_1 = require("./constants");
Object.defineProperty(exports, "VELOCE_DEFAULT_URL", { enumerable: true, get: function () { return constants_1.VELOCE_DEFAULT_URL; } });
Object.defineProperty(exports, "FILE_NAME", { enumerable: true, get: function () { return constants_1.FILE_NAME; } });
Object.defineProperty(exports, "SUPPORT_EXT", { enumerable: true, get: function () { return constants_1.SUPPORT_EXT; } });
Object.defineProperty(exports, "CONTRACT_KEY", { enumerable: true, get: function () { return constants_1.CONTRACT_KEY; } });
Object.defineProperty(exports, "CACHE_DIR", { enumerable: true, get: function () { return constants_1.CACHE_DIR; } });
Object.defineProperty(exports, "SERVER_KEY", { enumerable: true, get: function () { return constants_1.SERVER_KEY; } });
Object.defineProperty(exports, "BODYPARSER_KEY", { enumerable: true, get: function () { return constants_1.BODYPARSER_KEY; } });
Object.defineProperty(exports, "ORG_ROUTE_REF", { enumerable: true, get: function () { return constants_1.ORG_ROUTE_REF; } });
Object.defineProperty(exports, "STRIP_UNDERSCORE", { enumerable: true, get: function () { return constants_1.STRIP_UNDERSCORE; } });
