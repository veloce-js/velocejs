"use strict";
// main export interface
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeaders = exports.bodyParser = void 0;
var body_parser_1 = require("./body-parser");
Object.defineProperty(exports, "bodyParser", { enumerable: true, get: function () { return body_parser_1.bodyParser; } });
var utils_1 = require("./utils");
Object.defineProperty(exports, "getHeaders", { enumerable: true, get: function () { return utils_1.getHeaders; } });
