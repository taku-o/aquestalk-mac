"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const aquestalk_1 = require("../aquestalk");
const path = require("path");
const wav_fmt_validator_1 = require("wav-fmt-validator");
require('source-map-support').install();
var aquesTalk2FrameworkPath = path.join(__dirname, '../vendor/AquesTalk2.framework/Versions/A/AquesTalk2');
var aquesTalk2PhontPath = path.join(__dirname, '../vendor/phont/aq_f1c.phont');
describe('wave', () => {
    it('should failed to convert jp kanji, because devKey is not set.', () => {
        const frameworkPath = aquesTalk2FrameworkPath;
        const aquesTalk2 = new aquestalk_1.AquesTalk2(frameworkPath);
        const encoded = "テ'_スト";
        const phontPath = aquesTalk2PhontPath;
        aquesTalk2.wave(encoded, phontPath, 100).then((buffer) => {
            chai_1.assert.ok(buffer);
            chai_1.assert.ok(wav_fmt_validator_1.validator(buffer));
        });
    });
});
