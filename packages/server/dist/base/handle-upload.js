"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeBufferToFile = exports.onDataHandler = exports.uploadHandler = exports.handleUpload = void 0;
const tslib_1 = require("tslib");
// return the upload Data
const fs_1 = tslib_1.__importDefault(require("fs"));
// @TODO this should be a higher level method that will take the
// req mime-type handle the buffer then write to disk
function handleUpload(res, req, dir, filename) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(res, req, dir, filename);
    });
}
exports.handleUpload = handleUpload;
// get the upload buffer from response
// WE CAN NOT do this with async because all the handler must get call
// when isLast is true
function uploadHandler(res, bufferHandler, onAbortedHandler) {
    onDataHandler(res, bufferHandler);
    // if we don't attach an onAborted handler then we get complain
    res.onAborted(() => {
        onAbortedHandler && onAbortedHandler();
    });
}
exports.uploadHandler = uploadHandler;
// we take the onData callback further for re-use in the body parser method
function onDataHandler(res, bufferHandler) {
    let data;
    res.onData((chunk, isLast) => {
        /*
        if (chunk.byteLength === 0 && isLast) { // nothing
          bufferHandler(null)
        }
        */
        let _chunk = Buffer.from(chunk);
        data = data ? Buffer.concat([data, _chunk]) : Buffer.concat([_chunk]);
        if (isLast) {
            bufferHandler(data);
        }
    });
}
exports.onDataHandler = onDataHandler;
// writing the Buffer to a file
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
        return true;
    }
    return false;
}
exports.writeBufferToFile = writeBufferToFile;
