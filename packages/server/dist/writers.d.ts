/// <reference types="node" />
import { HttpResponse, UwsWriter, UwsJsonWriter } from './types';
/** just write the header and encode the JSON to string */
export declare const jsonWriter: (res: HttpResponse) => UwsJsonWriter;
/** create a writer for output to respond */
export declare const getWriter: (res: HttpResponse) => UwsWriter;
/** just issue a 404 */
export declare const write404: (res: HttpResponse) => void;
/** writing the Buffer to a file */
export declare function writeBufferToFile(buffer: Buffer, path: string, permission?: number): boolean;
