export declare type StringPairObj = {
    [key: string]: string;
};
export declare type RouteMetaInfo = {
    propertyName: string;
    path: string;
    type: string;
    onAbortedHandler?: string;
    [key: string]: any;
};
export declare type MetaDecorator = (path: string) => (target: any, propertyName: string) => void;
export declare type UwsRespondBody = {
    url: string;
    method: string;
    query: string;
    headers: StringPairObj;
    params: any;
    payload?: any;
};
