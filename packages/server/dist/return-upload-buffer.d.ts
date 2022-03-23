/// <reference types="node" />
import { HttpResponse } from 'uWebSockets.js';
export declare function returnUploadBuffer(res: HttpResponse): Promise<any>;
export declare function writeBufferToFile(buffer: Buffer, path: string, permission?: number): void;
