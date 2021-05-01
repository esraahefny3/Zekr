class RandomZekr extends Zekr {
  static documentId = "random";
  static azkarListKey = "azkarList";
  static storageKey = "randomZekrList";
  constructor(fadl, zekr, dayLastUpdate) {
    super(fadl, zekr);
    this._category = category;
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