"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveStatic = void 0;
const tslib_1 = require("tslib");
// server static methods
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
const constants_1 = require("./lib/constants");
const writers_1 = require("./writers");
const mime_1 = require("./lib/mime");
const utils_1 = require("@jsonql/utils");
// import { toArray } from '@jsonql/utils'
// import { toArr } from '@velocejs/bodyparser/utils'
const debug_1 = tslib_1.__importDefault(require("debug"));
const debugFn = (0, debug_1.default)('velocejs:server:serve-static');
/** serve static files from assetDir */
function serveStatic(assetDir, onAbortedHandler) {
    const dirs = (0, utils_1.toArray)(assetDir);
    // return handler 
    return function (res, req) {
        // we need to provide a onAbortedHandler here
        res.onAborted(() => {
            if (onAbortedHandler && (0, utils_1.isFunction)(onAbortedHandler)) {
                onAbortedHandler(); // @TODO should we pass the res ?
            }
            else {
                debugFn(`Serve static aborted`);
            }
        });
        let url = req.getUrl();
        if (url === '/') {
            url = constants_1.DEFAULT_FILE; // @TODO should we allow change this
        }
        debugFn(url);
        const file = dirs
            .filter((dir) => node_fs_1.default.existsSync(node_path_1.default.join(dir, url)))
            .map((dir) => node_fs_1.default.readFileSync(node_path_1.default.join(dir, url)));
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
