export interface TypeValidator<T> {
    isAcceptable(s: T): boolean;
}
export declare class LettersRegexpOnlyValidation implements TypeValidator<string> {
    isAcceptable(s: string): boolean;
}
export declare class NumericOnlyValidation implements TypeValidator<number> {
    isAcceptable(s: unknown): boolean;
}
