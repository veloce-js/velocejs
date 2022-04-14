// check primitive type as well as custom types

export interface TypeValidator<T> {
  isAcceptable(s: T): boolean
}
