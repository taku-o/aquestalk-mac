"use strict";
var _fs, fs = () => { _fs = _fs || require('fs'); return _fs; };
class AqUsrDic {
    constructor(frameworkPath) {
        this.aqUsrDicLib = new AqUsrDicLib(frameworkPath);
    }
    generateUserDict(inCsvPath, outUserDicPath) {
        try {
            fs().chmodSync(outUserDicPath, 0o644);
        }
        catch (err) {
            fs().closeSync(fs().openSync(outUserDicPath, 'a+'));
        }
        const result = this.aqUsrDicLib.importDic(outUserDicPath, inCsvPath);
        if (result == 0) {
            return true;
        }
        else {
            const errorMsg = this.aqUsrDicLib.getLastError();
            throw new Error(errorMsg);
        }
    }
    generateCSV(inUserDicPath, outCsvPath) {
        const result = this.aqUsrDicLib.exportDic(inUserDicPath, outCsvPath);
        if (result == 0) {
            return true;
        }
        else {
            const errorMsg = this.aqUsrDicLib.getLastError();
            throw new Error(errorMsg);
        }
    }
    validateInput(surface, yomi, posCode) {
        const result = this.aqUsrDicLib.check(surface, yomi, posCode);
        if (result == 0) {
            return true;
        }
        else {
            const errorMsg = this.aqUsrDicLib.getLastError();
            throw new Error(errorMsg);
        }
    }
}
