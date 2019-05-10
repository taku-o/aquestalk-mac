"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aquestalk_1 = require("../aquestalk");
const path = require("path");
var frameworkPath = path.join(__dirname, '../vendor/AquesTalk2.framework');
var phontPath = path.join(__dirname, '../vendor/phont/aq_defo1.phont');
const aquesTalk2 = new aquestalk_1.AquesTalk2(frameworkPath);
const encoded = "テ'_スト";
aquesTalk2.wave(encoded, phontPath, 100).then((buffer) => {
    console.log(buffer);
});
