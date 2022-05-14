import { AppOptions, TemplatedApp } from './dist/types';
import uWS from 'uWebSockets.js';

declare module "@velocejs/server" {

export declare function createApp(opt?: AppOptions): TemplatedApp;
export declare function shutdownServer(listenSocket: any): void;
export declare function getPort(token: any): number;

export default uWS;
export * from './create-app';
export * from './read-json-async';
export { serveStatic } from './serve-static';
export { lookupMimeType, getContentType } from './lib/mime';
export * from './writers';
export { UwsServer } from './uws-server-class';
export * from './lib/status';
export * from './lib/constants';
export declare const SUPPORT_REST_ROUTES: string[];
export declare const STATIC_TYPE = "static";
export declare const STATIC_ROUTE = "get";
export declare const DEFAULT_FILE = "index.html";
export declare const RAW_TYPE = "raw";
export declare const CONTENT_TYPE = "content-type";
export declare const DEFAULT_FORM_HEADER = "application/x-www-form-urlencoded";
export declare const FILE_POST_HEADER = "multipart/form-data";
export declare const JSON_HEADER = "application/json";
export declare const DEFAULT_MIME_TYPE = "text/html; charset=utf-8";
export declare const DEFAULT_FILE_TYPE = "application/octet-stream";
export declare const BOUNDARY = "boundary";
export declare const IS_FORM = "form";
export declare const IS_MULTI = "multipart";
export declare const IS_JSON = "json";
export declare const IS_OTHER = "other";
export declare const BACK_PRESSURE = 1024;
export declare const MAX_PAYLOAD_LENGTH: number;
export declare const SHARED_COMPRESSOR: number;
/// <reference types="node" />
import { HttpResponse } from '../types';
/** this is from that stupid module arraybuffer-to-string really? */
export declare function arrayBufferToString(buffer: ArrayBuffer, encoding?: string): string;
/** get the file size */
export declare function getFileSize(fileName: string): number;
export declare function toArrayBuffer(buffer: Buffer): ArrayBuffer;
export declare function onAbortedOrFinishedResponse(res: HttpResponse, readStream: any): void;
export declare function pipeStreamOverResponse(res: HttpResponse, readStream: any, totalSize: number): void;
import { HttpResponse, HttpRequest } from 'uWebSockets.js';
import { UwsRespondBody } from './types';
export declare type UwsRouteHandler = (res: HttpResponse, req: HttpRequest) => void;
export interface UwsRouteSetup {
    type: string;
    path: string;
    handler: UwsRouteHandler;
}
export interface UwsParsedResult extends UwsRespondBody {
    res: HttpResponse;
    req: HttpRequest;
}
/** wrapper around the mime-types lookup provide a default value */
export declare const lookupMimeType: (url: string) => string;
/** thin wrapper around the mime-type module, provide a default value */
export declare const getContentType: (content: string) => string;
export declare const C100 = "100 Continue";
export declare const C101 = "101 Switching Protocols";
export declare const C102 = "102 Processing";
export declare const C103 = "103 Early Hints";
export declare const C200 = "200 OK";
export declare const C201 = "201 Created";
export declare const C203 = "203 Non-Authoritative Information";
export declare const C204 = "204 No Content";
export declare const C205 = "205 Reset Content";
export declare const C206 = "206 Partial Content";
export declare const C207 = "207 Multi-Status";
export declare const C208 = "208 Already Reported";
export declare const C226 = "226 IM Used";
export declare const C300 = "300 Multiple Choice";
export declare const C301 = "301 Moved Permanently";
export declare const C302 = "302 Found";
export declare const C303 = "303 See Other";
export declare const C304 = "304 Not Modified";
export declare const C307 = "307 Temporary Redirect";
export declare const C308 = "308 Permanent Redirect";
export declare const C400 = "400 Bad Request";
export declare const C401 = "401 Unauthorized";
export declare const C402 = "402 Payment Required";
export declare const C403 = "403 Forbidden";
export declare const C404 = "404 Not Found";
export declare const C405 = "405 Method Not Allowed";
export declare const C406 = "406 Not Acceptable";
export declare const C407 = "407 Proxy Authentication Required";
export declare const C408 = "408 Request Timeout";
export declare const C409 = "409 Conflict";
export declare const C410 = "410 Gone";
export declare const C411 = "411 Length Required";
export declare const C412 = "412 Precondition Failed";
export declare const C413 = "413 Payload Too Large";
export declare const C414 = "414 URI Too Long";
export declare const C415 = "415 Unsupported Media Type";
export declare const C416 = "416 Range Not Satisfiable";
export declare const C417 = "417 Expectation Failed";
export declare const C418 = "418 I'm a teapot";
export declare const C421 = "421 Misdirected Request";
export declare const C422 = "422 Unprocessable Entity";
export declare const C423 = "423 Locked";
export declare const C424 = "424 Failed Dependency";
export declare const C425 = "425 Too Early";
export declare const C426 = "426 Upgrade Required";
export declare const C428 = "428 Precondition Required";
export declare const C429 = "429 Too Many Requests";
export declare const C431 = "431 Request Header Fields Too Large";
export declare const C451 = "451 Unavailable For Legal Reasons";
export declare const C500 = "500 Internal Server Error";
export declare const C501 = "501 Not Implemented";
export declare const C502 = "502 Bad Gateway";
export declare const C503 = "503 Service Unavailable";
export declare const C504 = "504 Gateway Timeout";
export declare const C505 = "505 HTTP Version Not Supported";
export declare const C506 = "506 Variant Also Negotiates";
export declare const C507 = "507 Insufficient Storage";
export declare const C508 = "508 Loop Detected";
export declare const C510 = "510 Not Extended";
export declare const C511 = "511 Network Authentication Required";
/** look up the code by the number or by the key string */
export declare function lookupStatus(status: number | string): string;
// take the type out to avoid a circular reference
// just to type the damn thing to stop the warning
// string to string object with unknown properties
export type UwsStringPairObj = {
  [key: string]: string
}
// Typing the result object
export type UwsRespondBody = {
  url: string
  method: string
  query: string,
  headers: UwsStringPairObj
  params: object,
  type?: string,
  payload?: Buffer
}
// this is the key values from the bodyParser
export type UwsBodyParserFileEntry = {
  type: string
  filename: string
  data: Buffer
}

export type UwsBodyParserMixEntry = {
  [key: string]: string | Buffer | UwsBodyParserFileEntry
}
import { WebSocket } from './types';
export declare function rateLimit(limit: number, interval: number): (ws: WebSocket) => boolean | void;
import { HttpResponse } from './types';
export declare function readJsonAsync(res: HttpResponse): Promise<any>;
import { HttpResponse, HttpRequest } from './types';
/** serve static files from assetDir */
export declare function serveStatic(assetDir: string | string[], onAbortedHandler?: () => void): (res: HttpResponse, req: HttpRequest) => void;
// group all the Types Interfaces export here
// everything from the uWebSocket.js
export {
  // interfaces
  us_listen_socket,
  us_socket,
  us_socket_context_t,
  WebSocket,
  HttpResponse,
  HttpRequest,
  WebSocketBehavior,
  AppOptions,
  TemplatedApp,
  MultipartField,
  // types
  RecognizedString,
  CompressOptions,
  // enum
  ListenOptions,
  // Function
  App,
  SSLApp,
  us_listen_socket_close,
  us_socket_local_port,
  getParts,
  // Vars
  DISABLED,
  SHARED_COMPRESSOR,
  SHARED_DECOMPRESSOR,
  DEDICATED_COMPRESSOR_3KB,
  DEDICATED_COMPRESSOR_4KB,
  DEDICATED_COMPRESSOR_16KB,
  DEDICATED_COMPRESSOR_32KB,
  DEDICATED_COMPRESSOR_64KB,
  DEDICATED_COMPRESSOR_128KB,
  DEDICATED_COMPRESSOR_256KB,
  DEDICATED_DECOMPRESSOR_32KB,
  DEDICATED_DECOMPRESSOR_16KB,
  DEDICATED_DECOMPRESSOR_8KB,
  DEDICATED_DECOMPRESSOR_4KB,
  DEDICATED_DECOMPRESSOR_2KB,
  DEDICATED_DECOMPRESSOR_1KB,
  DEDICATED_DECOMPRESSOR_512B,
  DEDICATED_DECOMPRESSOR
} from 'uWebSockets.js'

// export all the interfaces
export * from './lib/interfaces'
// export the types
export * from './lib/types'
// don't know why jslint keep saying couldn't find the type, so reimport here again
import { UwsStringPairObj } from './lib/types'

export type UwsWriter = (payload: RecognizedString, headers?: UwsStringPairObj, status?: number) => void

export type UwsJsonWriter = (jsonObj: object | RecognizedString, status?: number) => void
import { AppOptions, TemplatedApp, RecognizedString } from './types';
import { UwsRouteSetup } from './lib/interfaces';
export declare class UwsServer {
    private opts?;
    autoStart: boolean;
    running: boolean;
    protected app: TemplatedApp | undefined;
    private port;
    private host;
    private token;
    constructor(opts?: AppOptions | undefined);
    /** stock start function */
    private onStartFn;
    private onStartErrorFn;
    /** Taking the app.listen out because there are more options to deal with now */
    private listen;
    /** overwrite the port number via the start up env */
    get portNum(): number;
    /** setter for post number */
    set portNum(port: number);
    /**
      we could specify the host like 0.0.0.0
      listen(host: RecognizedString, port: number, cb: (listenSocket: us_listen_socket) => void): TemplatedApp;
    */
    get hostName(): RecognizedString;
    /** setter for host name */
    set hostName(host: RecognizedString);
    /** set a custom on start callback */
    set onStart(cb: (url: string) => void);
    /** allow to pass a callback when server couldn't start */
    set onError(cb: () => void);
    /** this doesn't do anything just for overwrite or display a debug message */
    onStartCb(): void;
    /** to init, bind handlers and then start up the UWS Server */
    run(handlers: UwsRouteSetup[]): void;
    /** manually start the server */
    start(): void;
    /** gracefully shutdown the server */
    shutdown(): void;
    /** get the port number if it's randomly assign port */
    getPortNum(): number;
    /** get fully constructed hostname */
    getHostName(): string;
}
/// <reference types="node" />
import { HttpResponse, UwsWriter, UwsJsonWriter } from './types';
/** just write the header and encode the JSON to string */
export declare const jsonWriter: (res: HttpResponse) => UwsJsonWriter;
/** create a writer for output to respond */
export declare const getWriter: (res: HttpResponse) => UwsWriter;
/** just issue a 404 */
export declare const write404: (res: HttpResponse) => void;
/** writing the Buffer to a file */
export declare function writeBufferToFile(buffer: Buffer, path: string, permission?: number): boolean;

}
