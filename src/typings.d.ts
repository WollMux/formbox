// tslint:disable:no-namespace no-shadowed-variable

/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare var OSF;

declare module 'expressions-js' {
  let globals: any;
  function parse(expr: string, globals: any, formatters?: any, ...args): FunctionConstructor;
  function parseSetter(expr: string, globals: any, formatters?: any, ...args): FunctionConstructor;
}
