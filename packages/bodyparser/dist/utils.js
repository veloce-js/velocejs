"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDynamicRoute = exports.isFile = exports.isMultipart = exports.isForm = exports.isJson = exports.isEmptyObj = exports.takeApartName = exports.toBuffer = exports.toArr = exports.getHeaders = exports.applyConfig = void 0;
const constants_1 = require("./constants");
/** provide default to options */
function applyConfig(config) {
    return Object.assign(constants_1.DEFAULT_CONFIG, config || {});
}
exports.applyConfig = applyConfig;
/** return all the headers with lowercase key */
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
/** unknown to buffer */
function toBuffer(data) {
    return Buffer.isBuffer(data) ? data : Buffer.from(data);
}
exports.toBuffer = toBuffer;
/* see if its array like name such as data[]
  we just discard whatever is inside, because its pointless to have this stupid name */
function takeApartName(name) {
    return (name.indexOf('[') > -1)
        ? [name.split('[')[0], true]
        : [name, false]; // return a tuple
}
exports.takeApartName = takeApartName;
/* check if the object is empty for the init run */
const isEmptyObj = (obj) => (obj && Object.keys(obj).length === 0 && obj.constructor === Object);
exports.isEmptyObj = isEmptyObj;
/** check if the header 'Content-Type' is a json like */
const isJson = (headers) => (headers[constants_1.CONTENT_TYPE] !== undefined && headers[constants_1.CONTENT_TYPE].indexOf(constants_1.IS_JSON) > -1);
exports.isJson = isJson;
// check if it's regular post form
const isForm = (headers) => (headers[constants_1.CONTENT_TYPE] !== undefined && headers[constants_1.CONTENT_TYPE].indexOf(constants_1.DEFAULT_FORM_HEADER) > -1);
exports.isForm = isForm;
// change from isFile to isMultipart - isFile expect pure binary format
const isMultipart = (headers) => (headers[constants_1.CONTENT_TYPE] !== undefined &&
    headers[constants_1.CONTENT_TYPE].indexOf(constants_1.FILE_POST_HEADER) > -1
// headers[CONTENT_TYPE].indexOf(BOUNDARY) > -1
);
exports.isMultipart = isMultipart;
/** check for one the binary format header */
const isFile = (headers) => {
    throw new Error(`Not implment yet`, headers);
};
exports.isFile = isFile;
/** just check if the url looks like a dynamic route */
const isDynamicRoute = (route) => route.indexOf(constants_1.DYNAMIC_ROUTE_PATTERN) > -1;
exports.isDynamicRoute = isDynamicRoute;
