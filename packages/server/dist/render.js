"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRenderer = exports.fileRender = void 0;
const writers_1 = require("./writers");
const mime_1 = require("./lib/mime");
const constants_1 = require("./lib/constants");
/** taken out from server-static for re-use */
function fileRender(res) {
    const writer = (0, writers_1.getWriter)(res);
    /** url is the request url, file is the actual read content */
    return (url, file) => {
        const mimeType = (0, mime_1.lookupMimeType)(url);
        writer(file, { [constants_1.CONTENT_TYPE]: mimeType });
    };
}
exports.fileRender = fileRender;
/** we are going to have several different type
such as html markdown etc
*/
function getRenderer(res) {
    const writer = (0, writers_1.getWriter)(res);
    return (type, content) => {
        const mimeType = (0, mime_1.lookupMimeType)(type);
        // here we make sure this is a string
        const output = Buffer.from(content).toString();
        writer(output, { [constants_1.CONTENT_TYPE]: mimeType });
    };
}
exports.getRenderer = getRenderer;
