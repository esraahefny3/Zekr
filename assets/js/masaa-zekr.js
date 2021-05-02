class MasaaZekr extends Zekr {
  static documentId = "masaa";
  static azkarListKey = "masaaZekrList";
  static storageKey = "masaaZekrList";
  static weekAnalyticsStorageKey = "weekmasaaDoneCount";
  static dayDoneDate = "";
  constructor(fadl, zekr, repetition) {
    super(fadl, zekr);
    this._repetition = repetition;
  }

  set repetition(repetition) {
    this._repetition = repetition;
  }
  get repetition() {
    return this._repetition;
  }
}