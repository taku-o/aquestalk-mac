var _ffi: any,
  ffi = () => {
    _ffi = _ffi || require('ffi');
    return _ffi;
  };

// AqKanji2Koe
class AqKanji2KoeLib {
  // void * AqKanji2Koe_Create (const char *pathDic, int *pErr)
  // void AqKanji2Koe_Release (void * hAqKanji2Koe)
  // int AqKanji2Koe_Convert (void * hAqKanji2Koe, const char *kanji, char *koe, int nBufKoe)
  // int AqKanji2Koe_SetDevKey (const char *key)
  private fn_AqKanji2Koe_Create: (pathDic: string, pErr: Buffer) => Buffer;
  private fn_AqKanji2Koe_Release: (hAqKanji2Koe: Buffer) => void;
  private fn_AqKanji2Koe_Convert: (hAqKanji2Koe: Buffer, kanji: string, koe: Buffer, nBufKoe: number) => number;
  private fn_AqKanji2Koe_SetDevKey: (key: string) => number;
  constructor(frameworkPath: string) {
    const ptr_void = ref().refType(ref().types.void);
    const ptr_int = ref().refType(ref().types.int);
    const ptr_char = ref().refType(ref().types.char);

    const ptr_AqKanji2Koe_Create = ffi()
      .DynamicLibrary(frameworkPath)
      .get('AqKanji2Koe_Create');
    const ptr_AqKanji2Koe_Release = ffi()
      .DynamicLibrary(frameworkPath)
      .get('AqKanji2Koe_Release');
    const ptr_AqKanji2Koe_Convert = ffi()
      .DynamicLibrary(frameworkPath)
      .get('AqKanji2Koe_Convert');
    const ptr_AqKanji2Koe_SetDevKey = ffi()
      .DynamicLibrary(frameworkPath)
      .get('AqKanji2Koe_SetDevKey');
    this.fn_AqKanji2Koe_Create = ffi().ForeignFunction(ptr_AqKanji2Koe_Create, ptr_void, ['string', ptr_int]);
    this.fn_AqKanji2Koe_Release = ffi().ForeignFunction(ptr_AqKanji2Koe_Release, 'void', [ptr_void]);
    this.fn_AqKanji2Koe_Convert = ffi().ForeignFunction(ptr_AqKanji2Koe_Convert, 'int', [
      ptr_void,
      'string',
      ptr_char,
      'int',
    ]);
    this.fn_AqKanji2Koe_SetDevKey = ffi().ForeignFunction(ptr_AqKanji2Koe_SetDevKey, 'int', ['string']);
  }

  create(pathDic: string, pErr: Buffer): Buffer {
    return this.fn_AqKanji2Koe_Create(pathDic, pErr);
  }
  release(hAqKanji2Koe: Buffer): void {
    this.fn_AqKanji2Koe_Release(hAqKanji2Koe);
  }
  convert(hAqKanji2Koe: Buffer, kanji: string, koe: Buffer, nBufKoe: number): number {
    return this.fn_AqKanji2Koe_Convert(hAqKanji2Koe, kanji, koe, nBufKoe);
  }
  setDevKey(key: string): number {
    return this.fn_AqKanji2Koe_SetDevKey(key);
  }

  errorTable(code: number): string {
    if (code == 101) {
      return '関数呼び出し時の引数がNULLになっている';
    }
    if (code == 104) {
      return '初期化されていない(初期化ルーチンが呼ばれていない)';
    }
    if (code == 105) {
      return '入力テキストが長すぎる';
    }
    if (code == 106) {
      return 'システム辞書データが指定されていない';
    }
    if (code == 107) {
      return '変換できない文字コードが含まれている';
    }
    if (code >= 200 && code < 300) {
      return 'システム辞書(aqdic.bin)が不正';
    }
    if (code >= 300 && code < 400) {
      return 'ユーザ辞書(aq_user.dic)が不正';
    }
    if (code == 100) {
      return 'その他のエラー';
    }
    return '';
  }
}
