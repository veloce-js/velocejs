import { AppOptions } from 'uWebSockets.js';
export interface UwsEndPointHandler {
    type: string;
    path: string;
    handler: any;
}
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
