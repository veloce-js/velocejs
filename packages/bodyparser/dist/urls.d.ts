import { UwsStringPairObj } from '../index';
export declare class UrlPattern {
    private _libObj;
    private _originalUrl;
    private _transformUrl;
    constructor(basePattern: string);
    get route(): string;
    get orginal(): string;
    private _validate;
    /** parse the var from url */
    parse(url: string): any;
    /** construct a url */
    create(params: UwsStringPairObj): string;
}
