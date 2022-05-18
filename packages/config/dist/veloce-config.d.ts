import { VeloceConfigEntry } from './types';
export declare const PATH_TO_VELOCE_CONFIG: string | undefined;
export declare class VeloceConfig {
    private _src;
    private _content?;
    private _isConfigReady;
    private _configResolve;
    private _configReject;
    constructor(pathToConfigFile?: string);
    /** this let us to able to tell if the system is ready or not */
    get isReady(): Promise<VeloceConfigEntry>;
    /** The main method to get config */
    getConfig(moduleName?: string): Promise<any>;
    /** storing the content of the config file */
    private _readContent;
    /** merge default info into the dev provide one */
    private _prepareConfig;
    /** setup the api internal callback to know if it's ready to use  */
    private _setupCallback;
    /** allow using dot notation path to extract content */
    private _getByPath;
}
