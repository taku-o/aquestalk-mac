var _os: any, os         = () => { _os = _os || require('os'); return _os; };
var _semver: any, semver = () => { _semver = _semver || require('semver'); return _semver; };

// AquesTalk1
class AquesTalk1Lib {
  readonly SUPPORTED_LAST_VERSION: string = '19.0.0'; // Mojave next
  private release: string;
  constructor() {}

  isSupported(version?: string): boolean {
    if (version) {
      return semver().lt(version, this.SUPPORTED_LAST_VERSION);
    } else {
      this.release = this.release || os().release();
      return semver().lt(this.release, this.SUPPORTED_LAST_VERSION);
    }
  }
}

