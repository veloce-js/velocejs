"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeloceConfig = exports.PATH_TO_VELOCE_CONFIG = void 0;
const tslib_1 = require("tslib");
const fsx = tslib_1.__importStar(require("fs-extra"));
const node_path_1 = require("node:path");
const utils_1 = require("@jsonql/utils");
const constants_1 = require("./constants");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('velocejs:config:class');
exports.PATH_TO_VELOCE_CONFIG = process.env.VELOCE_CONFIG;
// main
class VeloceConfig {
    constructor(pathToConfigFile) {
        this._setupCallback();
        const cwd = process.cwd();
        let _path = pathToConfigFile || exports.PATH_TO_VELOCE_CONFIG;
        // we only throw error when dev provide a file that doesn't exist
        if (_path) {
            _path = (0, node_path_1.resolve)(_path);
            debug('pathToConfigFile', _path);
            if (!fsx.existsSync(_path)) {
                this._configReject(new Error(`${_path} does not exist!`));
            }
            else {
                this._readContent(_path);
            }
        }
        else {
            let found = false;
            constants_1.SUPPORT_EXT.forEach(ext => {
                if (!this._src) {
                    const file = (0, node_path_1.join)(cwd, [constants_1.FILE_NAME, ext].join('.'));
                    debug('search for file', file);
                    if (fsx.existsSync(file)) {
                        found = true;
                        this._readContent(file);
                    }
                }
            });
            if (!found) {
                // Even if there is no config file we just resolve with an empty object
                // means there is no config
                this._configResolve({});
            }
        }
    }
    /** a quick way to grab some of the default to fill the gap */
    static getDefaults(key) {
        return key ? constants_1.VELOCE_DEFAULTS[key] : constants_1.VELOCE_DEFAULTS;
    }
    /** this let us to able to tell if the system is ready or not */
    get isReady() {
        return this._isConfigReady;
    }
    /** The main method to get config */
    getConfig(moduleName) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this._content) {
                const config = this._getByPath(this._content, moduleName);
                return config ?
                    Promise.resolve(config) :
                    Promise.reject(`${moduleName} not found in config`);
            }
            return this._isConfigReady
                .then((config) => this._getByPath(config, moduleName));
        });
    }
    /** storing the content of the config file */
    _readContent(pathToFile) {
        this._src = pathToFile;
        Promise.resolve().then(() => tslib_1.__importStar(require(pathToFile))).then((content) => {
            this._content = this._prepareConfig(content.default); // there is a default before the config
            this._configResolve(this._content);
        });
    }
    /** merge default info into the dev provide one */
    _prepareConfig(content) {
        const _config = {};
        for (const key in content) {
            _config[key] = constants_1.VELOCE_DEFAULTS[key] !== undefined ?
                Object.assign({}, constants_1.VELOCE_DEFAULTS[key], content[key]) :
                content[key];
        }
        return _config;
    }
    /** setup the api internal callback to know if it's ready to use  */
    _setupCallback() {
        this._isConfigReady = new Promise((resolver, rejecter) => {
            this._configResolve = resolver;
            this._configReject = rejecter;
        });
    }
    /** allow using dot notation path to extract content */
    _getByPath(content, moduleName) {
        if (moduleName) {
            if (moduleName.indexOf('.') > -1) {
                return (0, utils_1.accessByPath)(content, moduleName);
            }
            return content[moduleName];
        }
        return content;
    }
}
exports.VeloceConfig = VeloceConfig;
