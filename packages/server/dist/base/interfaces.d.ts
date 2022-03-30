export interface UwsRouteHandler {
    type: string;
    path: string;
    handler: (...args: Array<any>) => void;
}
