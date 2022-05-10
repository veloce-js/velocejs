"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeloceConfig = void 0;
const tslib_1 = require("tslib");
const fsx = tslib_1.__importStar(require("fs-extra"));
const node_path_1 = require("node:path");
const constants_1 = require("./constants");
// main
class VeloceConfig {
    constructor(pathToConfigFile) {
        this._setupCallback();
        const cwd = process.cwd();
        if (pathToConfigFile) {
            if (!fsx.existsSync(pathToConfigFile)) {
                this._isConfigReject(true);
                throw new Error(`${pathToConfigFile} does not exist!`);
            }
            this._readContent(pathToConfigFile);
        }
        else {
            let found = false;
            constants_1.SUPPORT_EXT.forEach(ext => {
                if (!this._src) {
                    const file = (0, node_path_1.join)(cwd, [constants_1.FILE_NAME, ext].join('.'));
                    if (fsx.existsSync(file)) {
                        found = true;
                        this._readContent(file);
                    }
                }
            });
            if (!found) {
                // if there is no config file then we just reject it
                this._isConfigReject(`No config file`);
            }
        }
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
    _readContent(pathToFile) {
        this._src = pathToFile;
        Promise.resolve().then(() => tslib_1.__importStar(require(pathToFile))).then((content) => {
            this._content = content.default; // there is a default before the config
            this._isConfigResolve(this._content);
        });
    }
    _setupCallback() {
        this._isConfigReady = new Promise((resolver, rejecter) => {
            this._isConfigResolve = resolver;
            this._isConfigReject = rejecter;
        });
    }
    /** allow using dot notation path to extract content */
    _getByPath(content, moduleName) {
        if (moduleName && moduleName.indexOf('.')) {
            const parts = moduleName.split('.');
            const ctn = parts.length;
            let _tmp;
            for (let i = 0; i < ctn; ++i) {
                const key = parts[i];
                if (_tmp && _tmp[key]) {
                    _tmp = _tmp[key];
                }
                else {
                    _tmp = content[key];
                }
                if (i === ctn - 1) {
                    return _tmp;
                }
            }
        }
        else {
            return moduleName ? content[moduleName] : content;
        }
    }
}
exports.VeloceConfig = VeloceConfig;
