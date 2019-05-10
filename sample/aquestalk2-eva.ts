import {AquesTalk2} from '../aquestalk';
import * as path from 'path';

var frameworkPath = path.join(__dirname, '../vendorEva/AquesTalk2Eva.framework/Versions/A/AquesTalk2Eva');
var phontPath = path.join(__dirname, '../vendorEva/phont/aq_f1c.phont');

const aquesTalk2 = new AquesTalk2(frameworkPath);
const encoded = "テ'_スト";
aquesTalk2.wave(encoded, phontPath, 100).then((buffer) => {
  console.log(buffer);
});
