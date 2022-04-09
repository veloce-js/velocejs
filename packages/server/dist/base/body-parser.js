"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyParser = exports.processParams = exports.parseMultipart = exports.getHeaders = exports.parseQuery = void 0;
const tslib_1 = require("tslib");
// parse the input into easier to use format
const handle_upload_1 = require("./handle-upload");
const parse_multipart_data_1 = require("../parse-multipart-data");
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
        const params = (0, parse_multipart_data_1.parse)(body, boundary);
        if (Array.isArray(params) && params.length) {
            return processParams(params);
        }
    }
    return {};
}
exports.parseMultipart = parseMultipart;
// export this for unit test
function processParams(params) {
    return Object.assign(processFileArray(params), processTextArray(params));
}
exports.processParams = processParams;
// wrapper method
function toArr(value) {
    return Array.isArray(value) ? value : [value];
}
// see if its array like name such as data[]
// we just discard whatever is inside, because its pointless to have this stupid name
function takeApartName(name) {
    return (name.indexOf('[') > -1) ? [name.split('[')[0], true]
        : [name, false]; // return a tuple
}
// break it out from above for clearity
function processFileArray(params) {
    return params.filter(param => param.filename && param.type)
        .map(param => {
        const { name, type, filename, data } = param;
        const [strName, arr] = takeApartName(name);
        const content = { type, filename, data };
        const value = arr ? [content] : content;
        return { name: strName, value };
    })
        // from https://stackoverflow.com/questions/57379778/typescript-type-for-reduce
        .reduce((a, b) => {
        switch (true) {
            case (isEmptyObj(a)):
                return { [b.name]: b.value }; // init
            case (a[b.name] !== undefined):
                // console.log('concat here')
                return Object.assign(a, {
                    [b.name]: toArr(a[b.name]).concat(toArr(b.value))
                });
            default:
                return Object.assign(a, { [b.name]: b.value });
        }
    }, {});
}
function toBuffer(data) {
    return Buffer.isBuffer(data) ? data : Buffer.from(data);
}
// when the result is simple text then we parse it to string not buffer
function processTextArray(params) {
    return params
        .filter(param => !param.filename && !param.type)
        .map(param => (
    // @TODO how to use the type info to return as number or other data type
    { [param.name]: toBuffer(param.data).toString() }))
        .reduce((a, b) => Object.assign(a, b), {});
}
// check if the object is empty for the init run
const isEmptyObj = (obj) => (obj && Object.keys(obj).length === 0 && obj.constructor === Object);
// check if the header 'Content-Type' is a json
const isJson = (headers) => (headers[constants_1.CONTENT_TYPE] !== undefined && headers[constants_1.CONTENT_TYPE].indexOf('json') > -1);
// check if it's regular post form
const isForm = (headers) => (headers[constants_1.CONTENT_TYPE] !== undefined && headers[constants_1.CONTENT_TYPE] === constants_1.DEFAULT_POST_HEADER);
// check if it's a file upload form
const isFile = (headers) => (headers[constants_1.CONTENT_TYPE] !== undefined &&
    headers[constants_1.CONTENT_TYPE].indexOf(constants_1.FILE_POST_HEADER) > -1
// headers[CONTENT_TYPE].indexOf(BOUNDARY) > -1
);
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
                    body.type = constants_1.IS_JSON;
                    body.params = JSON.parse(buffer.toString());
                    break;
                case isForm(headers):
                    body.type = constants_1.IS_FORM;
                    body.params = parseQuery(buffer.toString());
                    break;
                case isFile(headers):
                    body.type = constants_1.IS_MULTI;
                    body.params = parseMultipart(headers, buffer);
                    break;
                default:
                    body.type = constants_1.IS_OTHER;
            }
            resolver(body);
        });
    });
}
exports.bodyParser = bodyParser;
