"use strict";
var fs = require('fs');
var ref = require('ref');
class AquesTalk2 {
    constructor(frameworkPath) {
        this.frameworkPath = frameworkPath;
        this.aquesTalk2Lib = new AquesTalk2Lib(frameworkPath);
    }
    wave(encoded, phontPath, speed) {
        return new Promise((resolve, reject) => {
            if (!encoded) {
                return reject(new Error('invalid parameter, encoded is empty.'));
            }
            fs.readFile(phontPath, (err, phontData) => {
                if (err) {
                    return reject(new Error(`failed to read phontPath, ${err.message}`));
                }
                const allocInt = ref.alloc('int');
                const r = this.aquesTalk2Lib.synthe(encoded, speed, allocInt, phontData);
                if (ref.isNull(r)) {
                    const errorCode = allocInt.deref();
                    return reject(new Error(this.aquesTalk2Lib.errorTable(errorCode)));
                }
                const bufWav = ref.reinterpret(r, allocInt.deref(), 0);
                const managedBuf = Buffer.from(bufWav);
                this.aquesTalk2Lib.freeWave(r);
                resolve(managedBuf);
            });
        });
    }
}
