import {AqKanji2Koe} from '../aquestalk';
var path = require('path');

var frameworkPath = path.join(__dirname, '../vendor/AqKanji2Koe.framework');
var aqDictPath = path.join(__dirname, '../vendor/aq_dic_large');
var devKey = 'xxx-xxx-xxx-xxx';

var aqKanji2Koe = new AqKanji2Koe(frameworkPath, aqDictPath);
aqKanji2Koe.setDevKey(devKey); // required

var kanji = 'test';
var encoded = aqKanji2Koe.convert(kanji);

console.log(encoded);