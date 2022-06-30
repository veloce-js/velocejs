/// <reference types="node" />
import type { HttpResponse, AnyType } from './types';
export declare function uploadHandler(res: HttpResponse, bufferHandler: (b: Buffer) => void, onAbortedHandler?: () => void): void;
export declare function onDataHandler(res: HttpResponse, bufferHandler: (b: Buffer | AnyType) => void): void;
