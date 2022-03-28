/// <reference types="node" />
import { HttpResponse } from 'uWebSockets.js';
export declare function handleUpload(res: HttpResponse, bufferHandler: (b: Buffer) => void, onAbortedHandler?: () => void): void;
export declare function writeBufferToFile(buffer: Buffer, path: string, permission?: number): boolean;
