import { AppOptions, HttpResponse, HttpRequest, UwsRespondBody, UwsWriter, UwsJsonWriter } from '@velocejs/server/index';
import { RouteMetaInfo, VeloceMiddleware } from './types';
import { FastApiInterface } from './lib/fast-api-interface';
export declare class FastApi implements FastApiInterface {
    private _uwsInstance;
    private _written;
    private _headers;
    private _status;
    private _onConfigReady;
    private _onConfigWait;
    private _onConfigError;
    private _middlewares;
    private _validationErrStatus;
    protected payload: UwsRespondBody | undefined;
    protected res: HttpResponse | undefined;
    protected req: HttpRequest | undefined;
    protected writer: UwsWriter;
    protected jsonWriter: UwsJsonWriter;
    validatorPlugins: Array<any>;
    constructor(config?: AppOptions);
    protected prepare(routes: Array<RouteMetaInfo>): void;
    private prepareRoutes;
    private _mapMethodToHandler;
    /** get call after the bodyParser, and prepare for the operation */
    private _prepareCtx;
    /** split out from above because we still need to handle the user provide middlewares */
    private _handleMiddlewares;
    private _handleValidationError;
    /** wrap the _createValidator with additoinal property */
    private _createValidator;
    /** @TODO handle protected route, also we need another library to destruct those pattern route */
    private _handleProtectedRoute;
    private _handleContent;
    private _applyArgs;
    private _setTemp;
    private _unsetTemp;
    private _render;
    protected writeHeader(key: string, value: string): void;
    protected writeStatus(status: number): void;
    /** register a method that will check the route */
    registerProtectedRouteMethod(): void;
    /** dev can register their global middleware here */
    use(middlewares: VeloceMiddleware | Array<VeloceMiddleware>): void;
    set validationErrorStatus(status: number);
    /**
     * We remap some of the methods from UwsServer to here for easier to use
     */
    start(port?: number, host?: string): Promise<string>;
    stop(): void;
    get fastApiInfo(): {
        port: number;
        host: import("@velocejs/server/index").RecognizedString;
    };
}
