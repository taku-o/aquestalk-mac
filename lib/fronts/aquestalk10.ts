
//class AquesTalk1 {
//  isSupported(): boolean;
//  play(): boolean;
//  record(): boolean;
//}

class AquesTalk2 {
  constructor(
    private frameworkPath: string
  ) {
  }

  wav(): boolean;
  play(): boolean;
  record(): boolean;
}

class AquesTalk10 {
  setDevKey(key: string): void;
  setUsrKey(key: string): void;
  play(): boolean;
  record(): boolean;
}

// AqKanji2Koe
class AqKanji2Koe {
  private _isDevKeySet: boolean = false;
  private aqKanji2KoeLib: AqKanji2KoeLib;
  constructor(
    private frameworkPath: string,
    private devKey?: string
  ) {
    this.aqKanji2KoeLib = new AqKanji2KoeLib(frameworkPath);
    if (devKey) {
      this.setDevKey(devKey);
    }
  }

  isDevKeySet(): boolean {
    return this._isDevKeySet;
  }
  setDevKey(key: string): void {
    if (this._isDevKeySet) {
      throw new Error('AqKanji2Koe devKey is already set.');
    }
    const r = this.aqKanji2KoeLib.setDevKey(key);
    if (r != 0) {
      throw new Error('AqKanji2Koe devKey is invalid key.');
    }
    this._isDevKeySet = true;
  }

  convert(kanji: string): string {
  }
}


class AqUsrDic {
  importDic(): number;
  exportDic(): number;
  check(surface: string, yomi: string, posCode: number): number;
}

