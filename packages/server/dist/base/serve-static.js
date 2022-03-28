"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveStatic = void 0;
const tslib_1 = require("tslib");
// server static methods
const mime_types_1 = tslib_1.__importDefault(require("mime-types"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
/**
 * serve static files from assetDir
 */
function serveStatic(assetDir) {
    return function (res, req) {
        const url = req.getUrl();
        const file = fs_1.default.readFileSync(path_1.default.join(assetDir, url));
        if (file) {
            const mimeType = mime_types_1.default.lookup(url) || 'application/octet-stream';
            // console.log(mimeType, url)
            res.writeHeader('Content-Type', mimeType);
            res.end(file);
        }
        else {
            // @TODO
            res.writeStatus('404');
        }
    };
}
exports.serveStatic = serveStatic;
