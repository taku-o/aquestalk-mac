"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var ref = require('ref');
const aquestalk2_1 = require("../natives/aquestalk2");
class AquesTalk2 {
    constructor(frameworkPath) {
        this.frameworkPath = frameworkPath;
        this.aquesTalk2Lib = new aquestalk2_1.default(frameworkPath);
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
exports.default = AquesTalk2;
