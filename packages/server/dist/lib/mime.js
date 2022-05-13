"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentType = exports.lookup = void 0;
const tslib_1 = require("tslib");
const mime_types_1 = tslib_1.__importDefault(require("mime-types"));
const constants_1 = require("./constants");
/** wrapper around the mime-types lookup provide a default value */
const lookup = (url) => (mime_types_1.default.lookup(url) || constants_1.DEFAULT_FILE_TYPE);
exports.lookup = lookup;
/** thin wrapper around the mime-type module, provide a default value */
const getContentType = (content) => (mime_types_1.default.contentType(content) || constants_1.DEFAULT_MIME_TYPE);
exports.getContentType = getContentType;
