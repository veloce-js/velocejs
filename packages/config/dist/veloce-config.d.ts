export declare class VeloceConfig {
    private _src;
    private _content?;
    private _isConfigReady;
    private _isConfigResolve;
    private _isConfigReject;
    constructor(pathToConfigFile?: string);
    /** The main method to get config */
    getConfig(moduleName?: string): Promise<any>;
    private _readContent;
    private _setupCallback;
    /** allow using dot notation path to extract content */
    private _getByPath;
}
