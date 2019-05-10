"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var ffi = require('ffi');
class AqUsrDicLib {
    constructor(frameworkPath) {
        const frameworkExePath = path.join(frameworkPath, 'Versions/A/AqUsrDic');
        const ptr_AqUsrDic_Import = ffi.DynamicLibrary(frameworkExePath).get('AqUsrDic_Import');
        const ptr_AqUsrDic_Export = ffi.DynamicLibrary(frameworkExePath).get('AqUsrDic_Export');
        const ptr_AqUsrDic_Check = ffi.DynamicLibrary(frameworkExePath).get('AqUsrDic_Check');
        const ptr_AqUsrDic_GetLastError = ffi.DynamicLibrary(frameworkExePath).get('AqUsrDic_GetLastError');
        this.fn_AqUsrDic_Import = ffi.ForeignFunction(ptr_AqUsrDic_Import, 'int', ['string', 'string']);
        this.fn_AqUsrDic_Export = ffi.ForeignFunction(ptr_AqUsrDic_Export, 'int', ['string', 'string']);
        this.fn_AqUsrDic_Check = ffi.ForeignFunction(ptr_AqUsrDic_Check, 'int', ['string', 'string', 'int']);
        this.fn_AqUsrDic_GetLastError = ffi.ForeignFunction(ptr_AqUsrDic_GetLastError, 'string', []);
    }
    importDic(pathUserDic, pathDicCsv) {
        return this.fn_AqUsrDic_Import(pathUserDic, pathDicCsv);
    }
    exportDic(pathUserDic, pathDicCsv) {
        return this.fn_AqUsrDic_Export(pathUserDic, pathDicCsv);
    }
    check(surface, yomi, posCode) {
        return this.fn_AqUsrDic_Check(surface, yomi, posCode);
    }
    getLastError() {
        return this.fn_AqUsrDic_GetLastError();
    }
}
exports.default = AqUsrDicLib;
