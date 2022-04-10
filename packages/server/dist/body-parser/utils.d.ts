/// <reference types="node" />
import { HttpRequest, StringPairObj } from '../types';
export declare function getHeaders(req: HttpRequest): {};
export declare function toArr(value: any): Array<any>;
export declare function toBuffer(data: any): Buffer;
export declare function takeApartName(name: string): Array<string | boolean>;
export declare const isEmptyObj: (obj: any) => boolean;
export declare const isJson: (headers: StringPairObj) => boolean;
export declare const isForm: (headers: StringPairObj) => boolean;
export declare const isFile: (headers: StringPairObj) => boolean;
export declare function parseQuery(query: string): StringPairObj;
