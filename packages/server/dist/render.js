"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRenderFn = exports.renderFile = void 0;
const fs_extra_1 = require("fs-extra");
const writers_1 = require("./writers");
const mime_1 = require("./lib/mime");
const constants_1 = require("./lib/constants");
/** taken out from server-static for re-use */
function renderFile(res) {
    const writer = (0, writers_1.getWriter)(res);
    /** url is the request url, file is the actual read content */
    return (url, file) => {
        const mimeType = (0, mime_1.lookupMimeType)(url);
        // if they didn't provide the read content then we read it
        if (!file) {
            file = (0, fs_extra_1.readFileSync)(url);
        }
        writer(file, { [constants_1.CONTENT_TYPE]: mimeType });
    };
}
exports.renderFile = renderFile;
/** we are going to have several different type
such as html markdown etc
*/
function getRenderFn(res) {
    const writer = (0, writers_1.getWriter)(res);
    return (type, content) => {
        const mimeType = (0, mime_1.lookupMimeType)(type);
        // here we make sure this is a string
        const output = Buffer.from(content).toString();
        writer(output, { [constants_1.CONTENT_TYPE]: mimeType });
    };
}
exports.getRenderFn = getRenderFn;
