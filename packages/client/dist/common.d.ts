import { JsonqlContractEntry, GenericKeyValue, Whatever } from './types';
/**  construct the url for different type of methods */
export declare function prepareUrl(entry: JsonqlContractEntry, args: GenericKeyValue): string;
/** extract the name from the dynamic url for reconstruct the url, from bodyparser */
export declare function getNamesFromDynamicUrl(url: string): string[];
/** just check if the arguments has key but not account for the value is array */
export declare function hasArgs(args: Whatever): boolean;
/** extra the array argument to pass to the UrlPattern lib to construct dynamic url */
export declare function getParamsForDynamicRoute(args: GenericKeyValue, names: string[]): {
    [x: string]: string | number;
};
/** wrap this in one function and we could replace the internal later */
export declare function createQueryUrl(route: string, args: GenericKeyValue): string;
/** check if the incoming header looks like json */
export declare function isJsonLike(headers: GenericKeyValue): any;
