"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aquestalk_1 = require("../aquestalk");
const path = require("path");
var frameworkPath = path.join(__dirname, '../vendorEva/AquesTalk.framework/Versions/A/AquesTalk');
var devKey = 'xxx-xxx-xxx-xxx';
var usrKey = 'xxx-xxx-xxx-xxx';
var aquesTalk10 = new aquestalk_1.AquesTalk10(frameworkPath);
var encoded = "テ'_スト";
var options = { bas: 0, spd: 100, vol: 100, pit: 100, acc: 100, lmd: 100, fsc: 100 };
aquesTalk10.wave(encoded, options).then((buffer) => {
    console.log(buffer);
});
