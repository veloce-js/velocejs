"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeBufferToFile = exports.write404 = exports.getWriter = exports.jsonWriter = void 0;
const tslib_1 = require("tslib");
// from write-json and change the interface to be the same
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const constants_1 = require("./base/constants");
const status_1 = require("./base/status");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debugFn = (0, debug_1.default)('velocejs:server:writers');
// just write the header and encode the JSON to string
const jsonWriter = (res) => {
    const writer = (0, exports.getWriter)(res);
    return (jsonObj, status) => {
        writer(JSON.stringify(jsonObj), { [constants_1.CONTENT_TYPE]: constants_1.JSON_HEADER }, 
        // @ts-ignore another non-sense
        status);
    };
};
exports.jsonWriter = jsonWriter;
// break this out for re-use
const getWriter = (res) => {
    return (payload, headers, status) => {
        // this could create a bug - if they pass the wrong status code
        // then we fill it with 200 OK by default because it's hard to check
        const _status = status ? (0, status_1.lookupStatus)(status) : status_1.C200;
        debugFn(`status: ${_status}`);
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
exports.getWriter = getWriter;
const write404 = (res) => {
    res.cork(() => {
        res.writeStatus(status_1.C404).end();
    });
};
exports.write404 = write404;
// writing the Buffer to a file
function writeBufferToFile(buffer, path, permission = 0o666) {
    let fileDescriptor;
    try {
        fileDescriptor = fs_extra_1.default.openSync(path, 'w', permission);
    }
    catch (e) {
        fs_extra_1.default.chmodSync(path, permission);
        fileDescriptor = fs_extra_1.default.openSync(path, 'w', permission);
    }
    if (fileDescriptor) {
        fs_extra_1.default.writeSync(fileDescriptor, buffer, 0, buffer.length, 0);
        fs_extra_1.default.closeSync(fileDescriptor);
        return true;
    }
    return false;
}
exports.writeBufferToFile = writeBufferToFile;
