var _ffi: any, ffi               = () => { _ffi = _ffi || require('ffi'); return _ffi; };
var _ref: any, ref               = () => { _ref = _ref || require('ref'); return _ref; };
var _StructType: any, StructType = () => { _StructType = _StructType || require('ref-struct'); return _StructType; };

// AquesTalk10
class AquesTalk10Lib {
  // unsigned char * AquesTalk_Synthe_Utf8(const AQTK_VOICE *pParam, const char *koe, int *size)
  // void AquesTalk_FreeWave(unsigned char *wav)
  // int AquesTalk_SetDevKey(const char *key)
  // int AquesTalk_SetUsrKey(const char *key)
  private fn_AquesTalk10_Synthe_Utf8: (pParam: Buffer, koe: string, size: Buffer) => Buffer;
  private fn_AquesTalk10_FreeWave: (wav: Buffer) => void;
  private fn_AquesTalk10_SetDevKey: (key: string) => number;
  private fn_AquesTalk10_SetUsrKey: (key: string) => number;
  public AQTK_VOICE: refStruct.StructType;
  constructor(
    frameworkPath: string
  ) {
    const ptr_int   = ref().refType(ref().types.int);
    const ptr_uchar = ref().refType(ref().types.uchar);

    this.AQTK_VOICE = StructType()({
      bas: ref().types.int,
      spd: ref().types.int,
      vol: ref().types.int,
      pit: ref().types.int,
      acc: ref().types.int,
      lmd: ref().types.int,
      fsc: ref().types.int,
    });
    const ptr_AQTK_VOICE = ref().refType(this.AQTK_VOICE);

    const ptr_AquesTalk10_Synthe_Utf8 = ffi().DynamicLibrary(frameworkPath).get('AquesTalk_Synthe_Utf8');
    const ptr_AquesTalk10_FreeWave    = ffi().DynamicLibrary(frameworkPath).get('AquesTalk_FreeWave');
    const ptr_AquesTalk10_SetDevKey   = ffi().DynamicLibrary(frameworkPath).get('AquesTalk_SetDevKey');
    const ptr_AquesTalk10_SetUsrKey   = ffi().DynamicLibrary(frameworkPath).get('AquesTalk_SetUsrKey');
    this.fn_AquesTalk10_Synthe_Utf8  = ffi().ForeignFunction(ptr_AquesTalk10_Synthe_Utf8, ptr_uchar, [ptr_AQTK_VOICE, 'string', ptr_int]);
    this.fn_AquesTalk10_FreeWave     = ffi().ForeignFunction(ptr_AquesTalk10_FreeWave, 'void', [ptr_uchar]);
    this.fn_AquesTalk10_SetDevKey    = ffi().ForeignFunction(ptr_AquesTalk10_SetDevKey, 'int', ['string']);
    this.fn_AquesTalk10_SetUsrKey    = ffi().ForeignFunction(ptr_AquesTalk10_SetUsrKey, 'int', ['string']);
  }

  synthe(pParam: Buffer, koe: string, size: Buffer): Buffer {
    return this.fn_AquesTalk10_Synthe_Utf8(pParam, koe, size);
  }
  freeWave(wav: Buffer): void {
    this.fn_AquesTalk10_FreeWave(wav);
  }
  setDevKey(key: string): number {
    return this.fn_AquesTalk10_SetDevKey(key);
  }
  setUsrKey(key: string): number {
    return this.fn_AquesTalk10_SetUsrKey(key);
  }

  errorTable(code: number): string {
    if (code == 100) { return 'その他のエラー'; }
    if (code == 101) { return 'メモリ不足'; }
    if (code == 103) { return '音声記号列指定エラー(語頭の長音、促音の連続など)'; }
    if (code == 104) { return '音声記号列に有効な読みがない'; }
    if (code == 105) { return '音声記号列に未定義の読み記号が指定された'; }
    if (code == 106) { return '音声記号列のタグの指定が正しくない'; }
    if (code == 107) { return 'タグの長さが制限を越えている(または[>]がみつからない)'; }
    if (code == 108) { return 'タグ内の値の指定が正しくない'; }
    if (code == 120) { return '音声記号列が長すぎる'; }
    if (code == 121) { return '1つのフレーズ中の読み記号が多すぎる'; }
    if (code == 122) { return '音声記号列が長い(内部バッファオーバー1)'; }
    return '';
  }
}

