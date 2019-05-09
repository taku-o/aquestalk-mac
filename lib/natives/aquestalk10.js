"use strict";
var ffi = require('ffi');
var ref = require('ref');
var StructType = require('ref-struct');
class AquesTalk10Lib {
    constructor(frameworkPath) {
        const ptr_int = ref.refType(ref.types.int);
        const ptr_uchar = ref.refType(ref.types.uchar);
        this.AQTK_VOICE = StructType({
            bas: ref.types.int,
            spd: ref.types.int,
            vol: ref.types.int,
            pit: ref.types.int,
            acc: ref.types.int,
            lmd: ref.types.int,
            fsc: ref.types.int,
        });
        const ptr_AQTK_VOICE = ref.refType(this.AQTK_VOICE);
        const ptr_AquesTalk10_Synthe_Utf8 = ffi
            .DynamicLibrary(frameworkPath)
            .get('AquesTalk_Synthe_Utf8');
        const ptr_AquesTalk10_FreeWave = ffi
            .DynamicLibrary(frameworkPath)
            .get('AquesTalk_FreeWave');
        const ptr_AquesTalk10_SetDevKey = ffi
            .DynamicLibrary(frameworkPath)
            .get('AquesTalk_SetDevKey');
        const ptr_AquesTalk10_SetUsrKey = ffi
            .DynamicLibrary(frameworkPath)
            .get('AquesTalk_SetUsrKey');
        this.fn_AquesTalk10_Synthe_Utf8 = ffi.ForeignFunction(ptr_AquesTalk10_Synthe_Utf8, ptr_uchar, [
            ptr_AQTK_VOICE,
            'string',
            ptr_int,
        ]);
        this.fn_AquesTalk10_FreeWave = ffi.ForeignFunction(ptr_AquesTalk10_FreeWave, 'void', [ptr_uchar]);
        this.fn_AquesTalk10_SetDevKey = ffi.ForeignFunction(ptr_AquesTalk10_SetDevKey, 'int', ['string']);
        this.fn_AquesTalk10_SetUsrKey = ffi.ForeignFunction(ptr_AquesTalk10_SetUsrKey, 'int', ['string']);
    }
    synthe(pParam, koe, size) {
        return this.fn_AquesTalk10_Synthe_Utf8(pParam, koe, size);
    }
    freeWave(wav) {
        this.fn_AquesTalk10_FreeWave(wav);
    }
    setDevKey(key) {
        return this.fn_AquesTalk10_SetDevKey(key);
    }
    setUsrKey(key) {
        return this.fn_AquesTalk10_SetUsrKey(key);
    }
    errorTable(code) {
        if (code == 100) {
            return 'その他のエラー';
        }
        if (code == 101) {
            return 'メモリ不足';
        }
        if (code == 103) {
            return '音声記号列指定エラー(語頭の長音、促音の連続など)';
        }
        if (code == 104) {
            return '音声記号列に有効な読みがない';
        }
        if (code == 105) {
            return '音声記号列に未定義の読み記号が指定された';
        }
        if (code == 106) {
            return '音声記号列のタグの指定が正しくない';
        }
        if (code == 107) {
            return 'タグの長さが制限を越えている(または[>]がみつからない)';
        }
        if (code == 108) {
            return 'タグ内の値の指定が正しくない';
        }
        if (code == 120) {
            return '音声記号列が長すぎる';
        }
        if (code == 121) {
            return '1つのフレーズ中の読み記号が多すぎる';
        }
        if (code == 122) {
            return '音声記号列が長い(内部バッファオーバー1)';
        }
        return '';
    }
}
