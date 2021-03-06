import type { HttpResponse, HttpRequest } from './types';
/** serve static files from assetDir */
export declare function serveStatic(assetDir: string | string[], onAbortedHandler?: () => void): (res: HttpResponse, req: HttpRequest) => void;
