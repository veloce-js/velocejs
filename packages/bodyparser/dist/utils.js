"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQuery = exports.isFile = exports.isForm = exports.isJson = exports.isEmptyObj = exports.takeApartName = exports.toBuffer = exports.toArr = exports.getHeaders = void 0;
const constants_1 = require("./constants");
// return all the headers
function getHeaders(req) {
    const headers = {};
    req.forEach((key, value) => {
        headers[key.toLowerCase()] = value;
    });
    return headers;
}
exports.getHeaders = getHeaders;
// wrapper method
function toArr(value) {
    return Array.isArray(value) ? value : [value];
}
exports.toArr = toArr;
function toBuffer(data) {
    return Buffer.isBuffer(data) ? data : Buffer.from(data);
}
exports.toBuffer = toBuffer;
// see if its array like name such as data[]
// we just discard whatever is inside, because its pointless to have this stupid name
function takeApartName(name) {
    return (name.indexOf('[') > -1) ? [name.split('[')[0], true]
        : [name, false]; // return a tuple
}
exports.takeApartName = takeApartName;
// check if the object is empty for the init run
const isEmptyObj = (obj) => (obj && Object.keys(obj).length === 0 && obj.constructor === Object);
exports.isEmptyObj = isEmptyObj;
// check if the header 'Content-Type' is a json like 
const isJson = (headers) => (headers[constants_1.CONTENT_TYPE] !== undefined && headers[constants_1.CONTENT_TYPE].indexOf('json') > -1);
exports.isJson = isJson;
// check if it's regular post form
const isForm = (headers) => (headers[constants_1.CONTENT_TYPE] !== undefined && headers[constants_1.CONTENT_TYPE].indexOf(constants_1.DEFAULT_FORM_HEADER) > -1);
exports.isForm = isForm;
// check if it's a file upload form
const isFile = (headers) => (headers[constants_1.CONTENT_TYPE] !== undefined &&
    headers[constants_1.CONTENT_TYPE].indexOf(constants_1.FILE_POST_HEADER) > -1
// headers[CONTENT_TYPE].indexOf(BOUNDARY) > -1
);
exports.isFile = isFile;
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
