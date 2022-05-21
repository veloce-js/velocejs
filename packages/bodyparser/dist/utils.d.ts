/// <reference types="node" />
import { HttpRequest, UwsStringPairObj, UwsBodyParserOptions } from './types';
/** provide default to options */
export declare function applyConfig(config?: UwsBodyParserOptions): {
    stripUnderscoreParam: boolean;
    originalRouteDef: string;
} & UwsBodyParserOptions;
/** return all the headers */
export declare function getHeaders(req: HttpRequest): {};
export declare function toArr(value: any): Array<any>;
export declare function toBuffer(data: any): Buffer;
export declare function takeApartName(name: string): Array<string | boolean>;
export declare const isEmptyObj: (obj: any) => boolean;
export declare const isJson: (headers: UwsStringPairObj) => boolean;
export declare const isForm: (headers: UwsStringPairObj) => boolean;
export declare const isFile: (headers: UwsStringPairObj) => boolean;
/** just check if the url looks like a dynamic route */
export declare const isDynamicRoute: (route: string) => boolean;
