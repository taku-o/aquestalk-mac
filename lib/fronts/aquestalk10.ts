
// AquesTalk10
class AquesTalk10 {
  private aquesTalk10Lib: AquesTalk10Lib;
  constructor(
    frameworkPath: string
  ) {
    this.aquesTalk10Lib = new AquesTalk10Lib(frameworkPath);
  }

  private _isDevKeySet: boolean = false;
  isDevKeySet(): boolean {
    return this._isDevKeySet;
  }
  setDevKey(key: string): void {
    if (this._isDevKeySet) {
      throw new Error('AquesTalk10 devKey is already set.');
    }
    const r = this.aquesTalk10Lib.setDevKey(key);
    if (r != 0) {
      throw new Error('AquesTalk10 devKey is invalid key.');
    }
    this._isDevKeySet = true;
  }

  private _isUsrKeySet: boolean = false;
  isUsrKeySet(): boolean {
    return this._isUsrKeySet;
  }
  setUsrKey(key: string): void {
    if (this._isUsrKeySet) {
      throw new Error('AquesTalk10 devKey is already set.');
    }
    const r = this.aquesTalk10Lib.setUsrKey(key);
    if (r != 0) {
      throw new Error('AquesTalk10 devKey is invalid key.');
    }
    this._isUsrKeySet = true;
  }

  wave(encoded: string, phont: yubo.YPhont, speed: number, options: yubo.WaveOptions): ng.IPromise<Buffer> {
    const d = this.$q.defer<Buffer>();
    if (!encoded) {
      this.MessageService.syserror('音記号列が入力されていません。');
      d.reject(new Error('音記号列が入力されていません。')); return d.promise;
    }

    // version 1
    if (phont.version == 'talk1') {
      if (!this.aquesTalk1Lib.isSupported()) {
        this.MessageService.error('AquesTalk 1の音声再生機能はこのOSのバージョンではサポートされません。');
        d.reject(new Error('AquesTalk 1の音声再生機能はこのOSのバージョンではサポートされません。')); return d.promise;
      }

      // write encoded to tempory file
      const fsprefix = `_myubow${Date.now().toString(36)}`;
      temp().open(fsprefix, (err: Error, info: temp.FileDescriptor) => {
        if (err) {
          this.MessageService.syserror('一時作業ファイルを作れませんでした。', err);
          d.reject(err); return;
        }

      fs().writeFile(info.path, encoded, (err: Error) => {
        if (err) {
          this.MessageService.syserror('一時作業ファイルの書き込みに失敗しました。', err);
          d.reject(err); return;
        }

      const cmdOptions: yubo.CmdOptions = {
        env: {
          VOICE: phont.idVoice,
          SPEED: speed,
        },
        encoding: 'binary',
      };
      const waverCmd = `${unpackedPath.replace(' ', '\\ ')}/vendor/maquestalk1`;
      exec()(`cat ${info.path} | VOICE=${phont.idVoice} SPEED=${speed} ${waverCmd}`, cmdOptions, (err: Error, stdout: string, stderr: string) => {
        if (err) {
          log().info(`maquestalk1 failed. ${err}`);
          d.reject(err); return;
        }
        // @ts-ignore
        const bufWav = Buffer.from(stdout, 'binary');
        d.resolve(bufWav);
      }).on('close', (statusCode: number) => {
        if (statusCode < 0) {
          const errorCode = statusCode * -1; // maquestalk1 library result
          this.MessageService.syserror(this.aquesTalk2Lib.errorTable(errorCode));
          log().info(`AquesTalk_SyntheMV raise error. error_code:${this.aquesTalk2Lib.errorTable(errorCode)}`);
        }
      }); // maquestalk1
      }); // fs.writeFile
      }); // temp.open

    // version 2
    } else if (phont.version == 'talk2') {
      fs().readFile(phont.path, (err: Error, phontData: Buffer) => {
        if (err) {
          this.MessageService.syserror('phontファイルの読み込みに失敗しました。', err);
          d.reject(err); return;
        }

        const allocInt = ref().alloc('int');
        const r = this.aquesTalk2Lib.synthe(encoded, speed, allocInt, phontData);
        if (ref().isNull(r)) {
          const errorCode = allocInt.deref();
          this.MessageService.syserror(this.aquesTalk2Lib.errorTable(errorCode));
          log().info(`fn_AquesTalk2_Synthe_Utf8 raise error. error_code:${this.aquesTalk2Lib.errorTable(errorCode)}`);
          d.reject(new Error(`fn_AquesTalk2_Synthe_Utf8 raise error. error_code:${this.aquesTalk2Lib.errorTable(errorCode)}`)); return;
        }

        const bufWav = ref().reinterpret(r, allocInt.deref(), 0);
        const managedBuf = Buffer.from(bufWav); // copy bufWav to managed buffer
        this.aquesTalk2Lib.freeWave(r);
        d.resolve(managedBuf);
      });

    // version 10
    } else if (phont.version == 'talk10') {
      // set license key if is not set.
      if (! this._isAquesTalk10LicensekeySet) {
        if (this.aquesTalk10DevKey == null) {
          waitUntil()(300, 5, () => {
            return this.aquesTalk10DevKey != null;
          },
          () => {
            // wait
          });
        }
        if (this.aquesTalk10DevKey == null) {
          this.MessageService.syserror('まだ初期化処理が完了していないので1秒ほど待ってください。');
          d.reject(new Error('まだ初期化処理が完了していないので1秒ほど待ってください。')); return d.promise;
        }
        const devKey = this.aquesTalk10Lib.setDevKey(this.aquesTalk10DevKey);
        if (devKey != 0) {
          this.MessageService.syserror('AquesTalk10開発ライセンスキーが正しくありません。');
          d.reject(new Error('AquesTalk10開発ライセンスキーが正しくありません。')); return d.promise;
        }

        // get and set aquesTalk10 use key
        const passPhrase = options.passPhrase;
        const encryptedUseKey = options.aq10UseKeyEncrypted;
        const aquesTalk10UseKey = encryptedUseKey?
          this.LicenseService.decrypt(passPhrase, encryptedUseKey):
          '';
        if (encryptedUseKey && !aquesTalk10UseKey) {
          this.MessageService.error('AquesTalk10使用ライセンスキーの復号に失敗しました。環境設定で使用ライセンスキーを設定し直してください');
          d.reject(new Error('AquesTalk10使用ライセンスキーの復号に失敗しました。環境設定で使用ライセンスキーを設定し直してください')); return d.promise;
        }

        if (encryptedUseKey) {
          const usrKey = this.aquesTalk10Lib.setUsrKey(aquesTalk10UseKey);
          if (usrKey != 0) {
            this.MessageService.error(`${'AquesTalk10使用ライセンスキーが正しくありません。環境設定で使用ライセンスキーを設定してください。'}${aquesTalk10UseKey}`);
            d.reject(new Error(`${'AquesTalk10使用ライセンスキーが正しくありません。環境設定で使用ライセンスキーを設定してください。'}${aquesTalk10UseKey}`)); return d.promise;
          }
          this.MessageService.info('AquesTalk10使用ライセンスキーを設定しました。');
        }
        this._isAquesTalk10LicensekeySet = true;
      }

      // create struct
      const aqtkVoiceVal = new this.aquesTalk10Lib.AQTK_VOICE;
      aqtkVoiceVal.bas = options.bas? options.bas: phont.struct.bas;
      aqtkVoiceVal.spd = speed;
      aqtkVoiceVal.vol = phont.struct.vol;
      aqtkVoiceVal.pit = options.pit? options.pit: phont.struct.pit;
      aqtkVoiceVal.acc = options.acc? options.acc: phont.struct.acc;
      aqtkVoiceVal.lmd = options.lmd? options.lmd: phont.struct.lmd;
      aqtkVoiceVal.fsc = options.fsc? options.fsc: phont.struct.fsc;
      const ptr_aqtkVoiceVal = aqtkVoiceVal.ref();

      // create wave buffer
      const allocInt = ref().alloc('int');
      const r = this.aquesTalk10Lib.synthe(ptr_aqtkVoiceVal, encoded, allocInt);
      if (ref().isNull(r)) {
        const errorCode = allocInt.deref();
        this.MessageService.syserror(this.aquesTalk10Lib.errorTable(errorCode));
        log().info(`fn_AquesTalk10_Synthe_Utf8 raise error. error_code:${this.aquesTalk10Lib.errorTable(errorCode)}`);
        d.reject(new Error(`fn_AquesTalk10_Synthe_Utf8 raise error. error_code:${this.aquesTalk10Lib.errorTable(errorCode)}`)); return d.promise;
      }

      const bufWav = ref().reinterpret(r, allocInt.deref(), 0);
      const managedBuf = Buffer.from(bufWav); // copy bufWav to managed buffer
      this.aquesTalk10Lib.freeWave(r);
      d.resolve(managedBuf);
    }
    return d.promise;
  }

}

