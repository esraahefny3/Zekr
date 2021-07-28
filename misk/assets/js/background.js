//Set  onInstall setting
//1- open the user profile page in new tab

var openDashboard = function(e) {

  open_new_tab("dashboard.html");

};

//Adding to rightclick Menu.
chrome.contextMenus.removeAll();
chrome.contextMenus.create({
  id: "dashboardMenu",
  title: "Dashboard",
  contexts: ["browser_action"]
});


chrome.contextMenus.onClicked.addListener(function(info) {
  if (info.menuItemId == "dashboardMenu") {
    openDashboard();
  }
});
// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason == "install") {
    setDefaultSettings();
    setDefaultUserInfo();
    updateCurrentWeekDateAndData();
  } else if (details.reason == "update") {
    var thisVersion = chrome.runtime.getManifest().version;
    //download random zekr from firestore

  }
  downloadAZkar(RandomZekr.documentId, RandomZekr.azkarListKey, RandomZekr.storageKey);
  downloadAZkar(SabahZekr.documentId, SabahZekr.azkarListKey, SabahZekr.storageKey);
  downloadAZkar(MasaaZekr.documentId, MasaaZekr.azkarListKey, MasaaZekr.storageKey);
  RecommendationList.downloadRecommendations();

  setSabahZekrReminder();
  setMasaaZekrReminder();

});

function setSabahZekrReminder() {
  setInterval(function() {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      checkSabahZekrTime().then(function(response) {
        if (response.status) {
          getZekr(SabahZekr.storageKey, function(zekrData) {
            let dataResponse = {
              zekrData: zekrData,
              done: true,
              higriDate: response.higriObj ? response.higriObj.higriDate : ""
            }

            chrome.tabs.sendMessage(tabs[0].id, {
              action: "open_sabah_overlay",
              response: dataResponse
            }, function(response) {

            });

          });
        }
      }).catch((error) => {
        console.error(error);
      });
    });

  }, 1000 * 60 * 7);
}

function checkSabahZekrDone() {
  return SabahZekr.dayDoneDate == new Date().toDateString();
}

function checkMasaaZekrDone() {
  return MasaaZekr.dayDoneDate == new Date().toDateString();
}

function getWeekSabahZekr() {
  let zekrWeekDone = storage_get(SabahZekr.weekAnalyticsStorageKey);
  if (!zekrWeekDone) {
    zekrWeekDone = 0;
  }
  return zekrWeekDone;
}

function getWeekMasaaZekr() {
  let zekrWeekDone = storage_get(MasaaZekr.weekAnalyticsStorageKey);
  if (!zekrWeekDone) {
    zekrWeekDone = 0;
  }
  return zekrWeekDone;
}
async function checkSabahZekrTime() {
  if (!checkSabahZekrDone()) {
    return getHigri().then(
      function(higriObj) {
        if (higriObj && higriObj.asrTime && higriObj.fajrTime) {
          let currHour = new Date().getHours();
          let currMin = new Date().getMinutes();
          let fajrHourMin = getHoursMinFromTime(higriObj.fajrTime);
          let asrHourMin = getHoursMinFromTime(higriObj.asrTime);
          if (fajrHourMin && asrHourMin &&
            fajrHourMin.hour && fajrHourMin.min && asrHourMin.hour && asrHourMin.min &&
            (((currHour > fajrHourMin.hour) && (currHour < asrHourMin.hour)) ||
              (currHour == fajrHourMin.hour && currMin >= fajrHourMin.min + 15) ||
              (currHour == asrHourMin.hour && currMin <= asrHourMin.min - 15))) {
            return {
              status: true,
              higriObj: higriObj
            };
          }
        }
        return false;
      }).catch((error) => {
      console.error(error);
    });
  } else {
    return false;
  }
}



function setMasaaZekrReminder() {
  setInterval(function() {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      checkMasaaZekrTime().then(function(response) {
        if (response.status) {
          getZekr(MasaaZekr.storageKey, function(zekrData) {
            let dataResponse = {
              zekrData: zekrData,
              done: true,
              higriDate: response.higriObj ? response.higriObj.higriDate : ""
            }

            chrome.tabs.sendMessage(tabs[0].id, {
              action: "open_masaa_overlay",
              response: dataResponse
            }, function(response) {

            });

          });
        }
      }).catch((error) => {
        console.error(error);
      });
    });

  }, 1000 * 60 * 7);
}


async function checkMasaaZekrTime() {
  if (!checkMasaaZekrDone()) {
    return getHigri().then(
      function(higriObj) {
        if (higriObj && higriObj.asrTime && higriObj.fajrTime) {
          let currHour = new Date().getHours();
          let currMin = new Date().getMinutes();
          let asrHourMin = getHoursMinFromTime(higriObj.asrTime);
          let ishaHourMin = getHoursMinFromTime(higriObj.ishaTime);
          if (asrHourMin && ishaHourMin &&
            asrHourMin.hour && asrHourMin.min && ishaHourMin.hour && ishaHourMin.min &&
            (((currHour > asrHourMin.hour) && (currHour < ishaHourMin.hour)) ||
              (currHour == asrHourMin.hour && currMin >= asrHourMin.min + 15) ||
              (currHour == ishaHourMin.hour && currMin <= ishaHourMin.min - 15))) {
            return {
              status: true,
              higriObj: higriObj
            };
          }
        }
        return false;
      }).catch((error) => {
      console.error(error);
    });
  } else {
    return false;
  }
}


function getFirstDayOfCurrentWeek() {
  var today = new Date();
  var day = today.getDay() || 7; // Get current day number, converting Sun. to 7
  if (day !== 1) // Only manipulate the date if it isn't Mon.
    today.setHours(-24 * (day - 1)); // Set the hours to day number minus 1
  return today.toDateString();
}

function setFirstDayOfTheWeekStorage() {
  let firstDayOfCurrentWeek = getFirstDayOfCurrentWeek();
  storage_set('current_week', firstDayOfCurrentWeek); // will be Monday
}




// run content script overlay.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

  if (message.injectOverlay == true) {
    if (get_overlay_state(sender.tab.url)) {
      getZekr(RandomZekr.storageKey, function(zekrData) {
        getHigri().then(
          function(higriObj) {
            let response = {
              zekrData: zekrData,
              done: true,
              higriDate: higriObj ? higriObj.higriDate : "",
            }
            saveAnalytics(zekrData);
            set_last_run();
            sendResponse(response);
          }).catch((error) => {
          console.error(error);
        });
      });

    }
    return true; // Required for async sendResponse()
  } else if (message.getAnotherRandomZekrOverlay == true) {
    getZekr(RandomZekr.storageKey, function(zekrData) {
      getHigri().then(
        function(higriObj) {
          let response = {
            zekrData: zekrData,
            done: true,
            higriDate: higriObj ? higriObj.higriDate : ""
          }
          saveAnalytics(zekrData);
          sendResponse(response);
        }).catch((error) => {
        console.error(error);
      });
    });
    return true; // Required for async sendResponse()
  } else if (message.getAnotherSabahZekrOverlay == true) {
    getZekr(SabahZekr.storageKey, function(zekrData) {
      getHigri().then(
        function(higriObj) {
          let response = {
            zekrData: zekrData,
            done: true,
            higriDate: higriObj ? higriObj.higriDate : ""
          }
          sendResponse(response);
        }).catch((error) => {
        console.error(error);
      });
    });
    return true; // Required for async sendResponse()
  } else if (message.getAnotherMasaaZekrOverlay == true) {
    getZekr(MasaaZekr.storageKey, function(zekrData) {
      getHigri().then(
        function(higriObj) {
          let response = {
            zekrData: zekrData,
            done: true,
            higriDate: higriObj ? higriObj.higriDate : ""
          }
          sendResponse(response);
        }).catch((error) => {
        console.error(error);
      });
    });
    return true; // Required for async sendResponse()
  } else if (message.openSettings == true) {
    chrome.runtime.openOptionsPage();
    return true;
  } else if (message.blacklistWebsite == true) {
    add_to_blacklist(lastcurrentTab_url);
    return true;
  } else if (message.redirect == true) {
    return redirect();

  } else if (message.sabahZekrDone == true) {
    setSabahDayDoneDate(message.sabahDayDoneDate);
    saveSabahMasaaAnalytics(SabahZekr.weekAnalyticsStorageKey);
    return true;
  } else if (message.masaaZekrDone == true) {
    setMasaaDayDoneDate(message.masaaDayDoneDate);
    saveSabahMasaaAnalytics(MasaaZekr.weekAnalyticsStorageKey);
    return true;
  }
});

function updateCurrentWeekDateAndData() {
  let currentWeek = storage_get("current_week");
  if (currentWeek == null) {
    storage_set(SabahZekr.weekAnalyticsStorageKey, "0");
    storage_set(MasaaZekr.weekAnalyticsStorageKey, "0");
    storage_set('used_azkar', []);
    setFirstDayOfTheWeekStorage();
  } else {
    if (getFirstDayOfCurrentWeek() != currentWeek) {
      storage_set(SabahZekr.weekAnalyticsStorageKey, "0");
      storage_set(MasaaZekr.weekAnalyticsStorageKey, "0");
      storage_set('used_azkar', []);
      setFirstDayOfTheWeekStorage();
    }
  }
}

function saveSabahMasaaAnalytics(storageKey) {
  updateCurrentWeekDateAndData();
  let zekrWeekDone = storage_get(storageKey);
  if (!zekrWeekDone) {
    zekrWeekDone = 1;
  } else {

    zekrWeekDone = parseInt(zekrWeekDone, 10) + 1;
  }
  storage_set(storageKey, zekrWeekDone);
}

function setSabahDayDoneDate(date) {
  SabahZekr.dayDoneDate = date;

}

function setMasaaDayDoneDate(date) {
  MasaaZekr.dayDoneDate = date;
}

function saveAnalytics(zekrData) {
  updateCurrentWeekDateAndData();
  let usedAzkar = storage_get("used_azkar");
  let foundFlag = 0;
  for (i = 0; i < usedAzkar.length; i++) {
    let zekrObj = usedAzkar[i];
    if (zekrObj.zekr == zekrData.zekr) {
      foundFlag = 1;
      if (zekrObj.dayLastUpdate == new Date().toDateString()) {
        zekrObj.dayRepetition++;
      } else {
        zekrObj.dayRepetition = 1;
        zekrObj.dayLastUpdate = new Date().toDateString();
      }
      zekrObj.weekRepetition++;
      usedAzkar[i] = zekrObj;
      break;
    }
  }
  if (foundFlag == 0) {
    let zekrObj = zekrData;
    zekrObj.dayRepetition = 1;
    zekrObj.dayLastUpdate = new Date().toDateString();
    zekrObj.weekRepetition = 1;
    usedAzkar.push(zekrObj);
  }
  storage_set('used_azkar', usedAzkar);
  //update total azkar
  let user = getUser();
  user.totalAzkar = user.totalAzkar + 1;
  storage_set(User.storageKey, user);
}


//Redirect to redirect_website
function redirect() {
  var recommendation = RecommendationList.getRecommendation();
  if (recommendation) {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      chrome.tabs.update(tabs[0].id, {
        url: recommendation.url
      });
    });

    return true;
  }
}



function getZekr(storageKey, callback) {
  let azkarList = storage_get(storageKey);
  if (!azkarList) {
    downloadAZkar(RandomZekr.documentId, RandomZekr.azkarListKey, RandomZekr.storageKey).then(
      function(value) {
        let zekrNo = Math.floor(Math.random() * azkarList.length);
        callback(azkarList[zekrNo]);
      }).catch((error) => {
      console.error(error);
    });
  } else {
    let zekrNo = Math.floor(Math.random() * azkarList.length);
    callback(azkarList[zekrNo]);
  }
}

function is_website_a_blacklist(url) {
  var tab_domain = baseURL(url);
  var settings = storage_get("settings");
  var blacklist = settings.blacklist || [];
  let status = blacklist.indexOf(tab_domain) > -1;
  return status;
}

function get_overlay_state(url) {
  var settings = storage_get("settings");
  overlay_state = (settings.all_websites || is_website_a_blacklist(url));
  overlay_state = overlay_state && (settings.always_run || validate_last_run(settings.last_run, settings.run_after));
  return overlay_state;
}

function validate_last_run(last_run, run_after) {
  if (last_run == null) return true;
  var now = new Date().getTime();
  diffMs = now - last_run;
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  return (diffMins >= run_after);
}
//for blacklist
function setDefaultSettings() {
  let settings = {
    update_date: null,
    all_websites: false,
    always_run: false,
    run_after: 5,
    last_run: null,
    blacklist: [baseURL("https://www.facebook.com/"), baseURL("https://twitter.com/"), baseURL("https://www.youtube.com/")],
    redirect_website: null
  }
  storage_set("settings", settings);
}

function setDefaultUserInfo() {
  let user = new User();
  user.joinDate = new Date().toDateString();
  user.totalAzkar = 0;
  storage_set(User.storageKey, user);
}


async function downloadAZkar(documentId, azkarListKey, storageKey) {
  readFrombDb(Zekr.collectionId, documentId, callback);

  function callback(data) {
    //save azkarListData
    let zekrList = [];
    data[azkarListKey].forEach(element => {
      let zekr = JSON.parse(JSON.stringify(element));
      zekrList.push(zekr);
    });
    storage_set(storageKey, zekrList);
  }
  return "";
}


function add_to_blacklist(website) {
  //check if it is valid or exist already..else return something that we can process
  var item = baseURL(website);
  var settings = storage_get("settings");
  if (item) {
    var blacklist = settings.blacklist || [];
    website_domain = baseURL(website);
    if (blacklist.includes(website_domain)) {
      return {
        status: false,
        message: "This website is already blacklisted."
      };
    } else {
      blacklist.push(website_domain);
      settings.blacklist = blacklist;
      storage_set("settings", settings);
      return {
        status: true,
        message: item
      };
    }
  } else {
    return {
      status: false,
      message: "الموقع الذي ادخلته غير صحيح من فضلك انسخ عنون الموقع ثم الصقه هنا"
    };
  }

}

function setRedirectWebsite(website) {
  //check if it is valid or exist already..else return something that we can process
  var item = baseURL(website);
  var settings = storage_get("settings");
  if (item) {
    settings.redirect_website = item;
    storage_set("settings", settings);
    return {
      status: true,
      message: item
    };

  } else {
    return {
      status: false,
      message: "Your input is not a valid website. Please copy paste the URL from Address bar."
    };
  }
}

function remove_from_blacklist(index) {
  var settings = storage_get("settings");
  var blacklist = settings.blacklist || [];
  blacklist.splice(index, 1);
  settings.blacklist = blacklist;
  storage_set("settings", settings);

}


function removeRedirectWebsite() {
  let settings = storage_get("settings");
  settings.redirect_website = null;
  storage_set("settings", settings);
}

function get_redirect() {
  return storage_get("settings").redirect_website;
}

function set_last_run() {
  var settings = storage_get("settings");
  settings.last_run = new Date().getTime();
  storage_set("settings", settings);
}


function toggle_all_websites_status() {
  var settings = storage_get("settings");
  settings.all_websites = !settings.all_websites;
  storage_set("settings", settings);
}

function change_frequency(freq) {
  var settings = storage_get("settings");
  if (freq == 0) {
    settings.always_run = true;
  } else {
    settings.always_run = false;
  }
  settings.run_after = freq;
  storage_set("settings", settings);
}

function get_frequency() {
  var settings = storage_get("settings");
  return settings.run_after;
}


function get_all_websites_status() {
  var settings = storage_get("settings");
  return settings.all_websites;
}

function get_blacklist() {
  return storage_get("settings").blacklist || [];
}


chrome.runtime.onInstalled.addListener(function(details) {
  open_new_tab("user-profile.html");
});


function getUser() {
  let user = storage_get(User.storageKey);
  return user;
}

function getBlackList() {
  let settings = storage_get("settings");
  if (settings && settings.blacklist) {
    return settings.blacklist;
  } else {
    console.log('cannot find settings or blacklist');
  }

}

function getUsedAzkar() {
  return storage_get('used_azkar');
}

async function getHigri() {
  let higriObj = storage_get(Higri.storageKey);
  if (!higriObj || higriObj.lastModify != new Date().toDateString()) {
    //UPDATE HIGRI
    return scrapeHigri().then(
      function(value) {
        return value;
      }
    ).catch((error) => {
      console.error(error);
    });
  } else {
    return higriObj;
  }
}

async function scrapeHigri() {
  try {
    //1- get countruCode
    let user = getUser();
    if (user && user.location && user.location.countryCode) {
      return scrapeHigriDateAndTimes(user.location.countryCode).then(
        function(value) {
          return value;
        },
        function(error) {
          console.log(error);
        }
      );
    } else {
      console.log("Cannot find countryCode");
    }
  } catch (error) {
    console.error(error);
  }
}

function setHigri(higriObj) {
  storage_set(Higri.storageKey, higriObj);
}