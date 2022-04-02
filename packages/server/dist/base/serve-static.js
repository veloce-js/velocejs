"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveStatic = void 0;
const tslib_1 = require("tslib");
// server static methods
const mime_types_1 = tslib_1.__importDefault(require("mime-types"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const constants_1 = require("./constants");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debugFn = (0, debug_1.default)('velocejs:server:serve-static');
/**
 * serve static files from assetDir
 */
function serveStatic(assetDir) {
    const dirs = Array.isArray(assetDir) ? assetDir : [assetDir];
    return function (res, req) {
        // we need to provide a onAbortedHandler here
        res.onAborted(() => {
            debugFn(`Serve static aborted`);
        });
        let url = req.getUrl();
        // @TODO how to configure a default file to serve up
        if (url === '/') {
            url = constants_1.DEFAULT_FILE;
        }
        debugFn(url);
        const file = dirs
            .filter(dir => fs_1.default.existsSync(path_1.default.join(dir, url)))
            .map(dir => fs_1.default.readFileSync(path_1.default.join(dir, url)));
        if (file.length) {
            const mimeType = mime_types_1.default.lookup(url) || 'application/octet-stream';
            // console.log(mimeType, url)
            res.writeHeader('Content-Type', mimeType);
            // first come first serve
            res.end(file[0]);
        }
        else {
            // @TODO
            res.writeStatus('404');
            res.end();
        }
    };
}
exports.serveStatic = serveStatic;
