import { AppOptions, HttpResponse, HttpRequest, UwsRespondBody, UwsWriter, UwsJsonWriter } from '@velocejs/server/index';
import { RouteMetaInfo, MiddlewareFunction } from './types';
import { FastApiInterface } from './lib/fast-api-interface';
export declare class FastApi implements FastApiInterface {
    private _uwsInstance;
    private _written;
    private _headers;
    private _status;
    private _onConfigReady;
    private _onConfigWait;
    private _onConfigError;
    private _jsonValidationErrorStatus;
    protected payload: UwsRespondBody | undefined;
    protected res: HttpResponse | undefined;
    protected req: HttpRequest | undefined;
    protected writer: UwsWriter;
    protected jsonWriter: UwsJsonWriter;
    constructor(config?: AppOptions);
    protected prepare(routes: Array<RouteMetaInfo>): void;
    private prepareRoutes;
    private mapMethodToHandler;
    /** this is where the stack get exeucted */
    private runMiddlewareStacks;
    private handleProtectedRoute;
    private handleContent;
    private handleValidationError;
    private applyArgs;
    private setTemp;
    private unsetTemp;
    private write;
    protected writeHeader(key: string, value: string): void;
    protected writeStatus(status: number): void;
    /** dev can register their global middleware here */
    registerMiddleware(middlewares: MiddlewareFunction | Array<MiddlewareFunction>): void;
    set validationErrorStatus(status: number);
    /**
     * We remap some of the methods from UwsServer to here for easier to use
     */
    start(port?: number, host?: string): Promise<string>;
    stop(): void;
}
