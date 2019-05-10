import {assert} from 'chai';
import {AquesTalk2} from '../aquestalk';
import * as path from 'path';
import {validator as wavValidator} from 'wav-fmt-validator';

require('source-map-support').install();

var aquesTalk2FrameworkPath = path.join(__dirname, '../vendor/AquesTalk2.framework');
var aquesTalk2PhontPath = path.join(__dirname, '../vendor/phont/aq_defo1.phont');

describe('wave', () => {
  it('should failed to convert jp kanji, because devKey is not set.', () => {
    const frameworkPath = aquesTalk2FrameworkPath;
    const aquesTalk2 = new AquesTalk2(frameworkPath);
    const encoded = "テ'_スト";
    const phontPath = aquesTalk2PhontPath;
    aquesTalk2.wave(encoded, phontPath, 100).then((buffer) => {
      assert.ok(buffer);
      assert.ok(wavValidator(buffer));
    });
  });
});
