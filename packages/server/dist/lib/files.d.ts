/// <reference types="node" />
import { HttpResponse } from '../types';
/** get the file size */
export declare function getFileSize(fileName: string): number;
export declare function toArrayBuffer(buffer: Buffer): ArrayBuffer;
export declare function onAbortedOrFinishedResponse(res: HttpResponse, readStream: any): void;
export declare function pipeStreamOverResponse(res: HttpResponse, readStream: any, totalSize: number): void;
