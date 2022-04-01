import { AppOptions, RecognizedString } from 'uWebSockets.js';
import { UwsRouteSetup } from './interfaces';
export declare class UwsServer {
    private opts?;
    private port;
    private host;
    private token;
    constructor(opts?: AppOptions | undefined);
    get portNum(): number;
    set portNum(port: number);
    get hostName(): RecognizedString;
    set hostName(host: RecognizedString);
    onStart(): void;
    run(handlers: UwsRouteSetup[]): void;
    private listen;
    shutdown(): void;
    getPortNum(): number;
}
