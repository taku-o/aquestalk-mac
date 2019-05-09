var _ffi: any, ffi = () => { _ffi = _ffi || require('ffi'); return _ffi; };

// AqUsrDic
class AqUsrDicLib {
  // int AqUsrDic_Import(const char * pathUserDic, const char * pathDicCsv)
  // int AqUsrDic_Export(const char * pathUserDic, const char * pathDicCsv)
  // int AqUsrDic_Check(const char * surface, const char * yomi, int posCode)
  // const char * AqUsrDic_GetLastError()
  private fn_AqUsrDic_Import: (pathUserDic: string, pathDicCsv: string) => number;
  private fn_AqUsrDic_Export: (pathUserDic: string, pathDicCsv: string) => number;
  private fn_AqUsrDic_Check: (surface: string, yomi: string, posCode: number) => number;
  private fn_AqUsrDic_GetLastError: () => string;
  constructor(
    frameworkPath: string
  ) {
    const ptr_AqUsrDic_Import       = ffi().DynamicLibrary(frameworkPath).get('AqUsrDic_Import');
    const ptr_AqUsrDic_Export       = ffi().DynamicLibrary(frameworkPath).get('AqUsrDic_Export');
    const ptr_AqUsrDic_Check        = ffi().DynamicLibrary(frameworkPath).get('AqUsrDic_Check');
    const ptr_AqUsrDic_GetLastError = ffi().DynamicLibrary(frameworkPath).get('AqUsrDic_GetLastError');
    this.fn_AqUsrDic_Import         = ffi().ForeignFunction(ptr_AqUsrDic_Import, 'int', ['string', 'string']);
    this.fn_AqUsrDic_Export         = ffi().ForeignFunction(ptr_AqUsrDic_Export, 'int', ['string', 'string']);
    this.fn_AqUsrDic_Check          = ffi().ForeignFunction(ptr_AqUsrDic_Check, 'int', ['string', 'string', 'int']);
    this.fn_AqUsrDic_GetLastError   = ffi().ForeignFunction(ptr_AqUsrDic_GetLastError, 'string', []);
  }

  importDic(pathUserDic: string, pathDicCsv: string): number {
    return this.fn_AqUsrDic_Import(pathUserDic, pathDicCsv);
  }
  exportDic(pathUserDic: string, pathDicCsv: string): number {
    return this.fn_AqUsrDic_Export(pathUserDic, pathDicCsv);
  }
  check(surface: string, yomi: string, posCode: number): number {
    return this.fn_AqUsrDic_Check(surface, yomi, posCode);
  }
  getLastError(): string {
    return this.fn_AqUsrDic_GetLastError();
  }
}

