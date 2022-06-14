/// <reference types="node" />
import { HttpRequest, UwsStringPairObj, UwsBodyParserOptions } from './types';
/** provide default to options */
export declare function applyConfig(config?: UwsBodyParserOptions): {
    stripUnderscoreParam: boolean;
    originalRouteDef: string;
} & UwsBodyParserOptions;
/** return all the headers with lowercase key */
export declare function getHeaders(req: HttpRequest): {};
export declare function toArr(value: unknown): Array<unknown>;
/** unknown to buffer */
export declare function toBuffer(data: unknown): Buffer;
export declare function takeApartName(name: string): Array<string | boolean>;
export declare const isEmptyObj: (obj: object) => boolean;
/** check if the header 'Content-Type' is a json like */
export declare const isJson: (headers: UwsStringPairObj) => boolean;
export declare const isForm: (headers: UwsStringPairObj) => boolean;
export declare const isMultipart: (headers: UwsStringPairObj) => boolean;
/** check for one the binary format header */
export declare const isFile: (headers: UwsStringPairObj) => boolean;
/** just check if the url looks like a dynamic route */
export declare const isDynamicRoute: (route: string) => boolean;
