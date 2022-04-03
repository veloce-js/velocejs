import { AppOptions, RecognizedString } from './types';
import { UwsRouteSetup } from './base/interfaces';
export declare class UwsServer {
    private opts?;
    private port;
    private host;
    private token;
    private onStartFn;
    constructor(opts?: AppOptions | undefined);
    get portNum(): number;
    set portNum(port: number);
    get hostName(): RecognizedString;
    set hostName(host: RecognizedString);
    set onStart(cb: (url: string) => void);
    onStartCb(): void;
    run(handlers: UwsRouteSetup[]): void;
    private listen;
    shutdown(): void;
    getPortNum(): number;
}
