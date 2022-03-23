"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeBufferToFile = exports.returnUploadBuffer = void 0;
const tslib_1 = require("tslib");
// return the upload Data
const fs_1 = tslib_1.__importDefault(require("fs"));
// get the upload buffer from response
function returnUploadBuffer(res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolver) => {
            let data;
            res.onData((chunk, isLast) => {
                data = Buffer.concat([data, chunk]);
                if (isLast) {
                    return resolver(data);
                }
            });
        });
    });
}
exports.returnUploadBuffer = returnUploadBuffer;
// writing the ArrayBuffer to a file
function writeBufferToFile(buffer, path, permission = 0o666) {
    let fileDescriptor;
    try {
        fileDescriptor = fs_1.default.openSync(path, 'w', permission);
    }
    catch (e) {
        fs_1.default.chmodSync(path, permission);
        fileDescriptor = fs_1.default.openSync(path, 'w', permission);
    }
    if (fileDescriptor) {
        fs_1.default.writeSync(fileDescriptor, buffer, 0, buffer.length, 0);
        fs_1.default.closeSync(fileDescriptor);
    }
}
exports.writeBufferToFile = writeBufferToFile;
