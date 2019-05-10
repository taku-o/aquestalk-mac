# aquestalk-mac

## description
AquesTalk javascript library for Mac.

AquesTalkライブラリを
JavaScriptから実行できるようにするMac環境用のライブラリです。
実行するにはMac環境用のAquesTalkライブラリと、
各種ライセンスが必要となります。

## install

```sh
npm install --save aquestalk-mac
```

## Q & A
### Q. npm moduleの他に何が必要か？
- 必要な機能に対応するAquesTalkのライブラリと、その動作に必要なファイル群が必要。
- 最小構成として、読み上げアプリを作ると過程した場合、
    - AqKanji2Koe
    - AquesTal2、もしくは AquesTalk10 のどちらか
        - が必要になる。

### Q. AquesTalkライブラリはどこから入手できるか？
- 株式会社アクエストのサイトからダウンロードするか
- 株式会社アクエストのオンラインストアでライセンス購入時についてくる

### Q. AquesTalkのライセンスはどこから入手できるか？
- 株式会社アクエストのオンラインストアで購入する。

### Q. このライブラリは、AquesTalkの評価版でも動作するか？
- 動作した。
- アプリを完成させる自信がないなら、評価版で動作確認してからの購入で問題無い。

### Q. このライブラリを使ったアプリはあるか？
- ない。
- が、移植元のコードを[MYukkuriVoice](https://taku-o.github.io/myukkurivoice/)で使用している。

### Q. AquesTalk1のライブラリはサポートしていない？
- まだサポートしていない。
- しかし、サポートする前に、MacでAquesTalk1が動作しなくなる見込み。

### Q. ファイルアクセスが必要？
- Q. このライブラリを使用するにはファイルアクセスが必要？
    - A. 必要
- Q. つまり、Webブラウザでは動作しない？
    - A. 基本的には動作しない
- Q. 音声をJavaScriptで再生するには、Web Audio APIあたりが妥当？
    - A. 他のプログラムに作成した音声データを渡さないなら妥当
- Q. Web Audio APIは、Webブラウザで動作しますよね？
    - A. そうですね
- Q. このライブラリはどういう場面で使えるの？
    - A. E、Electronとか･･･

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
aquesTalk2.wave(encoded, phontPath, 100).then((buffer) => {
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

