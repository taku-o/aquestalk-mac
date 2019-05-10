import {AquesTalk10} from '../aquestalk';
import * as path from 'path';

var frameworkPath = path.join(__dirname, '../vendor/AquesTalk10.framework');
var devKey = 'xxx-xxx-xxx-xxx';
var usrKey = 'xxx-xxx-xxx-xxx';

var aquesTalk10 = new AquesTalk10(frameworkPath);
aquesTalk10.setDevKey(devKey); // required
//aquesTalk10.setUsrKey(usrKey); // optional

var encoded = "テ'_スト";
var options = {bas: 0, spd: 100, vol: 100, pit: 100, acc: 100, lmd: 100, fsc: 100};

aquesTalk10.wave(encoded, options).then((buffer) => {
  console.log(buffer);
});
