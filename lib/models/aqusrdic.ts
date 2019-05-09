function posCodeList(): {posCode: number; kind: string}[] {
  return [
    {posCode: 0, kind: '名詞'},
    {posCode: 1, kind: '名詞(サ変)'},
    {posCode: 2, kind: '人名'},
    {posCode: 3, kind: '人名(姓)'},
    {posCode: 4, kind: '人名(名)'},
    {posCode: 5, kind: '固有名詞'},
    {posCode: 6, kind: '固有名詞(組織)'},
    {posCode: 7, kind: '固有名詞(地域)'},
    {posCode: 8, kind: '固有名詞(国)'},
    {posCode: 9, kind: '代名詞'},
    {posCode: 10, kind: '代名詞(縮約)'},
    {posCode: 11, kind: '名詞(副詞可能)'},
    {posCode: 12, kind: '名詞(接続詞的)'},
    {posCode: 13, kind: '名詞(形容動詞語幹)'},
    {posCode: 14, kind: '名詞(ナイ形容詞語幹)'},
    {posCode: 15, kind: '形容詞'},
    {posCode: 16, kind: '副詞'},
    {posCode: 17, kind: '副詞(助詞類接続)'},
    {posCode: 18, kind: '接頭詞(名詞接続)'},
    {posCode: 19, kind: '接頭詞(動詞接続)'},
    {posCode: 20, kind: '接頭詞(数接続)'},
    {posCode: 21, kind: '接頭詞(形容詞接続)'},
    {posCode: 22, kind: '接続詞'},
    {posCode: 23, kind: '連体詞'},
    {posCode: 24, kind: '記号'},
    {posCode: 25, kind: '記号(アルファベット)'},
    {posCode: 26, kind: '感動詞'},
    {posCode: 27, kind: '間投詞'},
  ];
}

function posCodeHash(): {[posCode: number]: string} {
  return {
    0: '名詞',
    1: '名詞(サ変)',
    2: '人名',
    3: '人名(姓)',
    4: '人名(名)',
    5: '固有名詞',
    6: '固有名詞(組織)',
    7: '固有名詞(地域)',
    8: '固有名詞(国)',
    9: '代名詞',
    10: '代名詞(縮約)',
    11: '名詞(副詞可能)',
    12: '名詞(接続詞的)',
    13: '名詞(形容動詞語幹)',
    14: '名詞(ナイ形容詞語幹)',
    15: '形容詞',
    16: '副詞',
    17: '副詞(助詞類接続)',
    18: '接頭詞(名詞接続)',
    19: '接頭詞(動詞接続)',
    20: '接頭詞(数接続)',
    21: '接頭詞(形容詞接続)',
    22: '接続詞',
    23: '連体詞',
    24: '記号',
    25: '記号(アルファベット)',
    26: '感動詞',
    27: '間投詞',
  };
}
