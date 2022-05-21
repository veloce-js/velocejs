/// <reference types="node" />
import { HttpResponse, HttpRequest, UwsRespondBody, UwsStringPairObj, UwsBodyParserMixEntry } from '../index';
export declare function bodyParser(res: HttpResponse, req: HttpRequest, options?: {
    config: UwsStringPairObj;
    onAborted?: () => void;
}): Promise<UwsRespondBody>;
/** all-in-one to parse and post process the multipart-formdata input */
export declare function parseMultipart(headers: UwsStringPairObj, body: Buffer): object;
/** export this for unit test **/
export declare function processParams(params: Array<Record<string, UwsBodyParserMixEntry>>): UwsBodyParserMixEntry;
