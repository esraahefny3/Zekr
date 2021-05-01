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
    //download random zekr from firestore
    storage_set('used_azkar', []);
    setFirstDayOfTheWeekStorage();
    setSabahZekrReminder();
  } else if (details.reason == "update") {
    var thisVersion = chrome.runtime.getManifest().version;
    //download random zekr from firestore

  }
  downloadAZkar(RandomZekr.documentId, RandomZekr.azkarListKey, RandomZekr.storageKey);
  downloadAZkar(SabahZekr.documentId, SabahZekr.azkarListKey, SabahZekr.storageKey);
  downloadAZkar(MasaaZekr.documentId, MasaaZekr.azkarListKey, MasaaZekr.storageKey);

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
              color_to_add: get_color_theme(),
              higriDate: response.higriObj ? response.higriObj.higriDate : ""
            }
            // saveAnalytics(zekrData);
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "open_sabah_overlay",
              response: dataResponse
            }, function(response) {

            });

          });
        }
      });
    });

  }, 1000 * 60);
}


async function checkSabahZekrTime() {
  if (SabahZekr.dayDone != new Date().toDateString()) {
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
              color_to_add: get_color_theme(),
              higriDate: response.higriObj ? response.higriObj.higriDate : ""
            }
            // saveAnalytics(zekrData);
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "open_masaa_overlay",
              response: dataResponse
            }, function(response) {

            });

          });
        }
      });
    });

  }, 1000 * 60);
}


async function checkMasaaZekrTime() {
  if (MasaaZekr.dayDone != new Date().toDateString()) {
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
              color_to_add: get_color_theme(),
              higriDate: higriObj ? higriObj.higriDate : ""
            }
            saveAnalytics(zekrData);
            sendResponse(response);
          });
      });
      return true; // Required for async sendResponse()
    }
  } else if (message.getWord == true) { //popup
    getZekr(RandomZekr.storageKey, function(learned_word) {
      saveCurrentInfo(learn_translated_word, "popup");
      // add_to_word_analytics
      set_last_run();
      //1-add_to_word_analytics

      add_to_word_analytics(false, 15);
      //2-saveLearningTime
      update_analytics_user_date(15); //to be change
      clearInfo();
      sendResponse({
        done: true,
        color_to_add: color_theme,
        lang: get_lang(),
        en_word: learn_word_en,
        new_word: learn_translated_word,
        date: date
      });
    });
    return true;
  } else if (message.getAnotherRandomZekrOverlay == true) {
    getZekr(RandomZekr.storageKey, function(zekrData) {
      getHigri().then(
        function(higriObj) {
          let response = {
            zekrData: zekrData,
            done: true,
            color_to_add: get_color_theme(),
            higriDate: higriObj ? higriObj.higriDate : ""
          }
          saveAnalytics(zekrData);
          sendResponse(response);
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
            color_to_add: get_color_theme(),
            higriDate: higriObj ? higriObj.higriDate : ""
          }
          // saveAnalytics(zekrData);
          sendResponse(response);
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
            color_to_add: get_color_theme(),
            higriDate: higriObj ? higriObj.higriDate : ""
          }
          // saveAnalytics(zekrData);
          sendResponse(response);
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

  } else if (message.check_redirect == true) {
    sendResponse({
      response: check_redirect()
    })
  } else if (message.continueBrowsing == true) {
    //saveLearningTime
    let learnTime = saveLearningTime();
    add_to_word_analytics(false, learnTime);
    clearInfo();
    return true;
  } else if (message.sabahZekrDone == true) {
    setSabahDayDoneDate(message.sabahDayDoneDate);
    return true;
  } else if (message.masaaZekrDone == true) {
    return setMasaaDayDoneDate(message.masaaDayDoneDate);
    return true;
  }
});

function setSabahDayDoneDate(date) {
  SabahZekr.dayDone = date;

}

function setMasaaDayDoneDate(date) {
  MasaaZekr.dayDone = date;
}

function saveAnalytics(zekrData) {
  let currentWeek = storage_get("current_week");
  if (currentWeek == null) {
    setFirstDayOfTheWeekStorage();
  } else {
    if (getFirstDayOfCurrentWeek() != currentWeek) {
      storage_set('used_azkar', []);
      setFirstDayOfTheWeekStorage();
    }
  }
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

function saveLearningTime() {
  let endTime = new Date().getTime();
  let user = storage_get('user');
  if (user && user.last_used_at) {
    let startTime = new Date(user.last_used_at).getTime();
    let learnTime = differenceInSeconds(startTime, endTime);
    update_analytics_user_date(learnTime);
    return learnTime;
  } else {
    console.log('Cannot get user information');
  }
}

//Redirect to redirect_website
function redirect() {
  var settings = storage_get("settings");
  if (settings.redirect_website) {
    let learnTime = saveLearningTime();
    add_to_word_analytics(true, learnTime);
    clearInfo();

    //3-redirect
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      chrome.tabs.update(tabs[0].id, {
        url: settings.redirect_website
      });
    });

    return true;
  }
}

function check_redirect() {
  var settings = storage_get("settings");
  if (settings.redirect_website) {
    return true;
  } else {
    return false;
  }
}

var overlay_state = false;

function getZekr(storageKey, callback) {
  let azkarList = storage_get(storageKey);
  if (!azkarList) {
    downloadAZkar(RandomZekr.documentId, RandomZekr.azkarListKey, RandomZekr.storageKey).then(
      function(value) {
        let zekrNo = Math.floor(Math.random() * azkarList.length);
        callback(azkarList[zekrNo]);
      }
    );


  } else {
    let zekrNo = Math.floor(Math.random() * azkarList.length);
    callback(azkarList[zekrNo]);
  }
}

function test_words_to_learn() {
  words_to_learn.forEach(learn_word);

}

function learn_word(english_word) {
  word = null;
  url = "https://a.kasahorow.org/?q=kjson&method=get.links&args=en%3E" + get_lang() + ":" + english_word + "&key=chrome&format=json"

  get_response(url, function(response) {
    var matches = response.match(/\{([^}]+)\}/);
    if (matches) {
      var submatch = matches[1].replace(/'/g, '"');
    }

    submatch = submatch;
    submatch = "{" + submatch + "}"
    try {
      result = (JSON.parse(submatch)).m;
      return_result = {
        "english": english_word,
        "new_word": result
      };
      return return_result;

    } catch (e) {
      return {
        value: "error"
      };
    }
  });

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
    color_theme: "linear-gradient(to left, #ffbc00, #fe9e00, #fb7f00, #f65c00, #ee2e05)",
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
  return "hh";
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

function get_color_theme() {
  return storage_get("settings").color_theme;
}

function set_color_theme(color_theme) {
  var settings = storage_get("settings");
  settings.color_theme = color_theme;
  storage_set("settings", settings);
}

function get_lang() {
  return storage_get("settings").lang;
}

function set_lang(language) {
  var settings = storage_get("settings");
  settings.lang = language;
  update_inspiration();
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

function set_date_with_inspiration(date, inspiration) {
  var settings = storage_get("settings");
  settings.ks_date = date;
  settings.inspiration = inspiration;
  settings.update_date = (new Date()).toDateString();
  storage_set("settings", settings)
}

function get_date() {
  var settings = storage_get("settings");
  return settings.ks_date;
}


function get_inspirtion() {
  var settings = storage_get("settings");
  return settings.inspiration;
}

function get_update_date() {
  var settings = storage_get("settings");
  return settings.update_date;
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


/* get date and inspiration */


//to update inspiration locally instead of multiple json calls.
function update_inspiration() {
  var by;
  var day;
  var inspiration;

  var xhr = new XMLHttpRequest();
  //gets the JSON feed
  url = 'http://' + language + '.kasahorow.org/app/m?format=json&source=chrome';
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
    //Works after getting the feed
    if (xhr.readyState == 4) {
      var res = JSON.parse(xhr.response);
      day = res["day"];
      inspiration = res["inspiration"];
      set_date_with_inspiration(day, inspiration);


    }
  };
  xhr.send();

}



function inspire_update_check(get_now = false) {
  var update_date = get_update_date();
  if (get_now || isDateBeforeToday(update_date) || (update_date == null)) {
    update_inspiration();
  }
}


chrome.runtime.onInstalled.addListener(function(details) {
  if (details && details.reason && details.reason == 'install') {

    open_new_tab("user-profile.html");
  } else {
    //if(user information is not there)
    open_new_tab("user-profile.html");
  }

});


//for blacklist
function set_default_information() {
  // let user = new User();

  // var user = {
  //   name: null,
  //   email: null,
  //   country: null,
  //   native_lang: null,
  //   lang: 'sn', //change in welcome page or settings.
  //   total_time_spent: 0,
  //   join_date: new Date().toDateString(), // set in installing the extension.
  //   highest_streak: 0,
  //   current_streak: 0,
  //   last_used_at: null,
  //   redirect_website: "https://www.google.com/"
  // }
  let user = new User(null, null, null, null, null, null, new Date().toDateString());
  storage_set("user", user);
  storage_set("word_analytics", {})
  //words, time on each word, website word appeared on, blacklist or no?, redirected or no?, date
}

// function add_default_information(user_name, user_email, user_country, user_native_language, user_learn_lang, user_redirect_website)
// {
// 	user = storage_get("user");
// 	user.name = user_name;
// 	user.email = user_email;
// 	user.country = user_country;
// 	user.native_lang = user_native_language;
// 	user.lang = user_learn_lang;
// 	user.redirect_website = user_redirect_website;
// 	storage_set("user", user)


// }

function add_default_information(user_name, user_email, user_country, user_native_language) {
  user = storage_get("user");
  user.name = user_name;
  user.email = user_email;
  user.country = user_country;
  user.native_lang = user_native_language;
  storage_set("user", user)


}

function update_analytics_user_date(time_spent) {
  user = storage_get("user");
  user.total_time_spent = user.total_time_spent + time_spent;
  var today_date = new Date();

  diff_days = difference_days(new Date(user.last_used_at), today_date);
  console.log(diff_days);
  if (diff_days > 1) {
    user.current_streak = 0;
  } else if (diff_days == 1) {
    user.current_streak = user.current_streak + 1;
    if (user.current_streak > user.highest_streak) {
      user.highest_streak = user.current_streak;
    }
  }

  storage_set("user", user);

}

function add_to_word_analytics(redirected_status, time_spent) {

  //check if week changes clear the data and set the new current week
  let firstDayOfCurrentWeek = getFirstDayOfCurrentWeek();
  let storedWeek = storage_get('current_week');
  if (storedWeek) {
    if (!(firstDayOfCurrentWeek === storedWeek)) {
      storage_set('word_analytics', {});
      setFirstDayOfTheWeekStorage();
    }
  }

  let info = storage_get('info');
  if (info) {
    var word_analytics_map = storage_get("word_analytics");
    let time_spent_in_word = time_spent / info.length;
    info.forEach(function(item) {
      item['redirected_status'] = redirected_status;
      item['time_spent_in_word'] = time_spent_in_word;
      let today_date = new Date();
      var today_date_string = today_date.toDateString();
      word_analytics_map[today_date_string] = word_analytics_map[today_date_string] || [];
      word_analytics_map[today_date_string].push(item);
    });
    storage_set("word_analytics", word_analytics_map);
    console.log(storage_get('word_analytics'))


  }


}

function saveCurrentInfo(word, browsing_website) {
  let info = storage_get('info') || [];
  let today_date = new Date();
  var blacklist_status = is_website_a_blacklist(browsing_website);
  var info_item = {
    word: word,
    browsing_website: baseURL(browsing_website),
    blacklist_status: blacklist_status,
    time_date: today_date.toLocaleString(),
    lang: get_lang(),
    time_spent_in_word: 0
  }
  info.push(info_item);
  storage_set("info", info);

  //set last used at time in milliseconds
  let user = storage_get('user');
  user.last_used_at = today_date;
  storage_set('user', user);
}

function clearInfo() {
  storage_set('info', []);
}

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
    );
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