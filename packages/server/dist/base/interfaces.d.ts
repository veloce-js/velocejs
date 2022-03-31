export interface UwsRouteSetup {
    type: string;
    path: string;
    handler: (...args: Array<any>) => void;
}
