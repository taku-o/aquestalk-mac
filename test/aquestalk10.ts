import {assert} from 'chai';
import {AquesTalk10} from '../aquestalk';
import * as path from 'path';
import {validator as wavValidator} from 'wav-fmt-validator';

require('source-map-support').install();

var aquesTalk10FrameworkPath = path.join(__dirname, '../vendor/AquesTalk10.framework');
var aquesTalk10DevKey = 'xxx-xxx-xxx-xxx';
var aquesTalk10UsrKey = 'xxx-xxx-xxx-xxx';

describe('wave', () => {
  it('should generate wav buffer, without devKey', (cb) => {
    const frameworkPath = aquesTalk10FrameworkPath;
    const aquesTalk10 = new AquesTalk10(frameworkPath);
    const encoded = "テ'_スト";
    const options = {bas: 0, spd: 100, vol: 100, pit: 100, acc: 100, lmd: 100, fsc: 100};
    aquesTalk10
      .wave(encoded, options)
      .then((buffer) => {
        assert.ok(buffer);
        assert.ok(wavValidator(buffer));
        cb();
      })
      .catch((err) => {
        cb(err);
      });
  });

  it('should generate wav buffer.', (cb) => {
    if (aquesTalk10DevKey == 'xxx-xxx-xxx-xxx') {
      return cb();
    }
    const frameworkPath = aquesTalk10FrameworkPath;
    const aquesTalk10 = new AquesTalk10(frameworkPath);
    const devKey = aquesTalk10DevKey;
    aquesTalk10.setDevKey(devKey);
    const encoded = "テ'_スト";
    const options = {bas: 0, spd: 100, vol: 100, pit: 100, acc: 100, lmd: 100, fsc: 100};
    aquesTalk10
      .wave(encoded, options)
      .then((buffer) => {
        assert.ok(buffer);
        assert.ok(wavValidator(buffer));
        cb();
      })
      .catch((err) => {
        cb(err);
      });
  });
});

describe('devKey', () => {
  it('should do nothing, at setting devKey', () => {
    if (aquesTalk10DevKey == 'xxx-xxx-xxx-xxx') {
      return;
    }
    const frameworkPath = aquesTalk10FrameworkPath;
    const aquesTalk10 = new AquesTalk10(frameworkPath);
    const devKey = aquesTalk10DevKey;
    aquesTalk10.setDevKey(devKey);
    assert.ok(true);
  });

  it('should throw error, if setDevKey will be called multiple times.', () => {
    if (aquesTalk10DevKey == 'xxx-xxx-xxx-xxx') {
      return;
    }
    const frameworkPath = aquesTalk10FrameworkPath;
    const aquesTalk10 = new AquesTalk10(frameworkPath);
    const devKey = aquesTalk10DevKey;
    aquesTalk10.setDevKey(devKey);

    try {
      aquesTalk10.setDevKey(devKey);
    } catch (err) {
      return assert.ok(true);
    }
    throw new Error('AquesTalk10.setDevKey do not throw Error, devKey is already set.');
  });
});

describe('usrKey', () => {
  it('should do nothing, at setting usrKey', () => {
    if (aquesTalk10DevKey == 'xxx-xxx-xxx-xxx') {
      return;
    }
    if (aquesTalk10UsrKey == 'xxx-xxx-xxx-xxx') {
      return;
    }
    const frameworkPath = aquesTalk10FrameworkPath;
    const aquesTalk10 = new AquesTalk10(frameworkPath);
    const devKey = aquesTalk10DevKey;
    const usrKey = aquesTalk10UsrKey;
    aquesTalk10.setDevKey(devKey);
    aquesTalk10.setUsrKey(usrKey);
    assert.ok(true);
  });

  it('should throw error, if setUsrKey will be called multiple times.', () => {
    if (aquesTalk10DevKey == 'xxx-xxx-xxx-xxx') {
      return;
    }
    if (aquesTalk10UsrKey == 'xxx-xxx-xxx-xxx') {
      return;
    }
    const frameworkPath = aquesTalk10FrameworkPath;
    const aquesTalk10 = new AquesTalk10(frameworkPath);
    const devKey = aquesTalk10DevKey;
    const usrKey = aquesTalk10UsrKey;
    aquesTalk10.setDevKey(devKey);
    aquesTalk10.setUsrKey(usrKey);

    try {
      aquesTalk10.setUsrKey(usrKey);
    } catch (err) {
      return assert.ok(true);
    }
    throw new Error('AquesTalk10.setUsrKey do not throw Error, devKey is already set.');
  });
});
