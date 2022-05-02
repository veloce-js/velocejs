/// <reference types="node" />
import { HttpResponse } from './types';
export declare function uploadHandler(res: HttpResponse, bufferHandler: (b: Buffer) => void, onAbortedHandler?: () => void): void;
export declare function onDataHandler(res: HttpResponse, bufferHandler: (b: Buffer | any) => void): void;
