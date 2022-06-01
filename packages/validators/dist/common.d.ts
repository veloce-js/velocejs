/**
  when we take the plugin defintion file with the main method
  sometime it could be
  main(value) {}
  which is unusable out of it's context therefore we need to transform it
*/
export declare function transformMainFn(fnStr: string): string;
