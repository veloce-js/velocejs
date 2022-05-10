import { VeloceConfigEntry } from './types';
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
    private _readContent;
    private _setupCallback;
    /** allow using dot notation path to extract content */
    private _getByPath;
}
