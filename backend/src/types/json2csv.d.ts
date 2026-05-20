declare module "json2csv" {
  export class Parser<T = unknown> {
    constructor(options?: unknown);
    parse(data: T | T[]): string;
  }
}
