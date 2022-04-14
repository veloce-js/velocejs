import { AppOptions, HttpResponse, HttpRequest, UwsRespondBody, UwsWriter, UwsJsonWriter } from '@velocejs/server/src/types';
import { FastApiInterface } from './fast-api-interface';
export declare class FastApi implements FastApiInterface {
    private uwsInstance;
    private written;
    private headers;
    private status;
    private onConfigReady;
    private onConfigWait;
    private onConfigError;
    private jsonValidationErrorStatus;
    protected payload: UwsRespondBody | undefined;
    protected res: HttpResponse | undefined;
    protected req: HttpRequest | undefined;
    protected writer: UwsWriter;
    protected jsonWriter: UwsJsonWriter;
    constructor(config?: AppOptions);
    private prepare;
    private prepareRoutes;
    private mapMethodToHandler;
    private handleValidationError;
    private applyArgs;
    private setTemp;
    private unsetTemp;
    private write;
    protected writeHeader(key: string, value: string): void;
    protected writeStatus(status: number): void;
    set validationErrorStatus(status: number);
    /**
     * We remap some of the methods from UwsServer to here for easier to use
     */
    start(port?: number, host?: string): Promise<string>;
    stop(): void;
}
