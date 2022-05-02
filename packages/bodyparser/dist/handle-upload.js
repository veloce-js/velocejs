"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDataHandler = exports.uploadHandler = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debugFn = (0, debug_1.default)('velocejs:server:body-parser:handle-upload');
// get the upload buffer from response
// WE CAN NOT do this with async because all the handler must get call
// when isLast is true
function uploadHandler(res, bufferHandler, onAbortedHandler) {
    onDataHandler(res, bufferHandler);
    // if we don't attach an onAborted handler then we get complain
    res.onAborted(() => {
        onAbortedHandler ? onAbortedHandler() : debugFn('uploadHandler onAborted');
    });
}
exports.uploadHandler = uploadHandler;
// we take the onData callback further for re-use in the body parser method
function onDataHandler(res, bufferHandler) {
    let data;
    res.onData((chunk, isLast) => {
        const _chunk = Buffer.from(chunk);
        data = data ? Buffer.concat([data, _chunk]) : Buffer.concat([_chunk]);
        if (isLast) {
            bufferHandler(data);
        }
    });
}
exports.onDataHandler = onDataHandler;
