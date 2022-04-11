export declare function Rest<T extends {
    new (...args: any[]): {};
}>(constructor: T): {
    new (...args: any[]): {};
} & T;
