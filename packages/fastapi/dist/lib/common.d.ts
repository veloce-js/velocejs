import type { UwsStringPairObj } from '@velocejs/server/index';
export declare function extractArgs(fnStr: string): Array<string>;
/** The validate result now comes in an object, we need to turn into array for apply */
export declare function prepareArgs(argList: string[], result: {
    [key: string]: any;
}): any[];
/** convert the string from url to the right type for dynamic route */
export declare function convertStrToType(argNames: Array<string>, argsList: Array<UwsStringPairObj>, params: UwsStringPairObj): (string | number | boolean)[];
/** take the spread argument def if there is one */
export declare function hasSpreadArg(argsList: UwsStringPairObj[]): UwsStringPairObj;
/** check if this handler is using a spread argument  */
export declare function isSpreadFn(list: UwsStringPairObj): boolean | "";
/** just a loop to take the value out from the params for spread fn */
export declare function prepareSpreadArg(params: UwsStringPairObj): any[];
/** check if the dynamic route parameter is valid or not, this throw to hail */
export declare function assertDynamicRouteArgs(argsList: UwsStringPairObj[]): void;
