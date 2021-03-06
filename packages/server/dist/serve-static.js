"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveStatic = void 0;
const tslib_1 = require("tslib");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
const constants_1 = require("./lib/constants");
const writers_1 = require("./writers");
const render_1 = require("./render");
const utils_1 = require("@jsonql/utils");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debugFn = (0, debug_1.default)('velocejs:server:serve-static');
// @TODO investigate the compression
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
            (0, render_1.renderFile)(res)(url, file[0]);
        }
        else {
            (0, writers_1.write404)(res);
        }
    };
}
exports.serveStatic = serveStatic;
