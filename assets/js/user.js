class User {
  static storageKey = "user";
  constructor(firebaseDocRefId, userName, email, countryCode, countryName, cityName, joinDate, totalAzkar) {
    this._firebaseDocRefId = firebaseDocRefId;
    this._userName = userName;
    this._email = email;
    this._location = {
      countryCode: countryCode,
      countryName: countryName,
      stateName: cityName
    };
    this._joinDate = joinDate;
    this._totalAzkar = totalAzkar;
  }
  set joinDate(joinDate) {
    this._joinDate = joinDate;
  }
  get joinDate() {
    return this._joinDate;
  }
  set firebaseDocRefId(firebaseDocRefId) {
    this._firebaseDocRefId = firebaseDocRefId;
  }
  get firebaseDocRefId() {
    return this._firebaseDocRefId;
  }

  set userName(userName) {
    this._userName = userName;
  }
  get userName() {
    return this._userName;
  }

  set email(email) {
    this._email = email;
  }
  get email() {
    return this._email;
  }

  set location(location) {
    this._location = location;
  }

  get totalAzkar() {
    return this._totalAzkar;
  }
  set totalAzkar(totalAzkar) {
    this._totalAzkar = totalAzkar;
  }

  get location() {
    return this._location;
  }

  toJSON() {
    return {
      firebaseDocRefId: this._firebaseDocRefId,
      userName: this._userName,
      email: this._email,
      location: this._location,
      joinDate: this._joinDate,
      totalAzkar: this._totalAzkar
    }
  }
}