import { HttpResponse, HttpRequest } from 'uWebSockets.js';
import { UwsRespondBody } from '../types';
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
