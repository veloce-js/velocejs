"use strict";
// add a helper method to get the __dirname when using the mjs file
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDirname = void 0;
const node_path_1 = require("node:path");
const url_1 = require("url");
const getDirname = (import_meta_url) => ((0, node_path_1.dirname)((0, url_1.fileURLToPath)(import_meta_url)));
exports.getDirname = getDirname;
