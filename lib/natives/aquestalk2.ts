var path = require('path');
var ffi = require('ffi');
var ref = require('ref');

class AquesTalk2Lib {
  // unsigned char * AquesTalk2_Synthe_Utf8(const char *koe, int iSpeed, int * size, void *phontDat)
  // void AquesTalk2_FreeWave (unsigned char *wav)
  private fn_AquesTalk2_Synthe_Utf8: (koe: string, iSpeed: number, size: Buffer, phontDat: Buffer) => Buffer;
  private fn_AquesTalk2_FreeWave: (wav: Buffer) => void;
  constructor(frameworkPath: string) {
    const ptr_void = ref.refType(ref.types.void);
    const ptr_int = ref.refType(ref.types.int);
    const ptr_uchar = ref.refType(ref.types.uchar);

    const frameworkExePath = path.join(frameworkPath, 'Versions/A/AquesTalk2');
    const ptr_AquesTalk2_Synthe_Utf8 = ffi.DynamicLibrary(frameworkExePath).get('AquesTalk2_Synthe_Utf8');
    const ptr_AquesTalk2_FreeWave = ffi.DynamicLibrary(frameworkExePath).get('AquesTalk2_FreeWave');
    this.fn_AquesTalk2_Synthe_Utf8 = ffi.ForeignFunction(ptr_AquesTalk2_Synthe_Utf8, ptr_uchar, ['string', 'int', ptr_int, ptr_void]);
    this.fn_AquesTalk2_FreeWave = ffi.ForeignFunction(ptr_AquesTalk2_FreeWave, 'void', [ptr_uchar]);
  }

  synthe(koe: string, iSpeed: number, size: Buffer, phontDat: Buffer): Buffer {
    return this.fn_AquesTalk2_Synthe_Utf8(koe, iSpeed, size, phontDat);
  }
  freeWave(wav: Buffer): void {
    return this.fn_AquesTalk2_FreeWave(wav);
  }

  errorTable(code: number): string {
    if (code == 100) {
      return 'その他のエラー';
    }
    if (code == 101) {
      return 'メモリ不足';
    }
    if (code == 102) {
      return '音記号列に未定義の読み記号が指定された';
    }
    if (code == 103) {
      return '韻律データの時間長がマイナスなっている';
    }
    if (code == 104) {
      return '内部エラー(未定義の区切りコード検出)';
    }
    if (code == 105) {
      return '音記号列に未定義の読み記号が指定された';
    }
    if (code == 106) {
      return '音記号列のタグの指定が正しくない';
    }
    if (code == 107) {
      return 'タグの長さが制限を越えている(または[>]がみつからない)';
    }
    if (code == 108) {
      return 'タグ内の値の指定が正しくない';
    }
    if (code == 109) {
      return 'WAVE再生ができない(サウンドドライバ関連の問題)';
    }
    if (code == 110) {
      return 'WAVE再生ができない(サウンドドライバ関連の問題 非同期再生)';
    }
    if (code == 111) {
      return '発すべきデータがない';
    }
    if (code == 200) {
      return '音記号列が長すぎる';
    }
    if (code == 201) {
      return '1つのフレーズ中の読み記号が多すぎる';
    }
    if (code == 202) {
      return '音記号列が長い(内部バッファオーバー1)';
    }
    if (code == 203) {
      return 'ヒープメモリ不足';
    }
    if (code == 204) {
      return '音記号列が長い(内部バッファオーバー1)';
    }
    if (code == 205) {
      return 'ライセンスキーが正しくない。または、設定されていない。';
    }
    if (code >= 1000 && code <= 1008) {
      return 'Phontデータが正しくない';
    }
    return '';
  }
}

export default AquesTalk2Lib;
