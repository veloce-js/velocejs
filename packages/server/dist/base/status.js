"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C500 = exports.C451 = exports.C431 = exports.C429 = exports.C428 = exports.C426 = exports.C425 = exports.C424 = exports.C423 = exports.C422 = exports.C421 = exports.C418 = exports.C417 = exports.C416 = exports.C415 = exports.C414 = exports.C413 = exports.C412 = exports.C411 = exports.C410 = exports.C409 = exports.C408 = exports.C407 = exports.C406 = exports.C405 = exports.C404 = exports.C403 = exports.C402 = exports.C401 = exports.C400 = exports.C308 = exports.C307 = exports.C304 = exports.C303 = exports.C302 = exports.C301 = exports.C300 = exports.C226 = exports.C208 = exports.C207 = exports.C206 = exports.C205 = exports.C204 = exports.C203 = exports.C201 = exports.C200 = exports.C103 = exports.C102 = exports.C101 = exports.C100 = void 0;
exports.lookupStatus = exports.C511 = exports.C510 = exports.C508 = exports.C507 = exports.C506 = exports.C505 = exports.C504 = exports.C503 = exports.C502 = exports.C501 = void 0;
// all the status related code here
// ----------------------- HTTP RESPONSE STATUS ------------------ //
// FROM: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
// successful
exports.C100 = '100 Continue';
exports.C101 = '101 Switching Protocols';
exports.C102 = '102 Processing';
exports.C103 = '103 Early Hints';
exports.C200 = '200 OK';
exports.C201 = '201 Created';
exports.C203 = '203 Non-Authoritative Information';
exports.C204 = '204 No Content';
exports.C205 = '205 Reset Content';
exports.C206 = '206 Partial Content';
exports.C207 = '207 Multi-Status';
exports.C208 = '208 Already Reported';
exports.C226 = '226 IM Used';
// redirect message
exports.C300 = '300 Multiple Choice';
exports.C301 = '301 Moved Permanently';
exports.C302 = '302 Found';
exports.C303 = '303 See Other';
exports.C304 = '304 Not Modified';
exports.C307 = '307 Temporary Redirect';
exports.C308 = '308 Permanent Redirect';
// client error
exports.C400 = '400 Bad Request';
exports.C401 = '401 Unauthorized';
exports.C402 = '402 Payment Required';
exports.C403 = '403 Forbidden';
exports.C404 = '404 Not Found';
exports.C405 = '405 Method Not Allowed';
exports.C406 = '406 Not Acceptable';
exports.C407 = '407 Proxy Authentication Required';
exports.C408 = '408 Request Timeout';
exports.C409 = '409 Conflict';
exports.C410 = '410 Gone';
exports.C411 = '411 Length Required';
exports.C412 = '412 Precondition Failed';
exports.C413 = '413 Payload Too Large';
exports.C414 = '414 URI Too Long';
exports.C415 = '415 Unsupported Media Type';
exports.C416 = '416 Range Not Satisfiable';
exports.C417 = '417 Expectation Failed';
exports.C418 = '418 I\'m a teapot';
exports.C421 = '421 Misdirected Request';
exports.C422 = '422 Unprocessable Entity';
exports.C423 = '423 Locked';
exports.C424 = '424 Failed Dependency';
exports.C425 = '425 Too Early';
exports.C426 = '426 Upgrade Required';
exports.C428 = '428 Precondition Required';
exports.C429 = '429 Too Many Requests';
exports.C431 = '431 Request Header Fields Too Large';
exports.C451 = '451 Unavailable For Legal Reasons';
// server error
exports.C500 = '500 Internal Server Error';
exports.C501 = '501 Not Implemented';
exports.C502 = '502 Bad Gateway';
exports.C503 = '503 Service Unavailable';
exports.C504 = '504 Gateway Timeout';
exports.C505 = '505 HTTP Version Not Supported';
exports.C506 = '506 Variant Also Negotiates';
exports.C507 = '507 Insufficient Storage';
exports.C508 = '508 Loop Detected';
exports.C510 = '510 Not Extended';
exports.C511 = '511 Network Authentication Required';
// internal use only 
const STATUS_MAP = {
    C100: exports.C100,
    C101: exports.C101,
    C102: exports.C102,
    C103: exports.C103,
    C200: exports.C200,
    C201: exports.C201,
    C203: exports.C203,
    C204: exports.C204,
    C205: exports.C205,
    C206: exports.C206,
    C207: exports.C207,
    C208: exports.C208,
    C226: exports.C226,
    // redirect message
    C300: exports.C300,
    C301: exports.C301,
    C302: exports.C302,
    C303: exports.C303,
    C304: exports.C304,
    C307: exports.C307,
    C308: exports.C308,
    // client error
    C400: exports.C400,
    C401: exports.C401,
    C402: exports.C402,
    C403: exports.C403,
    C404: exports.C404,
    C405: exports.C405,
    C406: exports.C406,
    C407: exports.C407,
    C408: exports.C408,
    C409: exports.C409,
    C410: exports.C410,
    C411: exports.C411,
    C412: exports.C412,
    C413: exports.C413,
    C414: exports.C414,
    C415: exports.C415,
    C416: exports.C416,
    C417: exports.C417,
    C418: exports.C418,
    C421: exports.C421,
    C422: exports.C422,
    C423: exports.C423,
    C424: exports.C424,
    C425: exports.C425,
    C426: exports.C426,
    C428: exports.C428,
    C429: exports.C429,
    C431: exports.C431,
    C451: exports.C451,
    // server error
    C500: exports.C500,
    C501: exports.C501,
    C502: exports.C502,
    C503: exports.C503,
    C504: exports.C504,
    C505: exports.C505,
    C506: exports.C506,
    C507: exports.C507,
    C508: exports.C508,
    C510: exports.C510,
    C511: exports.C511,
};
// look up the code by the number
function lookupStatus(status) {
    const key = `C${status}`;
    return STATUS_MAP[key];
}
exports.lookupStatus = lookupStatus;
