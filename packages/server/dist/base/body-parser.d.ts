import { HttpResponse, HttpRequest } from 'uWebSockets.js';
import { UwsRespondBody } from '../api/type';
export declare function parseQuery(query: string): any;
export declare function bodyParser(res: HttpResponse, req: HttpRequest, onAborted?: () => void): Promise<UwsRespondBody>;
