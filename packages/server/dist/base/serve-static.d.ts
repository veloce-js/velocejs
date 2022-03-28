import { HttpResponse, HttpRequest } from 'uWebSockets.js';
/**
 * serve static files from assetDir
 */
export declare function serveStatic(assetDir: string): (res: HttpResponse, req: HttpRequest) => void;
