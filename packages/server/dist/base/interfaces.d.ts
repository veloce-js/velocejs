export interface UwsEndPointHandler {
    type: string;
    path: string;
    handler: (...args: Array<any>) => void;
}
