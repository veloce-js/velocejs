"use strict";
// server static methods
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveStatic = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const constants_1 = require("./base/constants");
const writers_1 = require("./writers");
const mime_1 = require("./base/mime");
const src_1 = require("@jsonql/utils/src");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debugFn = (0, debug_1.default)('velocejs:server:serve-static');
/**
 * serve static files from assetDir
 */
function serveStatic(assetDir) {
    const dirs = (0, src_1.toArray)(assetDir);
    return function (res, req) {
        // we need to provide a onAbortedHandler here
        res.onAborted(() => {
            debugFn(`Serve static aborted`);
        });
        let url = req.getUrl();
        if (url === '/') {
            url = constants_1.DEFAULT_FILE;
        }
        debugFn(url);
        const file = dirs
            .filter((dir) => fs_1.default.existsSync(path_1.default.join(dir, url)))
            .map((dir) => fs_1.default.readFileSync(path_1.default.join(dir, url)));
        if (file.length) {
            const mimeType = (0, mime_1.lookup)(url);
            const writer = (0, writers_1.getWriter)(res);
            writer(file[0], { [constants_1.CONTENT_TYPE]: mimeType });
        }
        else {
            (0, writers_1.write404)(res);
        }
    };
}
exports.serveStatic = serveStatic;
