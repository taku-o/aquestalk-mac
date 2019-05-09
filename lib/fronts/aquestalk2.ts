var _fs: any, fs   = () => { _fs = _fs || require('fs'); return _fs; };
var _ref: any, ref = () => { _ref = _ref || require('ref'); return _ref; };

// AquesTalk2
class AquesTalk2 {
  private aquesTalk2Lib: AquesTalk2Lib;
  constructor(
    private frameworkPath: string
  ) {
    this.aquesTalk2Lib = new AquesTalk2Lib(frameworkPath);
  }

  wave(encoded: string, phontPath: string, speed: number): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      if (!encoded) {
        return reject(new Error('invalid parameter, encoded is empty.'));
      }

      fs().readFile(phontPath, (err: Error, phontData: Buffer) => {
        if (err) {
          return reject(new Error(`failed to read phontPath, ${err.message}`));
        }

        const allocInt = ref().alloc('int');
        const r = this.aquesTalk2Lib.synthe(encoded, speed, allocInt, phontData);
        if (ref().isNull(r)) {
          const errorCode = allocInt.deref();
          return reject(new Error(this.aquesTalk2Lib.errorTable(errorCode)));
        }

        const bufWav = ref().reinterpret(r, allocInt.deref(), 0);
        const managedBuf = Buffer.from(bufWav); // copy bufWav to managed buffer
        this.aquesTalk2Lib.freeWave(r);
        resolve(managedBuf);
      });
    });
  }
}

