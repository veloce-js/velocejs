"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeJson = void 0;
// just write the header and encode the JSON to string
const writeJson = (res, jsonObj) => {
    res.writeHeader('Content-type', 'application/json');
    // @TODO should we add the Content-length header
    res.end(JSON.stringify(jsonObj));
};
exports.writeJson = writeJson;
