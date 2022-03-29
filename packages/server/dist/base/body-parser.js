"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyParser = exports.parseQuery = void 0;
const tslib_1 = require("tslib");
const handle_upload_1 = require("./handle-upload");
// the actual function to take the query apart
function parseQuery(query) {
    const params = new URLSearchParams(query);
    const result = {};
    for (let pair of params.entries()) {
        result[pair[0]] = pair[1];
    }
    return result;
}
exports.parseQuery = parseQuery;
// parse inputs
function bodyParser(res, req, onAborted) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // when accessing the req / res before calling the end, we need to explicitly attach the onAborted handler
        res.onAborted(() => {
            onAborted ? Reflect.apply(onAborted, null, []) : console.info('ABORTED');
        }); // try to see if we overload this and what will happen
        const headers = {};
        req.forEach((key, value) => {
            headers[key] = value;
        });
        const url = req.getUrl();
        const query = req.getQuery();
        const method = req.getMethod();
        const params = parseQuery(query);
        // package it up
        const body = { url, method, query, headers, params };
        // we should only call this when the header is not GET?
        return new Promise(resolver => {
            (0, handle_upload_1.onDataHandler)(res, buffer => {
                body.payload = buffer;
                resolver(body);
            });
        });
    });
}
exports.bodyParser = bodyParser;
