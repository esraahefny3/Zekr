class RandomZekr {
  static collectionId = "azkar";
  static documentId = "random";
  static azkarListKey = "azkarList";
  static storageKey = "randomZekrList";
  constructor(category, fadl, zekr, dayLastUpdate) {
    this._category = category;
    this._fadl = fadl;
    this._zekr = zekr;
    this._dayRepetition = 0;
    this._weekRepetition = 0;
    this._dayLastUpdate = dayLastUpdate;
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

  set dayRepetition(dayRepetition) {
    this._dayRepetition = dayRepetition;
  }
  get dayRepetition() {
    return this._dayRepetition;
  }

  set weekRepetition(weekRepetition) {
    this._weekRepetition = weekRepetition;
  }
  get weekRepetition() {
    return this._weekRepetition;
  }
  set dayLastUpdate(dayLastUpdate) {
    this._dayLastUpdate = dayLastUpdate;
  }
  get dayLastUpdate() {
    return this._dayLastUpdate;
  }

}