/// <reference types="node" />
import type { HttpResponse, HttpRequest, UwsRespondBody, UwsStringPairObj, UwsBodyParserMixEntry, UwsBodyParserOptions } from './types';
export declare function bodyParser(res: HttpResponse, req: HttpRequest, options?: {
    config: UwsBodyParserOptions;
}): Promise<UwsRespondBody>;
/** all-in-one to parse and post-process the multipart-formdata input */
export declare function parseMultipart(headers: UwsStringPairObj, body: Buffer): object;
/** export this for unit test **/
export declare function processParams(params: Array<Record<string, UwsBodyParserMixEntry>>): UwsBodyParserMixEntry;
