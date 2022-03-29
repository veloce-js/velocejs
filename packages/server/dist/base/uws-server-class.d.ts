import { AppOptions } from 'uWebSockets.js';
import { UwsEndPointHandler } from './interfaces';
export declare class UwsServer {
    private opts?;
    port: number;
    private token;
    constructor(opts?: AppOptions | undefined);
    private get portNum();
    onStart(): void;
    run(handlers: UwsEndPointHandler[]): void;
    shutdown(): void;
    getPortNum(): number;
}
