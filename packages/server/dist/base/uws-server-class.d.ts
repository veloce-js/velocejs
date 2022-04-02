import { AppOptions, RecognizedString } from '../types';
import { UwsRouteSetup } from './interfaces';
export declare class UwsServer {
    private opts?;
    private port;
    private host;
    private token;
    private onStartFn;
    constructor(opts?: AppOptions | undefined);
    portNum: number;
    hostName: RecognizedString;
    onStart: (url: string) => void;
    onStartCb(): void;
    run(handlers: UwsRouteSetup[]): void;
    private listen;
    shutdown(): void;
    getPortNum(): number;
}
