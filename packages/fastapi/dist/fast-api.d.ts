/// <reference types="node" />
import { AppOptions, HttpResponse, HttpRequest, UwsRespondBody } from '@velocejs/server/index';
import { RouteMetaInfo, VeloceMiddleware } from './types';
import { FastApiInterface } from './lib/fast-api-interface';
export declare class FastApi implements FastApiInterface {
    private _uwsInstance;
    private _config;
    private _contract;
    private _routeForContract;
    private _written;
    private _headers;
    private _status;
    private _onConfigReady;
    private _onConfigWait;
    private _onConfigError;
    private _middlewares;
    private _validationErrStatus;
    private _dynamicRoutes;
    protected payload: UwsRespondBody | undefined;
    protected res: HttpResponse | undefined;
    protected req: HttpRequest | undefined;
    validatorPlugins: Array<any>;
    constructor(config?: AppOptions);
    /**                 PRIVATE METHODS                   */
    /** whether to setup a contract or not, if there is contract setup then we return a new route */
    private _prepareContract;
    /** generate an additonal route for the contract */
    private _createContractRoute;
    /** Mapping all the string name to method and supply to UwsServer run method */
    private _prepareRoutes;
    /** TS script force it to make it looks so damn bad for all their non-sense rules */
    private _prepareNormalRoute;
    /** just wrap this together to make it look neater */
    private _prepareRouteForContract;
    /** check if there is a dynamic route and prepare it */
    private _prepareDynamicRoute;
    private _mapMethodToHandler;
    /** take this out from above to keep related code in one place */
    private _prepareValidator;
    /** get call after the bodyParser, and prepare for the operation */
    private _prepareCtx;
    /** binding method to the uws server */
    private _run;
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
    /** Write the output
    This will be only output
    */
    private _render;
    /**           PROTECTED METHODS               */
    /**
      instead of using a Prepare decorator and ugly call the super.run
      we use a class decorator to call this method on init
      Dev can do @Rest(config), also for none-TS env dev can
      subclass then call this method to arhive the same effects
    */
    protected $prepare(routes: Array<RouteMetaInfo>, apiType?: string): void;
    /**         HOOKS                */
    /**
      We are not going to implement this tranditional middleware system
      instead we provide several hooks for the dev to customize how the
      input / output will be and they just have to overwrite this hooks to
      get the result
    */
    protected $writeHeader(key: string, value: string): void;
    protected $writeStatus(status: number): void;
    /**
      We have experience a lot of problem when delivery the content try to intercept
      the content type, instead we now force the finally output to use one of the following
      all with a $ to start to make sure no conflict with the regular public names
    */
    /** Apart from serving the standard html, when using the json contract system
    this will get wrap inside the delivery format - next protobuf as well */
    protected $json(content: any): void;
    /** just a string */
    protected $text(content: string | Buffer, type?: string): void;
    /** serving up the html content with correct html header */
    protected $html(content: string | Buffer): void;
    /** for serving up image / video or any none-textual content */
    protected $binary(url: string, content?: Buffer): void;
    /** streaming content */
    protected $stream(content: Buffer, type: string): void;
    /** @TODO for generate ssr content, should provide options via config but they could override here */
    protected $ssr(data: any, options?: any): void;
    /** register a method that will check the route */
    $registerProtectedRouteMethod(): void;
    /** dev can register their global middleware here */
    $use(middlewares: VeloceMiddleware | Array<VeloceMiddleware>): void;
    set validationErrorStatus(status: number);
    /**
     The interface to serve up the contract, it's public but prefix underscore to avoid override
     */
    _serveContract(): void;
    /**
     * We remap some of the methods from UwsServer to here for easier to use
     */
    $start(port?: number, host?: string): Promise<string>;
    $stop(): void;
    get $fastApiInfo(): {
        dev: boolean;
        port: number;
        host: import("@velocejs/server/index").RecognizedString;
        useContract: boolean;
        hasConfig: boolean;
    };
}
