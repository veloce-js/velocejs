export declare class VeloceConfig {
    private _src;
    private _content?;
    private _isConfigReady;
    private _isConfigResolve;
    private _isConfigReject;
    constructor(pathToConfigFile?: string);
    private _readContent;
    private _setupCallback;
    getConfig(moduleName?: string): Promise<any>;
    /** allow using dot notation path to extract content */
    private _getByPath;
}
