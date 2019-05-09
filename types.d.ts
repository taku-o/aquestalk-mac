// ref
declare namespace ref {
  export interface Type {
    size: number;
    indirection: number;
    get(buffer: Buffer, offset: number): any;
    set(buffer: Buffer, offset: number, value: any): void;
    name?: string;
    alignment?: number;
  }
}
// ref-struct
declare namespace refStruct {
  interface StructType {
    new (arg: Buffer, data?: {}): any;
    new (data?: {}): any;
    (arg: Buffer, data?: {}): any;
    (data?: {}): any;
    fields: {[key: string]: {type: ref.Type}};
    defineProperty(name: string, type: ref.Type): void;
    defineProperty(name: string, type: string): void;
    toString(): string;
  }
}

interface WaveOptions {
  bas: number;
  spd: number;
  vol: number;
  pit: number;
  acc: number;
  lmd: number;
  fsc: number;
}
