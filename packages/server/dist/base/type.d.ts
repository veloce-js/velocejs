/// <reference types="node" />
export declare type StringPairObj = {
    [key: string]: string;
};
export declare type UwsRespondBody = {
    url: string;
    method: string;
    query: string;
    headers: StringPairObj;
    params: any;
    payload?: any;
};
export declare type UwsBodyParserFileEntry = {
    type: string;
    filename: string;
    data: Buffer;
};
