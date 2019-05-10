import {AqKanji2Koe} from '../aquestalk';
var path = require('path');

var frameworkPath = path.join(__dirname, '../vendorEva/AqKanji2Koe.framework/Versions/A/AqKanji2Koe');
var aqDictPath = path.join(__dirname, '../vendorEva/aq_dic_large');
var devKey = 'xxx-xxx-xxx-xxx';

var aqKanji2Koe = new AqKanji2Koe(frameworkPath, aqDictPath);
//aqKanji2Koe.setDevKey(devKey);

var kanji = 'test';
var encoded = aqKanji2Koe.convert(kanji);

console.log(encoded);
