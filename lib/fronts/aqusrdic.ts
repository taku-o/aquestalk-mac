var _fs: any,
  fs = () => {
    _fs = _fs || require('fs');
    return _fs;
  };

// AqUsrDic
class AqUsrDic {
  private aqUsrDicLib: AqUsrDicLib;
  constructor(frameworkPath: string) {
    this.aqUsrDicLib = new AqUsrDicLib(frameworkPath);
  }

  generateUserDict(inCsvPath: string, outUserDicPath: string): boolean {
    try {
      fs().chmodSync(outUserDicPath, 0o644); // chmod 644 if exists
    } catch (err) {
      fs().closeSync(fs().openSync(outUserDicPath, 'a+')); // create with 644 permission.
    }
    const result = this.aqUsrDicLib.importDic(outUserDicPath, inCsvPath);
    if (result == 0) {
      return true;
    } else {
      const errorMsg = this.aqUsrDicLib.getLastError();
      throw new Error(errorMsg);
    }
  }

  generateCSV(inUserDicPath: string, outCsvPath: string): boolean {
    const result = this.aqUsrDicLib.exportDic(inUserDicPath, outCsvPath);
    if (result == 0) {
      return true;
    } else {
      const errorMsg = this.aqUsrDicLib.getLastError();
      throw new Error(errorMsg);
    }
  }

  validateInput(surface: string, yomi: string, posCode: number): boolean {
    const result = this.aqUsrDicLib.check(surface, yomi, posCode);
    if (result == 0) {
      return true;
    } else {
      const errorMsg = this.aqUsrDicLib.getLastError();
      throw new Error(errorMsg);
    }
  }
}
