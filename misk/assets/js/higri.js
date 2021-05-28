class Higri {
  static storageKey = "higri";
  constructor(lastModify, higriDate, countryCode, country, fajrTime, sunriseTime,
    duhrTime, asrTime, magiribTime, ishaTime) {
    this._lastModify = lastModify;
    this._higriDate = higriDate;
    this._countryCode = countryCode;
    this._country = country;
    this._fajrTime = fajrTime;
    this._sunriseTime = sunriseTime;
    this._duhrTime = duhrTime;
    this._asrTime = asrTime;
    this._magiribTime = magiribTime;
    this._ishaTime = ishaTime;
  }
  set lastModify(lastModify) {
    this._lastModify = lastModify;
  }
  get lastModify() {
    return this._lastModify;
  }
  set higriDate(higriDate) {
    this._higriDate = higriDate;
  }
  get higriDate() {
    return this._higriDate;
  }

  set countryCode(countryCode) {
    this._countryCode = countryCode;
  }
  get countryCode() {
    return this._countryCode;
  }

  set country(country) {
    this._country = country;
  }
  get country() {
    return this._country;
  }

  set fajrTime(fajrTime) {
    this._fajrTime = fajrTime;
  }
  get fajrTime() {
    return this._fajrTime;
  }

  set sunriseTime(sunriseTime) {
    this._sunriseTime = sunriseTime;
  }

  get sunriseTime() {
    return this._sunriseTime;
  }
  set duhrTime(duhrTime) {
    this._duhrTime = duhrTime;
  }

  get duhrTime() {
    return this._duhrTime;
  }

  set asrTime(asrTime) {
    this._asrTime = asrTime;
  }

  get asrTime() {
    return this._asrTime;
  }

  set magiribTime(magiribTime) {
    this._magiribTime = magiribTime;
  }

  get magiribTime() {
    return this._magiribTime;
  }

  set ishaTime(ishaTime) {
    this._ishaTime = ishaTime;
  }

  get ishaTime() {
    return this._ishaTime;
  }

  toJSON() {
    return {
      lastModify: this._lastModify,
      higriDate: this._higriDate,
      countryCode: this._countryCode,
      country: this._country,
      fajrTime: this._fajrTime,
      sunriseTime: this._sunriseTime,
      duhrTime: this._duhrTime,
      asrTime: this._asrTime,
      magiribTime: this._magiribTime,
      ishaTime: this._ishaTime
    }
  }
}