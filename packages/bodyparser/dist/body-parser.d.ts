/// <reference types="node" />
import { HttpResponse, HttpRequest, UwsRespondBody, UwsStringPairObj, UwsBodyParserMixEntry } from '../index';
export declare function bodyParser(res: HttpResponse, req: HttpRequest, onAborted?: () => void): Promise<UwsRespondBody>;
export declare function parseMultipart(headers: UwsStringPairObj, body: Buffer): object;
export declare function processParams(params: Array<Record<string, UwsBodyParserMixEntry>>): UwsBodyParserMixEntry;
