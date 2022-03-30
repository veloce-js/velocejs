// decorators for FastRestApi

/*
the idea is to create your Fast REST API, sub-class the FastRestApi
then in each of the handler method decorate it with the decorator you want
something like

export class MyAPI extends FastRestApi {

  @GET('/*')
  defaultHandler(res, req) {
    res.end(`Hello world`)
  }
}

What the decorator is doing is, to put each of the handler into their specific group

another type of decorator is the parameter decorator that allow validation

`any`, `get`, `post`, `put`, `options` ,`del`, `patch`, `head`, `connect`, `trace`

*/

// methods decorator
// they are all pretty similar so we set on up and the rest are just alias
// so this is a factory method that create another factory method :)
/*
const baseDecorator = (type: string): any => {

  return () => {

    return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {

    }
  }
}



export const validateRoutes = (availableRoutes: Array<string>) => {

  function print(target: Object, propertyKey: string, parameterIndex: number) {
    console.log(`Decorating param ${parameterIndex} from ${propertyKey}`);
  }

  return (target: any, memberName: string) => {
    let currentValue: any = target[memberName]

    Object.defineProperty(target, memberName, {
      set: (newValue: any) => {
        if (!availableRoutes.includes(newValue)) {

          return
        }
        currentValue = newValue
      },
      get: () => currentValue
    })
  }
}
*/
