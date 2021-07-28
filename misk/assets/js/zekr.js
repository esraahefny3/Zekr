class Zekr {

  static collectionId = "azkar";
  constructor(fadl, zekr) {
    this._fadl = fadl;
    this._zekr = zekr;

  }
  set fadl(fadl) {
    this._fadl = fadl;
  }
  get fadl() {
    return this._fadl;
  }

  set zekr(zekr) {
    this._zekr = zekr;
  }
  get zekr() {
    return this._zekr;
  }



}