# aquestalk-mac

## description
AquesTalk javascript library for Mac.

AquesTalkライブラリをJavaScriptから実行できるようにするMac環境用のライブラリです。  
実行するにはMac環境用のAquesTalkのライブラリが必要となります。

## install

```sh
npm install --save aquestalk-mac
```

## Q & A
### Q. npm moduleの他に何が必要か？
- 必要な機能に対応するAquesTalkのライブラリと、その動作に必要なファイル群が必要。
- 最小構成として、読み上げアプリを作ると仮定した場合、
    - AqKanji2Koe で"音声記号列"に変換する
    - AquesTalk2、もしくは AquesTalk10 のどちらかで音声ファイルを作成する
        - ことになる。

### Q. AquesTalkライブラリはどこから入手できるか？
- 株式会社アクエストのサイトからダウンロードするか
- 株式会社アクエストのオンラインストアでライセンス購入時についてくる

### Q. AquesTalkのライセンスはどこから入手できるか？
- 株式会社アクエストのオンラインストアで購入する。

### Q. このライブラリは、AquesTalkの評価版でも動作するか？
- 動作する。

### Q. このライブラリを使ったアプリはあるか？
- サンプルアプリ https://github.com/taku-o/aquestalk-player-mac
- 移植元のコードを [MYukkuriVoice](https://taku-o.github.io/myukkurivoice/) というアプリで使用している。

### Q. AquesTalk1のライブラリはサポートしていない？
- まだサポートしていない。
- しかし、サポートする前に、MacでAquesTalk1が動作しなくなる見込み。

### Q. ファイルアクセスが必要？
- Q. このライブラリを使用するにはファイルアクセスが必要？
    - A. 必要
- Q. つまり、Webブラウザでは動作しない？
    - A. 基本的には動作しない
- Q. 音声をJavaScriptで再生するには、Web Audio APIか、HTML5 Audioクラスあたりが妥当？
    - A. 他のプログラムに作成した音声データを渡さないなら妥当
- Q. Web Audio APIは、Webブラウザで動作しますよね？
    - A. ･･･そうですね
- Q. このライブラリはどういう場面で使えるの？
    - A. ･･･え、Electronとか･･･

### Q. npm install時にビルドエラー発生
- Pythonの環境がおかしいかも？
- system組み込みのpythonを指定すれば、たいていビルドは成功する。

### Q. Electronに組み込んだら動作しなかった
- was compiled against a different Node.js version using NODE_MODULE_VERSION 64. This version of Node.js requires NODE_MODULE_VERSION 69. Please try re-compiling or re-installing the module
- Module version mismatch. Expected 50, got 51.
    - この種のエラーメッセージが出ているなら、electron-rebuildでビルドし直す。

```
npm install --save-dev electron
npm install --save-dev electron-rebuild
./node_modules/.bin/electron-rebuild
```

### Q. サンプルコードやテストで参照しているvendorには何が置いてある？

```
|-- vendor
    |-- AqKanji2Koe.framework
    |-- AqUsrDic.framework
    |-- AquesTalk10.framework
    |-- AquesTalk2.framework
    |-- aq_dic_large
    `-- phont
```

## Sample App
- サンプルアプリ https://github.com/taku-o/aquestalk-player-mac

## Sample Code
### AqKanji2Koe
"日本語文字列"をAquesTalkで利用可能な"音声記号列"に変換します。

- 開発、および利用には次のものが必要です。
    - AqKanji2Koeライブラリ
    - AquesTalkユーザー辞書ファイル (AqKanji2Koeライブラリに同梱)
    - AqKanji2Koe開発ライセンス
    - AqKanji2Koe開発ライセンスキー (未設定でも動作するが制限がかかる)
    - AqKanji2Koe使用ライセンス (使用するなら)

```javascript
import {AqKanji2Koe} from 'aquestalk';
import * as from 'path';

var frameworkPath = path.join(__dirname, '../vendor/AqKanji2Koe.framework/Versions/A/AqKanji2Koe');
var aqDictPath = path.join(__dirname, '../vendor/aq_dic_large');
var devKey = 'xxx-xxx-xxx-xxx';

var aqKanji2Koe = new AqKanji2Koe(frameworkPath, aqDictPath);
//aqKanji2Koe.setDevKey(devKey);

// test => テ'スト
var kanji = 'test';
var encoded = aqKanji2Koe.convert(kanji);
console.log(encoded);
```

### AquesTalk2
AquesTalk2で"音声記号列"を音声データに変換します。  
音声記号列はAqKanji2Koeで作成します。

- 開発、および利用には次のものが必要です。
    - AquesTalk2ライブラリ
    - 音声定義phontファイル (AquesTalk2ライブラリに同梱)
    - AquesTalk2開発ライセンス
    - AquesTalk2使用ライセンス (使用するなら)

```javascript
import {AquesTalk2} from 'aquestalk';
import * as path from 'path';

var frameworkPath = path.join(__dirname, '../vendor/AquesTalk2.framework/Versions/A/AquesTalk2');
var phontPath = path.join(__dirname, '../vendor/phont/aq_f1c.phont');

const aquesTalk2 = new AquesTalk2(frameworkPath);
const encoded = "テ'_スト";
const speed = 100;
aquesTalk2.wave(encoded, phontPath, speed).then((buffer) => {
  // TODO
  // use buffer
});
```

### AquesTalk10
AquesTalk10で"音声記号列"を音声データに変換します。  
音声記号列はAqKanji2Koeで作成します。

使用ライセンスキー(usrKey)は開発者所有のキーを設定するのではなく、  
アプリの利用者に入力、設定させる項目になります。

- 開発、および利用には次のものが必要です。
    - AquesTalk10ライブラリ
    - AquesTalk10開発ライセンス
    - AquesTalk10開発ライセンスキー (未設定でも動作するが制限がかかる)
    - AquesTalk10使用ライセンス (使用するなら)

```javascript
import {AquesTalk10} from 'aquestalk';
import * as path from 'path';

var frameworkPath = path.join(__dirname, '../vendor/AquesTalk10.framework/Versions/A/AquesTalk');
var devKey = 'xxx-xxx-xxx-xxx';
var usrKey = 'xxx-xxx-xxx-xxx';

var aquesTalk10 = new AquesTalk10(frameworkPath);
//aquesTalk10.setDevKey(devKey);
//aquesTalk10.setUsrKey(usrKey);

var encoded = "テ'_スト";
var options = {bas: 0, spd: 100, vol: 100, pit: 100, acc: 100, lmd: 100, fsc: 100};

aquesTalk10.wave(encoded, options).then((buffer) => {
  // TODO
  // use buffer
});
```

##### 音声の定義
AquesTalk10用の音声定義の基本セットは次の通りです。  
aq10VoiceList()を呼び出しても取得できます。

```javascript
import {aq10VoiceList} from '../aquestalk';
console.log(aq10VoiceList());

[
  {id: 'aq10_F1', name: 'F1 女声1(新ゆっくり)', bas: 0, spd: 100, vol: 100, pit: 100, acc: 100, lmd: 100, fsc: 100},
  {id: 'aq10_F2', name: 'F2 女声2', bas: 1, spd: 100, vol: 100, pit: 77, acc: 150, lmd: 100, fsc: 100},
  {id: 'aq10_F3', name: 'F3 女声3', bas: 0, spd: 80, vol: 100, pit: 100, acc: 100, lmd: 61, fsc: 148},
  {id: 'aq10_M1', name: 'M1 男声1', bas: 2, spd: 100, vol: 100, pit: 30, acc: 100, lmd: 100, fsc: 100},
  {id: 'aq10_M2', name: 'M2 男声2', bas: 2, spd: 105, vol: 100, pit: 45, acc: 130, lmd: 120, fsc: 100},
  {id: 'aq10_R1', name: 'R1 ロボット1', bas: 2, spd: 100, vol: 100, pit: 30, acc: 20, lmd: 190, fsc: 100},
  {id: 'aq10_R2', name: 'R2 ロボット2', bas: 1, spd: 70, vol: 100, pit: 50, acc: 50, lmd: 50, fsc: 180},
]
```

### AqUsrDic
ユーザー辞書を操作します。  
作成したユーザー辞書はAqKanji2Koeで利用できます。

- 開発、および利用には次のものが必要です。
    - AqUsrDicライブラリ (AqKanji2Koeライブラリに同梱)
    - AquesTalkユーザー辞書ファイル (AqKanji2Koeライブラリに同梱)
    - AqKanji2Koe開発ライセンス
    - AqKanji2Koe使用ライセンス (使用するなら)

#### generateUserDict
CSVファイルからユーザー辞書ファイルを生成します。

```javascript
import {AqUsrDic} from 'aquestalk';
var path = require('path');

var frameworkPath = path.join(__dirname, '../vendor/AqUsrDic.framework/Versions/A/AqUsrDic');
var csvTemplate = path.join(__dirname, '../vendor/aq_dic_large/aq_user.csv');
var resultDir = path.join(__dirname, '../vendor/aq_dic_large');

// generateUserDict
var aqUsrDic = new AqUsrDic(frameworkPath);
var r = aqUsrDic.generateUserDict(csvTemplate, `${resultDir}/aq_user.dic`);
```

#### generateCSV
ユーザー辞書ファイルからCSVファイルを生成します。

```javascript
import {AqUsrDic} from 'aquestalk';
var path = require('path');

var frameworkPath = path.join(__dirname, '../vendor/AqUsrDic.framework/Versions/A/AqUsrDic');
var usrDictTemplate = path.join(__dirname, '../vendor/aq_dic_large/aq_user.dic');
var resultDir = path.join(__dirname, '../vendor/aq_dic_large');

// generateCSV
var aqUsrDic = new AqUsrDic(frameworkPath);
var r = aqUsrDic.generateCSV(usrDictTemplate, `${resultDir}/aq_user.csv`);
```

#### validateInput
ユーザー辞書の定義が正しいか、入力チェックします。

```javascript
import {AqUsrDic} from '../aquestalk';
var path = require('path');
import * as fs from 'fs';

var frameworkPath = path.join(__dirname, '../vendor/AqUsrDic.framework/Versions/A/AqUsrDic');

// validateInput
var aqUsrDic = new AqUsrDic(frameworkPath);
var surface = '大江戸線';
var yomi = 'オーエドセン';
var posCode = 5;
var r = aqUsrDic.validateInput(surface, yomi, posCode);
```

##### posCode
AqUsrDicライブラリで使用するposCodeの定義は次の通りです。  
posCodeList()を呼び出しても取得できます。

```javascript
import {posCodeList} from '../aquestalk';
console.log(posCodeList());

[ { posCode: 0, kind: '名詞' },
  { posCode: 1, kind: '名詞(サ変)' },
  { posCode: 2, kind: '人名' },
  { posCode: 3, kind: '人名(姓)' },
  { posCode: 4, kind: '人名(名)' },
  { posCode: 5, kind: '固有名詞' },
  { posCode: 6, kind: '固有名詞(組織)' },
  { posCode: 7, kind: '固有名詞(地域)' },
  { posCode: 8, kind: '固有名詞(国)' },
  { posCode: 9, kind: '代名詞' },
  { posCode: 10, kind: '代名詞(縮約)' },
  { posCode: 11, kind: '名詞(副詞可能)' },
  { posCode: 12, kind: '名詞(接続詞的)' },
  { posCode: 13, kind: '名詞(形容動詞語幹)' },
  { posCode: 14, kind: '名詞(ナイ形容詞語幹)' },
  { posCode: 15, kind: '形容詞' },
  { posCode: 16, kind: '副詞' },
  { posCode: 17, kind: '副詞(助詞類接続)' },
  { posCode: 18, kind: '接頭詞(名詞接続)' },
  { posCode: 19, kind: '接頭詞(動詞接続)' },
  { posCode: 20, kind: '接頭詞(数接続)' },
  { posCode: 21, kind: '接頭詞(形容詞接続)' },
  { posCode: 22, kind: '接続詞' },
  { posCode: 23, kind: '連体詞' },
  { posCode: 24, kind: '記号' },
  { posCode: 25, kind: '記号(アルファベット)' },
  { posCode: 26, kind: '感動詞' },
  { posCode: 27, kind: '間投詞' } ]
```

