/// <reference types="node" />
export declare type UwsStringPairObj = {
    [key: string]: string;
};
export declare type UwsRespondBody = {
    url: string;
    method: string;
    query: string;
    headers: UwsStringPairObj;
    params: object;
    type?: string;
    payload?: Buffer;
};
export declare type UwsBodyParserFileEntry = {
    type: string;
    filename: string;
    data: Buffer;
};
export declare type UwsBodyParserMixEntry = {
    [key: string]: string | Buffer | UwsBodyParserFileEntry;
};
