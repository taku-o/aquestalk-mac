"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const aquestalk_1 = require("../aquestalk");
var path = require('path');
const fs = require("fs");
const temp = require("temp");
temp.track();
require('source-map-support').install();
var aqUsrDicFrameworkPath = path.join(__dirname, '../vendor/AqUsrDic.framework/Versions/A/AqUsrDic');
var aqUsrDicCsvTemplate = path.join(__dirname, '../vendor/aq_dic_large/aq_user.csv');
var aqUsrDicUsrDictTemplate = path.join(__dirname, '../vendor/aq_dic_large/aq_user.dic');
var aqUsrDicUsrBinTemplate = path.join(__dirname, '../vendor/aq_dic_large/aqdic.bin');
describe('generateUserDict', () => {
    it('should generate dict data file from csv data file.', (cb) => {
        const frameworkPath = aqUsrDicFrameworkPath;
        const aqUsrDic = new aquestalk_1.AqUsrDic(frameworkPath);
        const inCsvPath = aqUsrDicCsvTemplate;
        const fsprefix = `_aquestalk_test${Date.now().toString(36)}`;
        const dirPath = temp.mkdirSync(fsprefix);
        const outUserDicPath = `${dirPath}/aq_user.dic`;
        fs.writeFileSync(`${dirPath}/aqdic.bin`, fs.readFileSync(aqUsrDicUsrBinTemplate));
        const r = aqUsrDic.generateUserDict(inCsvPath, outUserDicPath);
        chai_1.assert.ok(r);
        fs.stat(outUserDicPath, (err, stats) => {
            cb(err);
        });
    });
});
describe('generateCSV', () => {
    it('should generate csv data file from user dict file', (cb) => {
        const frameworkPath = aqUsrDicFrameworkPath;
        const aqUsrDic = new aquestalk_1.AqUsrDic(frameworkPath);
        const inUserDicPath = aqUsrDicUsrDictTemplate;
        const fsprefix = `_aquestalk_test${Date.now().toString(36)}`;
        const dirPath = temp.mkdirSync(fsprefix);
        const outCsvPath = `${dirPath}/aq_user.csv`;
        const r = aqUsrDic.generateCSV(inUserDicPath, outCsvPath);
        chai_1.assert.ok(r);
        fs.stat(outCsvPath, (err, stats) => {
            cb(err);
        });
    });
});
describe('validateInput', () => {
    it('should validate ok input.', () => {
        const frameworkPath = aqUsrDicFrameworkPath;
        const aqUsrDic = new aquestalk_1.AqUsrDic(frameworkPath);
        const surface = '大江戸線';
        const yomi = 'オーエドセン';
        const posCode = 5;
        const r = aqUsrDic.validateInput(surface, yomi, posCode);
        chai_1.assert.ok(r);
    });
    it('should validate ng input.', () => {
        const frameworkPath = aqUsrDicFrameworkPath;
        const aqUsrDic = new aquestalk_1.AqUsrDic(frameworkPath);
        const surface = '大江戸線';
        const yomi = 'ooedosen';
        const posCode = 5;
        try {
            const _void_r = aqUsrDic.validateInput(surface, yomi, posCode);
        }
        catch (err) {
            return chai_1.assert.ok(true);
        }
        throw new Error('AqUsrDic.validateInput do not throw Error, yomi is wrong input.');
    });
});
