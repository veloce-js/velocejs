/** This should be generic that could apply to different Decorator init */
export declare function Rest<T extends {
    new (...args: any[]): {};
}>(constructor: T): {
    new (...args: any[]): {};
} & T;
