"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipeStreamOverResponse = exports.onAbortedOrFinishedResponse = exports.toArrayBuffer = exports.getFileSize = exports.arrayBufferToString = void 0;
const tslib_1 = require("tslib");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
/** this is from that stupid module arraybuffer-to-string really? */
function arrayBufferToString(buffer, encoding = 'utf8') {
    return Buffer.from(buffer).toString(encoding);
}
exports.arrayBufferToString = arrayBufferToString;
/** get the file size */
function getFileSize(fileName) {
    return node_fs_1.default.statSync(fileName).size;
}
exports.getFileSize = getFileSize;
/* Helper function converting Node.js buffer to ArrayBuffer */
function toArrayBuffer(buffer) {
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}
exports.toArrayBuffer = toArrayBuffer;
/* Either onAborted or simply finished request */
function onAbortedOrFinishedResponse(res, readStream // should this  be a buffer? stream.Readable but no such type?
) {
    if (res.id == -1) {
        console.log("ERROR! onAbortedOrFinishedResponse called twice for the same res!");
    }
    else {
        // console.log('Stream was closed, openStreams: ' + --openStreams);
        console.timeEnd(res.id);
        readStream.destroy();
    }
    /* Mark this response already accounted for */
    res.id = -1;
}
exports.onAbortedOrFinishedResponse = onAbortedOrFinishedResponse;
/* Helper function to pipe the ReadaleStream over an Http responses */
function pipeStreamOverResponse(res, readStream, totalSize) {
    /* Careful! If Node.js would emit error before the first res.tryEnd, res will hang and never time out */
    /* For this demo, I skipped checking for Node.js errors, you are free to PR fixes to this example */
    readStream.on('data', (chunk) => {
        /* We only take standard V8 units of data */
        const ab = toArrayBuffer(chunk);
        /* Store where we are, globally, in our response */
        const lastOffset = res.getWriteOffset();
        /* Streaming a chunk returns whether that chunk was sent, and if that chunk was last */
        const [ok, done] = res.tryEnd(ab, totalSize);
        /* Did we successfully send last chunk? */
        if (done) {
            onAbortedOrFinishedResponse(res, readStream);
        }
        else if (!ok) {
            /* If we could not send this chunk, pause */
            readStream.pause();
            /* Save unsent chunk for when we can send it */
            res.ab = ab;
            res.abOffset = lastOffset;
            /* Register async handlers for drainage */
            res.onWritable((offset) => {
                /* Here the timeout is off, we can spend as much time before calling tryEnd we want to */
                /* On failure the timeout will start */
                const [ok, done] = res.tryEnd(res.ab.slice(offset - res.abOffset), totalSize);
                if (done) {
                    onAbortedOrFinishedResponse(res, readStream);
                }
                else if (ok) {
                    /* We sent a chunk and it was not the last one, so let's resume reading.
                     * Timeout is still disabled, so we can spend any amount of time waiting
                     * for more chunks to send. */
                    readStream.resume();
                }
                /* We always have to return true/false in onWritable.
                 * If you did not send anything, return true for success. */
                return ok;
            });
        }
    }).on('error', () => {
        /* Todo: handle errors of the stream, probably good to simply close the response */
        console.log('Unhandled read error from Node.js, you need to handle this!');
    });
    /* If you plan to asyncronously respond later on, you MUST listen to onAborted BEFORE returning */
    res.onAborted(() => {
        onAbortedOrFinishedResponse(res, readStream);
    });
}
exports.pipeStreamOverResponse = pipeStreamOverResponse;
