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

declare namespace aquestalk {
  export interface WaveOptions {
    bas: number;
    spd: number;
    vol: number;
    pit: number;
    acc: number;
    lmd: number;
    fsc: number;
  }

  export class AqKanji2Koe {
    constructor(frameworkPath: string, aqDictPath: string);
    isDevKeySet(): boolean;
    setDevKey(key: string): void;
    convert(kanji: string): string;
  }

  export class AquesTalk10 {
    constructor(frameworkPath: string);
    isDevKeySet(): boolean;
    setDevKey(key: string): void;
    isUsrKeySet(): boolean;
    setUsrKey(key: string): void;
    wave(encoded: string, options: WaveOptions): Promise<Buffer>;
  }

  export class AquesTalk2 {
    constructor(frameworkPath: string);
    wave(encoded: string, phontPath: string, speed: number): Promise<Buffer>;
  }

  export class AqUsrDic {
    constructor(frameworkPath: string);
    generateUserDict(inCsvPath: string, outUserDicPath: string): boolean;
    generateCSV(inUserDicPath: string, outCsvPath: string): boolean;
    validateInput(surface: string, yomi: string, posCode: number): boolean;
  }
}
