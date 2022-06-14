import type { RouteMetaInfo, JsonqlObjectValidateInput, JsonqlValidationRule, ArgsListType } from '../types';
import type { UwsStringPairObj } from '@velocejs/server/index';
export declare function extractArgs(fnStr: string): Array<string>;
/** The validate result now comes in an object, we need to turn into array for apply */
export declare function prepareArgs(argList: string[], result: UwsStringPairObj): string[];
/** convert the string from url to the right type for dynamic route */
export declare function convertStrToType(argNames: Array<string>, argsList: Array<ArgsListType>, params: UwsStringPairObj): (string | number | boolean)[];
/** The actual method to convert the string to their type */
export declare function convertStrToTypeAction(type: string, value: string): string | number | boolean;
/** take the spread argument def if there is one */
export declare function hasSpreadArg(argsList: ArgsListType[]): ArgsListType;
/** check if this handler is using a spread argument  */
export declare function isSpreadFn(list: ArgsListType): boolean | "" | undefined;
/** just a loop to take the value out from the params for spread fn */
export declare function prepareSpreadArg(params: UwsStringPairObj): unknown[];
/** check if the dynamic route parameter is valid or not, this throw to hail */
export declare function assertDynamicRouteArgs(argsList: ArgsListType[]): void;
/** this is a mouthful! */
export declare function prepareArgsFromDynamicToSpread(argNames: Array<string>, argsList: Array<ArgsListType>, params: UwsStringPairObj, paramNames: string[]): any;
/** check if a value is undefined, wrapper to make the code looks cleaner */
export declare const notUndef: (value: unknown) => boolean;
/** This method was in the rest.ts now move inside the FastApi class def
because we need to re-organize how to init the validation object among others
*/
export declare function mergeInfo(map: object, existingRoutes: Array<RouteMetaInfo>, validations: JsonqlObjectValidateInput, protectedRoutes: string[]): RouteMetaInfo[];
/** skip the static and raw type */
export declare function prepareValidateRoute(type: string, propertyName: string, validations: JsonqlObjectValidateInput): JsonqlValidationRule | undefined;
/** check if the client is using jsonql */
export declare function isJsonql(headers: UwsStringPairObj): boolean;
/** when _jsonql === true then we wrap the result into this structure */
export declare function formatJsonql(payload: Partial<{
    data: any;
    meta: any;
    error: any;
}>): {
    data: any;
    meta: any;
    error: any;
};
