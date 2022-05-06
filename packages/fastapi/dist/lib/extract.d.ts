export declare function extractArgs(fnStr: string): Array<string>;
/** The validate result now comes in an object, we need to turn into array for apply */
export declare function prepareArgs(argList: string[], result: {
    [key: string]: any;
}): any[];
