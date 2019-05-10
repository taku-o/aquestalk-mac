# aquestalk-mac

## description
AquesTalk javascript library for Mac.

株式会社アクエストのAquesTalkライブラリを
JavaScriptから実行できるようにするMac環境用のライブラリです。
実行するにはMac環境用のAquesTalkライブラリと、
各種ライセンス、および、ライセンスキーが必要となります。

## install

```sh
npm install --save aquestalk-mac
```

### AquesTalk framework


## Flow


## Q & A
- 体験版
- 完成品
- AquesTalk1
- 必要なもの
- ファイルアクセス

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

var frameworkPath = path.join(__dirname, '../vendor/AqKanji2Koe.framework');
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
    - AquesTalk2開発ライセンス
    - AquesTalk2使用ライセンス (使用するなら)

```javascript
import {AquesTalk2} from 'aquestalk';
import * as path from 'path';

var frameworkPath = path.join(__dirname, '../vendor/AquesTalk2.framework');
var phontPath = path.join(__dirname, '../vendor/phont/aq_defo1.phont');

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

var frameworkPath = path.join(__dirname, '../vendor/AquesTalk10.framework');
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
    - AqUsrDicライブラリ
    - AquesTalkユーザー辞書ファイル (AqKanji2Koeライブラリに同梱)

#### generateUserDict
CSVファイルからユーザー辞書ファイルを生成します。

```javascript
import {AqUsrDic} from 'aquestalk';
var path = require('path');

var frameworkPath = path.join(__dirname, '../vendor/AqUsrDic.framework');
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

var frameworkPath = path.join(__dirname, '../vendor/AqUsrDic.framework');
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

var frameworkPath = path.join(__dirname, '../vendor/AqUsrDic.framework');

// validateInput
var aqUsrDic = new AqUsrDic(frameworkPath);
var surface = '大江戸線';
var yomi = 'オーエドセン';
var posCode = 5;
var r = aqUsrDic.validateInput(surface, yomi, posCode);
```

