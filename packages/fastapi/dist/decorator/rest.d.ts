/**
  We change the thinking about how to init the server
  before it was using the Prepare method that needs to call super.run
  which is ugly

  Here we will try to apply the Decorator at the Class level
  and see if we could do it with just init the new class and everything should run
*/
import type { AnyTypeArr } from '../types';
/** This should be generic that could apply to different Decorator init */
/** if we follow what the type hint said, the this object becomes useless */
export declare function Rest<T extends {
    new (...args: AnyTypeArr): {};
}>(constructor: T): {
    new (...args: AnyTypeArr): {};
} & T;
