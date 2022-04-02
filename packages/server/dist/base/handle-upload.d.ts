import { HttpResponse, HttpRequest } from '../types';
export declare function handleUpload(res: HttpResponse, req: HttpRequest, dir: string, filename?: string): Promise<any>;
export declare function uploadHandler(res: HttpResponse, bufferHandler: (b: Buffer) => void, onAbortedHandler?: () => void): void;
export declare function onDataHandler(res: HttpResponse, bufferHandler: (b: Buffer | any) => void): void;
export declare function writeBufferToFile(buffer: Buffer, path: string, permission?: number): boolean;
