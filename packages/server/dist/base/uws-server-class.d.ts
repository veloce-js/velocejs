import { AppOptions } from 'uWebSockets.js';
import { UwsRouteHandler } from './interfaces';
export declare class UwsServer {
    private opts?;
    private port;
    private token;
    constructor(opts?: AppOptions | undefined);
    get portNum(): number;
    set portNum(port: number);
    onStart(): void;
    run(handlers: UwsRouteHandler[]): void;
    shutdown(): void;
    getPortNum(): number;
}
