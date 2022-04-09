/// <reference types="node" />
import { HttpResponse, HttpRequest, UwsRespondBody, StringPairObj } from '../types';
export declare function parseQuery(query: string): StringPairObj;
export declare function getHeaders(req: HttpRequest): {};
export declare function parseMultipart(headers: StringPairObj, body: Buffer): object;
export declare function processParams(params: Array<any>): any;
export declare function bodyParser(res: HttpResponse, req: HttpRequest, onAborted?: () => void): Promise<UwsRespondBody>;
