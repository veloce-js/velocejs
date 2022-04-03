import { HttpResponse, HttpRequest, UwsRespondBody, StringPairObj } from '../types';
export declare function parseQuery(query: string): StringPairObj;
export declare function getHeaders(req: HttpRequest): {};
export declare function bodyParser(res: HttpResponse, req: HttpRequest, onAborted?: () => void): Promise<UwsRespondBody>;
