var ref = require('ref');
import AquesTalk10Lib from '../natives/aquestalk10';

// AquesTalk10
class AquesTalk10 {
  private aquesTalk10Lib: AquesTalk10Lib;
  constructor(frameworkPath: string) {
    this.aquesTalk10Lib = new AquesTalk10Lib(frameworkPath);
  }

  private _isDevKeySet: boolean = false;
  isDevKeySet(): boolean {
    return this._isDevKeySet;
  }
  setDevKey(key: string): void {
    if (this._isDevKeySet) {
      throw new Error('AquesTalk10 devKey is already set.');
    }
    const r = this.aquesTalk10Lib.setDevKey(key);
    if (r != 0) {
      throw new Error('AquesTalk10 devKey is invalid key.');
    }
    this._isDevKeySet = true;
  }

  private _isUsrKeySet: boolean = false;
  isUsrKeySet(): boolean {
    return this._isUsrKeySet;
  }
  setUsrKey(key: string): void {
    if (this._isUsrKeySet) {
      throw new Error('AquesTalk10 devKey is already set.');
    }
    const r = this.aquesTalk10Lib.setUsrKey(key);
    if (r != 0) {
      throw new Error('AquesTalk10 devKey is invalid key.');
    }
    this._isUsrKeySet = true;
  }

  wave(encoded: string, options: WaveOptions): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      if (!encoded) {
        return reject(new Error('invalid parameter, encoded is empty.'));
      }
      if (!this._isDevKeySet) {
        throw new Error('invalid status, AquesTalk10 devKey is not set.');
      }

      // create struct
      const aqtkVoiceVal = new this.aquesTalk10Lib.AQTK_VOICE();
      aqtkVoiceVal.bas = options.bas;
      aqtkVoiceVal.spd = options.spd;
      aqtkVoiceVal.vol = options.vol;
      aqtkVoiceVal.pit = options.pit;
      aqtkVoiceVal.acc = options.acc;
      aqtkVoiceVal.lmd = options.lmd;
      aqtkVoiceVal.fsc = options.fsc;
      const ptr_aqtkVoiceVal = aqtkVoiceVal.ref();

      // create wave buffer
      const allocInt = ref.alloc('int');
      const r = this.aquesTalk10Lib.synthe(ptr_aqtkVoiceVal, encoded, allocInt);
      if (ref.isNull(r)) {
        const errorCode = allocInt.deref();
        return reject(new Error(this.aquesTalk10Lib.errorTable(errorCode)));
      }

      const bufWav = ref.reinterpret(r, allocInt.deref(), 0);
      const managedBuf = Buffer.from(bufWav); // copy bufWav to managed buffer
      this.aquesTalk10Lib.freeWave(r);
      resolve(managedBuf);
    });
  }
}

export default AquesTalk10;
