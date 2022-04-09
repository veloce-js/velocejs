"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCorkWriter = exports.writeJson = void 0;
const tslib_1 = require("tslib");
const constants_1 = require("../constants");
const status_1 = require("../status");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debugFn = (0, debug_1.default)('velocejs:server:write-json');
// just write the header and encode the JSON to string
const writeJson = (res, jsonObj) => {
    const writer = (0, exports.getCorkWriter)(res);
    writer(JSON.stringify(jsonObj), {
        [constants_1.CONTENT_TYPE]: constants_1.JSON_HEADER
    });
};
exports.writeJson = writeJson;
// break this out for re-use
const getCorkWriter = (res) => {
    return (payload, headers, status) => {
        // this could create a bug - if they pass the wrong status code
        // then we fill it with 200 OK by default, it's hard to check
        const _status = status ? (0, status_1.lookupStatus)(status) : status_1.C200;
        debugFn(`status: ${status}`);
        res.cork(() => {
            res.writeStatus(_status);
            if (headers) {
                for (const key in headers) {
                    res.writeHeader(key, headers[key]);
                }
            }
            res.end(payload);
        });
    };
};
exports.getCorkWriter = getCorkWriter;
