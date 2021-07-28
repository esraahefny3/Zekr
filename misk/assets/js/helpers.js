 function get_response(url, callback) {
   var xhr = new XMLHttpRequest();
   xhr.ontimeout = function() {
     console.error("The request for " + url + " timed out.");
   };
   xhr.onload = function() {
     if (xhr.readyState === 4) {
       if (xhr.status === 200) {
         callback(xhr.responseText);
       } else {
         console.error(xhr.statusText);
       }
     }
   };
   xhr.open("GET", url);
   xhr.timeout = 5000;
   xhr.send(null);
 }



 function isDateBeforeToday(date) {
   return new Date(date) < new Date(new Date().toDateString());
 }


 //storage methods:

 // Inputs: key:string.
 // Returns value if key exists, else undefined.
 function storage_get(key) {
   var store = localStorage;
   if (store === undefined) {
     return undefined;
   }
   var json = store.getItem(key);
   if (json === null) {
     return undefined;
   }
   try {
     return JSON.parse(json);
   } catch (e) {
     log("Couldn't parse json for " + key);
     return undefined;
   }
 }

 // Inputs: key:string, value:object.
 // If value === undefined, removes key from storage.
 // Returns undefined.
 function storage_set(key, value) {
   var store = localStorage;
   if (value === undefined) {
     store.removeItem(key);
     return;
   }
   try {
     store.setItem(key, JSON.stringify(value));
   } catch (ex) {
     log(ex);
   }
 }

 //helpers to check valid URL
 function validURL(str) {
   var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
     '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
     '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
     '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
   return !!pattern.test(str);
 }


 //get hostname from url
 function baseURL(url) {
   var urlPattern = /^https?:\/\/[^#?\/]+/;
   var domainPattern = url.match(urlPattern);
   if (typeof domainPattern != 'undefined' && domainPattern != null) {
     var extractDomain = domainPattern[0];
     return extractDomain;

   } else {
     return false;
   }
 }


 // opens new tab with a url
 function open_new_tab(new_url) {
   chrome.tabs.create({
     url: new_url
   });
 }

 //get difference in days between two dates
 function difference_days(date1, date2) {
   const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
   return Math.round(Math.abs((date1 - date2) / oneDay));
 }


 function differenceInSeconds(time1, time2) {
   return Math.round((time2 - time1) / 1000);
 }


 function getUserLocation(callback) {
   get_response('https://extreme-ip-lookup.com/json/', callback, false);
 }

 function getHoursMinFromTime(timeString) {
   timeString = timeString.trim();
   let timeMin = {};
   if (timeString.includes("AM")) {
     timeString = timeString.replace("AM", "");
     timeString = timeString.trim();
     let timeArrString = timeString.split(":");
     timeMin.hour = parseInt(timeArrString[0]);
     timeMin.min = parseInt(timeArrString[1]);
   } else if (timeString.includes("PM")) {
     timeString = timeString.replace("PM", "");
     timeString = timeString.trim();
     let timeArrString = timeString.split(":");
     timeMin.hour = parseInt(timeArrString[0]) + 12;
     timeMin.min = parseInt(timeArrString[1]);
   }
   return timeMin;
 }