import { AppOptions, HttpResponse, HttpRequest, UwsRespondBody, UwsWriter, UwsJsonWriter } from '@velocejs/server/src/types';
export declare class FastApi {
    private uwsInstance;
    private written;
    private headers;
    private status;
    private onConfigReady;
    private onConfigWait;
    private onConfigError;
    protected payload: UwsRespondBody | undefined;
    protected res: HttpResponse | undefined;
    protected req: HttpRequest | undefined;
    protected writer: UwsWriter;
    protected jsonWriter: UwsJsonWriter;
    constructor(config?: AppOptions);
    private prepare;
    private prepareRoutes;
    private mapMethodToHandler;
    private applyArgs;
    private setTemp;
    private unsetTemp;
    private write;
    protected writeHeader(key: string, value: string): void;
    protected writeStatus(status: number): void;
    /**
     * We remap some of the methods from UwsServer to here for easier to use
     */
    start(port?: number, host?: string): Promise<string>;
    stop(): void;
}
