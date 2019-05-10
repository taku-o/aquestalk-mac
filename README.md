# aquestalk-mac

## description
AquesTalk javascript library for Mac.

## install

```sh
npm install --save aquestalk-mac
```

## library
### AqKanji2Koe

```javascript
import {AqKanji2Koe} from 'aquestalk';

var aqKanji2Koe = new AqKanji2Koe(frameworkPath, aqDictPath);
aqKanji2Koe.setDevKey(devKey);

# kanji
# encoded
var encoded = aqKanji2Koe.convert(kanji);
```



