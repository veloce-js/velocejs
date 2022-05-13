import { AppOptions, TemplatedApp, RecognizedString } from './types';
import { UwsRouteSetup } from './lib/interfaces';
export declare class UwsServer {
    private opts?;
    autoStart: boolean;
    running: boolean;
    protected app: TemplatedApp | undefined;
    private port;
    private host;
    private token;
    constructor(opts?: AppOptions | undefined);
    /** stock start function */
    private onStartFn;
    private onStartErrorFn;
    /** Taking the app.listen out because there are more options to deal with now */
    private listen;
    /** overwrite the port number via the start up env */
    get portNum(): number;
    /** setter for post number */
    set portNum(port: number);
    /**
      we could specify the host like 0.0.0.0
      listen(host: RecognizedString, port: number, cb: (listenSocket: us_listen_socket) => void): TemplatedApp;
    */
    get hostName(): RecognizedString;
    /** setter for host name */
    set hostName(host: RecognizedString);
    /** set a custom on start callback */
    set onStart(cb: (url: string) => void);
    /** allow to pass a callback when server couldn't start */
    set onError(cb: () => void);
    /** this doesn't do anything just for overwrite or display a debug message */
    onStartCb(): void;
    /** to init, bind handlers and then start up the UWS Server */
    run(handlers: UwsRouteSetup[]): void;
    /** manually start the server */
    start(): void;
    /** gracefully shutdown the server */
    shutdown(): void;
    /** get the port number if it's randomly assign port */
    getPortNum(): number;
    /** get fully constructed hostname */
    getHostName(): string;
}
