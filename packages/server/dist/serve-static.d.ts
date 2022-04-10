import { HttpResponse, HttpRequest } from './types';
/**
 * serve static files from assetDir
 */
export declare function serveStatic(assetDir: string | string[]): (res: HttpResponse, req: HttpRequest) => void;
