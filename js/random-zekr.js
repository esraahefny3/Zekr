class RandomZekr {
  static collectionId = "azkar";
  static documentId = "random";
  static azkarListKey = "azkarList";
  static storageKey = "randomZekrList";
  constructor(category, fadl, zekr) {
    this._category = category;
    this._fadl = fadl;
    this._zekr = zekr;
  }

  set category(category) {
    this._category = category;
  }
  get category() {
    return this._category;
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