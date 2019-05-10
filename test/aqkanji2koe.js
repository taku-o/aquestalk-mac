"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const aquestalk_1 = require("../aquestalk");
var path = require('path');
require('source-map-support').install();
var aqKanji2KoeFrameworkPath = path.join(__dirname, '../vendor/AqKanji2Koe.framework');
var aqKanji2KoeDictPath = path.join(__dirname, '../vendor/aq_dic_large');
var aqKanji2KoeDevKey = 'xxx-xxx-xxx-xxx';
describe('convert', () => {
    it('should failed to convert jp kanji, because devKey is not set.', () => {
        const frameworkPath = aqKanji2KoeFrameworkPath;
        const aqDictPath = aqKanji2KoeDictPath;
        const aqKanji2Koe = new aquestalk_1.AqKanji2Koe(frameworkPath, aqDictPath);
        const kanji = 'test';
        try {
            const _void_encoded = aqKanji2Koe.convert(kanji);
            throw new Error('AqKanji2Koe.convert result is wronglly success, without devKey.');
        }
        catch (err) {
            chai_1.assert.ok(true);
        }
    });
    it('should convert jp kanji', () => {
        if (aqKanji2KoeDevKey == 'xxx-xxx-xxx-xxx') {
            return;
        }
        const frameworkPath = aqKanji2KoeFrameworkPath;
        const aqDictPath = aqKanji2KoeDictPath;
        const aqKanji2Koe = new aquestalk_1.AqKanji2Koe(frameworkPath, aqDictPath);
        const devKey = aqKanji2KoeDevKey;
        aqKanji2Koe.setDevKey(devKey);
        const kanji = 'test';
        const encoded = aqKanji2Koe.convert(kanji);
        chai_1.assert.equal("テ'_スト", encoded);
    });
});
describe('devKey', () => {
    it('should do nothing, at setting devKey', () => {
        if (aqKanji2KoeDevKey == 'xxx-xxx-xxx-xxx') {
            return;
        }
        const frameworkPath = aqKanji2KoeFrameworkPath;
        const aqDictPath = aqKanji2KoeDictPath;
        const aqKanji2Koe = new aquestalk_1.AqKanji2Koe(frameworkPath, aqDictPath);
        const devKey = aqKanji2KoeDevKey;
        aqKanji2Koe.setDevKey(devKey);
        chai_1.assert.ok(true);
    });
    it('should throw error, if setDevKey will be called multiple times.', () => {
        if (aqKanji2KoeDevKey == 'xxx-xxx-xxx-xxx') {
            return;
        }
        const frameworkPath = aqKanji2KoeFrameworkPath;
        const aqDictPath = aqKanji2KoeDictPath;
        const aqKanji2Koe = new aquestalk_1.AqKanji2Koe(frameworkPath, aqDictPath);
        const devKey = aqKanji2KoeDevKey;
        aqKanji2Koe.setDevKey(devKey);
        try {
            aqKanji2Koe.setDevKey(devKey);
            throw new Error('AqKanji2Koe.setDevKey do not throw Error, devKey is already set.');
        }
        catch (err) {
            chai_1.assert.ok(true);
        }
    });
});
