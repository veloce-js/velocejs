import { HttpResponse, HttpRequest } from 'uWebSockets.js';
import { UwsRespondBody } from '../api/type';
export declare type UwsRouteHandler = (res: HttpResponse, req: HttpRequest) => void;
export interface UwsRouteSetup {
    type: string;
    path: string;
    handler: unknown;
}
export interface UwsParsedResult extends UwsRespondBody {
    res: HttpResponse;
    req: HttpRequest;
}
