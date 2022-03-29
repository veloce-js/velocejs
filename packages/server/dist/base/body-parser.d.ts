import { HttpResponse, HttpRequest } from 'uWebSockets.js';
export declare type RespondBody = {
    url: string;
    method: string;
    headers: any;
    query: any;
    params: any;
    payload?: any;
};
export declare function parseQuery(query: string): any;
export declare function bodyParser(res: HttpResponse, req: HttpRequest, onAborted?: () => void): Promise<RespondBody>;
