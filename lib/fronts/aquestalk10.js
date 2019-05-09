"use strict";
var ref = require('ref');
class AquesTalk10 {
    constructor(frameworkPath) {
        this._isDevKeySet = false;
        this._isUsrKeySet = false;
        this.aquesTalk10Lib = new AquesTalk10Lib(frameworkPath);
    }
    isDevKeySet() {
        return this._isDevKeySet;
    }
    setDevKey(key) {
        if (this._isDevKeySet) {
            throw new Error('AquesTalk10 devKey is already set.');
        }
        const r = this.aquesTalk10Lib.setDevKey(key);
        if (r != 0) {
            throw new Error('AquesTalk10 devKey is invalid key.');
        }
        this._isDevKeySet = true;
    }
    isUsrKeySet() {
        return this._isUsrKeySet;
    }
    setUsrKey(key) {
        if (this._isUsrKeySet) {
            throw new Error('AquesTalk10 devKey is already set.');
        }
        const r = this.aquesTalk10Lib.setUsrKey(key);
        if (r != 0) {
            throw new Error('AquesTalk10 devKey is invalid key.');
        }
        this._isUsrKeySet = true;
    }
    wave(encoded, options) {
        return new Promise((resolve, reject) => {
            if (!encoded) {
                return reject(new Error('invalid parameter, encoded is empty.'));
            }
            const aqtkVoiceVal = new this.aquesTalk10Lib.AQTK_VOICE();
            aqtkVoiceVal.bas = options.bas;
            aqtkVoiceVal.spd = options.spd;
            aqtkVoiceVal.vol = options.vol;
            aqtkVoiceVal.pit = options.pit;
            aqtkVoiceVal.acc = options.acc;
            aqtkVoiceVal.lmd = options.lmd;
            aqtkVoiceVal.fsc = options.fsc;
            const ptr_aqtkVoiceVal = aqtkVoiceVal.ref();
            const allocInt = ref.alloc('int');
            const r = this.aquesTalk10Lib.synthe(ptr_aqtkVoiceVal, encoded, allocInt);
            if (ref.isNull(r)) {
                const errorCode = allocInt.deref();
                return reject(new Error(this.aquesTalk10Lib.errorTable(errorCode)));
            }
            const bufWav = ref.reinterpret(r, allocInt.deref(), 0);
            const managedBuf = Buffer.from(bufWav);
            this.aquesTalk10Lib.freeWave(r);
            resolve(managedBuf);
        });
    }
}
