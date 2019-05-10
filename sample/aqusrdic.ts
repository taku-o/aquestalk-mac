import {AqUsrDic} from '../aquestalk';
var path = require('path');
import * as fs from 'fs';

var frameworkPath = path.join(__dirname, '../vendor/AqUsrDic.framework');
var csvTemplate = path.join(__dirname, '../vendor/aq_dic_large/aq_user.csv');
var usrDictTemplate = path.join(__dirname, '../vendor/aq_dic_large/aq_user.dic');
var usrBinTemplate = path.join(__dirname, '../vendor/aq_dic_large/aqdic.bin');

// result dir
var resultDir = path.join(__dirname, './result');

// generateUserDict
var aqUsrDic = new AqUsrDic(frameworkPath);
// (copy aqdic.bin. aqdic.bin is required for output dic directory.)
fs.writeFileSync(`${resultDir}/aqdic.bin`, fs.readFileSync(usrBinTemplate));
var r = aqUsrDic.generateUserDict(csvTemplate, `${resultDir}/aq_user.dic`);

// generateCSV
var r = aqUsrDic.generateCSV(usrDictTemplate, `${resultDir}/out.csv`);

// validateInput
var surface = '大江戸線';
var yomi = 'オーエドセン';
var posCode = 5;
var r = aqUsrDic.validateInput(surface, yomi, posCode);
