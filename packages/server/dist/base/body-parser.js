"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyParser = exports.getHeaders = exports.parseQuery = void 0;
const tslib_1 = require("tslib");
// parse the input into easier to use format
const handle_upload_1 = require("./handle-upload");
const parse_multipart_data_1 = require("parse-multipart-data");
const constants_1 = require("../constants");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debugFn = (0, debug_1.default)('velocejs:server:body-parser');
// the actual function to take the query apart
function parseQuery(query) {
    const params = new URLSearchParams(query);
    const result = {};
    for (const pair of params.entries()) {
        result[pair[0]] = pair[1];
    }
    return result;
}
exports.parseQuery = parseQuery;
// return all the headers
function getHeaders(req) {
    const headers = {};
    req.forEach((key, value) => {
        headers[key.toLowerCase()] = value;
    });
    return headers;
}
exports.getHeaders = getHeaders;
// all-in-one to parse and post process the multipart-formdata input
function parseMultipart(headers, body) {
    const boundary = (0, parse_multipart_data_1.getBoundary)(headers[constants_1.CONTENT_TYPE]);
    if (boundary) {
        debugFn('boundary', boundary);
        const params = (0, parse_multipart_data_1.parse)(body, boundary);
        if (Array.isArray(params) && params.length) {
            return params.map(param => {
                if (param.name && param.data) {
                    return {
                        [param.name]: Buffer.from(param.data).toString()
                    };
                }
                return param; // this will be the field with the data
            })
                // repack it as key value pair
                .reduce((a, b) => Object.assign(a, b));
        }
    }
    return {};
}
// check if the header 'Content-Type' is a json
const isJson = (headers) => headers[constants_1.CONTENT_TYPE] !== undefined && headers[constants_1.CONTENT_TYPE].indexOf('json') > -1;
// check if it's regular post form
const isForm = (headers) => headers[constants_1.CONTENT_TYPE] !== undefined && headers[constants_1.CONTENT_TYPE] === constants_1.DEFAULT_POST_HEADER;
// check if it's a file upload form
const isFile = (headers) => headers[constants_1.CONTENT_TYPE] !== undefined && headers[constants_1.CONTENT_TYPE].indexOf(constants_1.FILE_POST_HEADER) > -1;
// parse inputs
async function bodyParser(res, req, onAborted) {
    // when accessing the req / res before calling the end, we need to explicitly attach the onAborted handler
    res.onAborted(() => {
        onAborted ? Reflect.apply(onAborted, null, [res]) : debugFn('ABORTED');
    });
    // process the header
    const headers = getHeaders(req);
    const url = req.getUrl();
    const query = req.getQuery();
    const method = req.getMethod();
    let params = {};
    if (method === 'get') {
        params = parseQuery(query);
    }
    // package it up
    const body = { url, method, query, headers, params };
    // we should only call this when the header is not GET?
    return new Promise(resolver => {
        (0, handle_upload_1.onDataHandler)(res, buffer => {
            body.payload = buffer;
            switch (true) {
                case isJson(headers):
                    body.params = JSON.parse(buffer.toString());
                    break;
                case isForm(headers):
                    body.params = parseQuery(buffer.toString());
                    break;
                case isFile(headers):
                    body.params = parseMultipart(headers, buffer);
                    break;
                default:
            }
            resolver(body);
        });
    });
}
exports.bodyParser = bodyParser;
