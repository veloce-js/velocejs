/// <reference types="node" />
import { HttpRequest, UwsStringPairObj } from './types';
export declare function getHeaders(req: HttpRequest): {};
export declare function toArr(value: any): Array<any>;
export declare function toBuffer(data: any): Buffer;
export declare function takeApartName(name: string): Array<string | boolean>;
export declare const isEmptyObj: (obj: any) => boolean;
export declare const isJson: (headers: UwsStringPairObj) => boolean;
export declare const isForm: (headers: UwsStringPairObj) => boolean;
export declare const isFile: (headers: UwsStringPairObj) => boolean;
export declare function parseQuery(query: string): UwsStringPairObj;