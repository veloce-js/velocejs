import { JsonValidationEntry } from '../../types';
/**
@TODO if we apply the Validate after the Route definition
      it won't work - the Route received the descriptor as promise<pending>
      if it's an async method, if we use async await
      then the route setup will not able to get any routes (not resolve by that time)
      but as soon as we switch the order (Validate before  route)
      it works. This could potentially lead to other unforseen bug
**/
export declare function Validate(options?: Array<JsonValidationEntry>): (target: any, propertyName: string) => Promise<void>;
