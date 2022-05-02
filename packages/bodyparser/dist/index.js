"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoundary = exports.parseMultipart = exports.uploadHandler = exports.getHeaders = void 0;
// main export interface
const body_parser_1 = require("./body-parser");
// this way the default is bodyparser and if wanted we can named import the others
exports.default = body_parser_1.bodyParser;
var utils_1 = require("./utils");
Object.defineProperty(exports, "getHeaders", { enumerable: true, get: function () { return utils_1.getHeaders; } });
var handle_upload_1 = require("./handle-upload");
Object.defineProperty(exports, "uploadHandler", { enumerable: true, get: function () { return handle_upload_1.uploadHandler; } });
var parse_multipart_1 = require("./parse-multipart");
Object.defineProperty(exports, "parseMultipart", { enumerable: true, get: function () { return parse_multipart_1.parse; } });
Object.defineProperty(exports, "getBoundary", { enumerable: true, get: function () { return parse_multipart_1.getBoundary; } });
