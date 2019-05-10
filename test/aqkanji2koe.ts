import {assert} from 'chai';
import {AqKanji2Koe} from '../aquestalk';
var path = require('path');

require('source-map-support').install();

var aqKanji2KoeFrameworkPath = path.join(__dirname, '../vendor/AqKanji2Koe.framework');
var aqKanji2KoeDictPath = path.join(__dirname, './vendor/aq_dic_large');
var aqKanji2KoeDevKey = 'xxx-xxx-xxx-xxx';

describe('convert', () => {
  it('should failed to convert jp kanji, because devKey is not set.', (cb) => {
    const frameworkPath = aqKanji2KoeFrameworkPath;
    const aqDictPath = aqKanji2KoeDictPath;
    const aqKanji2Koe = new AqKanji2Koe(frameworkPath, aqDictPath);
    const kanji = 'test';
    try {
      const encoded = aqKanji2Koe.convert(kanji);
      cb(new Error('AqKanji2Koe.convert result is wronglly success, without devKey.'));
    } catch (err) {
      assert.ok(true);
      cb();
    }
  });
});

describe('devKey', () => {
  it('should do nothing, at setting devKey', (cb) => {
    const frameworkPath = aqKanji2KoeFrameworkPath;
    const aqDictPath = aqKanji2KoeDictPath;
    const aqKanji2Koe = new AqKanji2Koe(frameworkPath, aqDictPath);
    const devKey = aqKanji2KoeDevKey;
    aqKanji2Koe.setDevKey(devKey);
    assert.ok(true);
    cb();
  });

  it('should throw error, if setDevKey will be called multiple times.', (cb) => {
    const frameworkPath = aqKanji2KoeFrameworkPath;
    const aqDictPath = aqKanji2KoeDictPath;
    const aqKanji2Koe = new AqKanji2Koe(frameworkPath, aqDictPath);
    const devKey = aqKanji2KoeDevKey;
    aqKanji2Koe.setDevKey(devKey);

    try {
      aqKanji2Koe.setDevKey(devKey);
      cb(new Error('AqKanji2Koe.setDevKey do not throw Error, devKey is already set.'));
    } catch (err) {
      assert.ok(true);
      cb();
    }
  });
});
