var ref = require('ref');
import AqKanji2KoeLib from '../natives/aqkanji2koe';

// AqKanji2Koe
class AqKanji2Koe {
  private aqKanji2KoeLib: AqKanji2KoeLib;

  constructor(frameworkPath: string, private aqDictPath: string) {
    this.aqKanji2KoeLib = new AqKanji2KoeLib(frameworkPath);
  }

  private _isDevKeySet: boolean = false;
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
    if (!kanji) {
      throw new Error('invalid parameter, no input data.');
    }

    const allocInt = ref.alloc('int');
    const aqKanji2Koe = this.aqKanji2KoeLib.create(this.aqDictPath, allocInt);
    const errorCode = allocInt.deref();
    if (errorCode != 0) {
      throw new Error(this.aqKanji2KoeLib.errorTable(errorCode));
    }

    const sourceLength = Buffer.from(kanji, 'utf8').length;
    const encodedLength = sourceLength >= 512 ? sourceLength * 4 : 512;
    const buf = Buffer.alloc(sourceLength >= 512 ? sourceLength * 4 : 512);
    const r = this.aqKanji2KoeLib.convert(aqKanji2Koe, kanji, buf, encodedLength);
    if (r != 0) {
      throw new Error(this.aqKanji2KoeLib.errorTable(r));
    }
    const encoded = ref.readCString(buf, 0);

    this.aqKanji2KoeLib.release(aqKanji2Koe);
    return encoded;
  }
}

export default AqKanji2Koe;
