import { UwsStringPairObj } from '../index';
export declare class UrlPattern {
    private _libObj;
    private _originalUrl;
    private _transformUrl;
    names: string[];
    constructor(basePatternUrl: string);
    get route(): string;
    get orginal(): string;
    private _validate;
    /** super simple check */
    static check(url: string): boolean;
    /** parse the var from url */
    parse(url: string): any;
    /** construct a url */
    create(params: UwsStringPairObj): string;
    /** this is not great solution but ... */
    private _getNames;
}
