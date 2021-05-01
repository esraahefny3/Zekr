class SabahZekr extends Zekr {
  static documentId = "sabah";
  static azkarListKey = "sabahZekrList";
  static storageKey = "sabahZekrList";
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