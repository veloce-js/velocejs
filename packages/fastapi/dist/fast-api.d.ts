/// <reference types="node" />
import type { AppOptions, HttpResponse, HttpRequest, UwsRespondBody, UwsStringPairObj } from '@velocejs/server/index';
import type { RouteMetaInfo, JsonqlObjectValidateInput, JsonqlValidationPlugin } from './types';
import { FastApiInterface } from './lib/fast-api-interface';
export declare class FastApi implements FastApiInterface {
    private _uwsInstance;
    private _config;
    private _contract;
    private _routeForContract;
    private _written;
    private _incomingHeaders;
    private _headers;
    private _status;
    private _jsonql;
    private _onConfigReady;
    private _onConfigWait;
    private _onConfigError;
    private _validators;
    private _validationErrStatus;
    private _validationPlugins;
    private _dynamicRoutes;
    private _staticRouteIndex;
    private _hasCatchAll;
    protected payload: UwsRespondBody | undefined;
    protected res: HttpResponse | undefined;
    protected req: HttpRequest | undefined;
    constructor(config?: AppOptions);
    /**                 PRIVATE METHODS                   */
    /** whether to setup a contract or not, if there is contract setup then we return a new route */
    private _prepareContract;
    /** generate an additonal route for the contract */
    private _insertContractRoute;
    /** create a catch all route to handle those unhandle url(s) */
    private _createCatchAllRoute;
    /** check if there is a catch all route, otherwise create one at the end */
    private _checkCatchAllRoute;
    /** Mapping all the string name to method and supply to UwsServer run method */
    private _prepareRoutes;
    /** create this wrapper for future development */
    private _prepareSocketRoute;
    /** TS script force it to make it looks so damn bad for all their non-sense rules */
    private _prepareNormalRoute;
    /** check if there is a dynamic route and prepare it */
    private _prepareDynamicRoute;
    /** transform the string name to actual method */
    private _mapMethodToHandler;
    /** wrap this together to make it clearer what it does */
    private _bodyParser;
    /** fetch the bodyParser config */
    private _getBodyParserConfig;
    /** this is split out from _prepareValidator */
    private _prepareValidationFn;
    /** take this out from above to keep related code in one place */
    private _prepareValidator;
    /** get call after the bodyParser, and prepare for the operation */
    private _prepareCtx;
    /** just wrap this together to make it look neater */
    private _prepareRouteForContract;
    /** binding method to the uws server */
    private _run;
    /** split out from above because we still need to handle the user provide middlewares */
    private _handleMiddlewares;
    /** handle the errors return from validation */
    private _handleValidationError;
    /** @TODO handle protected route, also we need another library to destruct those pattern route */
    private _handleProtectedRoute;
    /** handle rendering content */
    private _handleContent;
    private _applyArgs;
    private _setTemp;
    private _unsetTemp;
    /** Write the output to client */
    private _render;
    /** prepare validators */
    private _initValidators;
    /**           PROTECTED METHODS               */
    /**
      instead of using a Prepare decorator and ugly call the super.run
      we use a class decorator to call this method on init
      Dev can do @Rest(config), also for none-TS env dev can
      subclass then call this method to arhive the same effects
    */
    protected $prepare(astMap: object, existingRoutes: Array<RouteMetaInfo>, validations: JsonqlObjectValidateInput, protectedRoutes: string[], apiType?: string): void;
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
      they all start with a $ to make sure no conflict with the regular public names
    */
    /** Apart from serving the standard html, when using the json contract system
    this will get wrap inside the delivery format - next protobuf as well */
    protected $json(content: UwsStringPairObj): void;
    /** just a string */
    protected $text(content: string | Buffer, type?: string): void;
    /** serving up the html content with correct html header */
    protected $html(content: string | Buffer): void;
    /** for serving up image / video or any non-textual content */
    protected $binary(url: string, content?: Buffer): void;
    /** streaming content */
    protected $stream(content: Buffer, type: string): void;
    /** @TODO for generate ssr content, should provide options via config but they could override here */
    protected $ssr(data: UwsStringPairObj, options?: UwsStringPairObj): void;
    /** @TODO SSG but this should only call when data been update and generate static files
    then it get serve up via the @ServeStatic TBC
    */
    /** overload the ValidatorPlugins registerPlugin better approach is
        to do that in the velocejs.config.js
        We got a problem here when we call this probably right after init the Fastapi
        but the validator instance is not yet ready so it was never registered
        so we just store it here and let the init validator deal with it
    */
    $registerValidationPlugin(name: string, plugin: JsonqlValidationPlugin): boolean;
    /** register a method that will check the route */
    $registerAuthMethod(): void;
    set $validationErrorStatus(status: number);
    /**
     The interface to serve up the contract, it's public but prefix underscore to avoid name collison
     */
    $_serveContract(): void;
    /** @TODO this is reserved for serving up generated (js) script for validator */
    $_serveScript(): void;
    /**
      When there is no catch all route, we will insert this to the end and serve up a 404
      because when the route unmatch the server just hang up
    */
    $_catchAll(): void;
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
