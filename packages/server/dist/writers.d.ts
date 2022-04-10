/// <reference types="node" />
import { HttpResponse, StringPairObj, RecognizedString } from './types';
export declare const jsonWriter: (res: HttpResponse) => (jsonObj: object) => void;
export declare const getWriter: (res: HttpResponse) => (payload: RecognizedString, headers?: StringPairObj | undefined, status?: string | number | undefined) => void;
export declare const write404: (res: HttpResponse) => void;
export declare function writeBufferToFile(buffer: Buffer, path: string, permission?: number): boolean;
