/// <reference types="node" />
import type { HttpResponse, AnyType } from '../types';
/** this is from that stupid module arraybuffer-to-string really? */
export declare function arrayBufferToString(buffer: ArrayBuffer, encoding?: string): string;
/** get the file size */
export declare function getFileSize(fileName: string): number;
export declare function toArrayBuffer(buffer: Buffer): ArrayBuffer;
export declare function onAbortedOrFinishedResponse(res: HttpResponse, readStream: AnyType): void;
export declare function pipeStreamOverResponse(res: HttpResponse, readStream: AnyType, totalSize: number): void;
