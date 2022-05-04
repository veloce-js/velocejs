import { AppOptions, TemplatedApp, RecognizedString } from './types';
import { UwsRouteSetup } from './base/interfaces';
export declare class UwsServer {
    private opts?;
    autoStart: boolean;
    running: boolean;
    protected app: TemplatedApp | undefined;
    private port;
    private host;
    private token;
    constructor(opts?: AppOptions | undefined);
    private onStartFn;
    private onStartErrorFn;
    private listen;
    get portNum(): number;
    set portNum(port: number);
    get hostName(): RecognizedString;
    set hostName(host: RecognizedString);
    set onStart(cb: (url: string) => void);
    set onError(cb: () => void);
    onStartCb(): void;
    run(handlers: UwsRouteSetup[]): void;
    start(): void;
    shutdown(): void;
    /** get the port number if it's randomly assign port */
    getPortNum(): number;
    /** get fully constructed hostname */
    getHostName(): string;
}
