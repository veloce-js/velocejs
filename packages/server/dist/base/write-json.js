"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCorkWriter = exports.writeJson = void 0;
const constants_1 = require("../constants");
const status_1 = require("../status");
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
    return (payload, headers) => {
        res.cork(() => {
            res.writeStatus(status_1.C200);
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
