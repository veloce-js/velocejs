"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// example from https://dev-tips.com/typescript/ensuring-reliable-typings-using-typescripts-type-guards#:~:text=To%20allow%20such%20type%20detection%2Fvalidation%2C%20TypeScript%20uses%20type,a%20certain%20type%20for%20a%20certain%20scope.%20typeof
/*
type Post = {
  id: number;
  title: string;
  text: string;
};

const isValidPost = (input: unknown): input is Post => {
  return (
    typeof input === 'object' &&
    input !== null &&
    Object.prototype.hasOwnProperty.call(input, 'id') &&
    Object.prototype.hasOwnProperty.call(input, 'title') &&
    Object.prototype.hasOwnProperty.call(input, 'text')
  );
};
*/
