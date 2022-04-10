/// <reference types="node" />
import { HttpResponse, UwsWriter, UwsJsonWriter } from './types';
export declare const jsonWriter: (res: HttpResponse) => UwsJsonWriter;
export declare const getWriter: (res: HttpResponse) => UwsWriter;
export declare const write404: (res: HttpResponse) => void;
export declare function writeBufferToFile(buffer: Buffer, path: string, permission?: number): boolean;
